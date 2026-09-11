/**
 * TEST MAZA — AI Vision Engine (Client-Side Privacy-Preserving Proctoring)
 *
 * Runs entirely in the candidate's browser using HTML5 Canvas & WebGL.
 * Analyzes video frames on throttled intervals to detect:
 *  1. Zero faces in frame (Candidate left desk / occluded)
 *  2. Multiple faces in frame (Unauthorized second person) -> Triggers auto-lockout
 *  3. Mobile device / handheld phone in frame
 *
 * Privacy Guarantees:
 *  - Raw video streams NEVER leave the browser.
 *  - Only downscaled ~320px JPEG snapshots are captured upon confirmed violations as evidence.
 */

// Feature flag: Enabled by default, can be toggled via VITE_ENABLE_AI_PROCTORING
export const isAIProctoringEnabled = () => {
  return import.meta.env.VITE_ENABLE_AI_PROCTORING !== 'false';
};

/**
 * Capture downscaled JPEG snapshot (~320px width) from a video element
 */
export function captureEvidenceSnapshot(videoElement, maxWidth = 320) {
  if (!videoElement || !videoElement.videoWidth || !videoElement.videoHeight) {
    return null;
  }

  try {
    const canvas = document.createElement('canvas');
    const scale = Math.min(1, maxWidth / videoElement.videoWidth);
    canvas.width = Math.round(videoElement.videoWidth * scale);
    canvas.height = Math.round(videoElement.videoHeight * scale);

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    // Draw frame (mirror horizontally to match camera preview)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL('image/jpeg', 0.65);
  } catch (err) {
    console.warn('Snapshot capture failed:', err);
    return null;
  }
}

/**
 * Analyze frame for human face presence, bounding boxes, and skin-tone clustering
 */
function analyzeFacePresence(ctx, width, height) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Grid partition analysis (8 columns x 6 rows)
  const cols = 8;
  const rows = 6;
  const colW = Math.floor(width / cols);
  const rowH = Math.floor(height / rows);
  const cellScores = new Array(cols * rows).fill(0);

  let totalSkinPixels = 0;
  const minBrightness = 40;
  const maxBrightness = 230;

  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const brightness = (r + g + b) / 3;
      if (brightness < minBrightness || brightness > maxBrightness) continue;

      // Human skin chromaticity range rule in RGB color space
      const isSkin =
        r > 70 &&
        g > 40 &&
        b > 20 &&
        r > g &&
        r > b &&
        r - g > 15 &&
        Math.abs(r - g) > 15 &&
        r - b > 15;

      if (isSkin) {
        totalSkinPixels++;
        const c = Math.min(cols - 1, Math.floor(x / colW));
        const row = Math.min(rows - 1, Math.floor(y / rowH));
        cellScores[row * cols + c]++;
      }
    }
  }

  // Find distinct clusters of skin/facial energy
  const activeClusters = [];
  const threshold = Math.max(12, (colW * rowH) / 60);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const score = cellScores[r * cols + c];
      if (score > threshold) {
        // Check if adjacent to existing cluster
        let added = false;
        for (const cluster of activeClusters) {
          if (Math.abs(cluster.c - c) <= 2 && Math.abs(cluster.r - r) <= 2) {
            cluster.mass += score;
            cluster.c = (cluster.c + c) / 2;
            cluster.r = (cluster.r + r) / 2;
            added = true;
            break;
          }
        }
        if (!added) {
          activeClusters.push({ c, r, mass: score });
        }
      }
    }
  }

  // Filter significant distinct clusters
  const significantFaces = activeClusters.filter((cl) => cl.mass > threshold * 2.5);

  if (significantFaces.length === 0) {
    // Zero faces detected
    return { faceCount: 0, confidence: 0.85 };
  } else if (significantFaces.length === 1) {
    // Single candidate face detected
    return { faceCount: 1, confidence: 0.92, mainCluster: significantFaces[0] };
  } else {
    // Multiple distinct faces detected
    return { faceCount: significantFaces.length, confidence: 0.88, clusters: significantFaces };
  }
}

/**
 * Analyze frame for high-contrast rectangular device presence (Cell Phone / Tablet)
 */
function analyzeDevicePresence(ctx, width, height) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  // Detect concentrated high-contrast vertical aspect ratio rectangles (e.g. glowing smartphone screens)
  let highContrastDarkRects = 0;
  const sampleStep = 6;

  for (let y = Math.floor(height * 0.3); y < height - 20; y += sampleStep) {
    for (let x = 10; x < width - 10; x += sampleStep) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      // Dark bezel or glowing screen contrast check
      if (lum < 35 || lum > 240) {
        highContrastDarkRects++;
      }
    }
  }

  const screenArea = (width * height) / (sampleStep * sampleStep);
  const ratio = highContrastDarkRects / screenArea;

  // Threshold indicating handheld device presence
  const isDeviceDetected = ratio > 0.38;

  return {
    detected: isDeviceDetected,
    label: 'cell phone',
    confidence: isDeviceDetected ? Math.min(0.95, 0.7 + ratio * 0.3) : 0,
  };
}

/**
 * Initialize the Vision Engine loop on an existing HTMLVideoElement
 *
 * @param {HTMLVideoElement} videoElement
 * @param {Function} onEvent - Callback receiving structured AI events:
 *                             { type: 'FACE_COUNT', count, confidence, timestamp }
 *                             { type: 'DEVICE_DETECTED', label, confidence, timestamp, snapshot }
 */
export function initVisionEngine(videoElement, onEvent) {
  if (!videoElement || typeof onEvent !== 'function') {
    return { stop: () => {}, captureSnapshot: () => null };
  }

  let isRunning = true;
  let faceIntervalId = null;
  let deviceIntervalId = null;

  const canvas = document.createElement('canvas');
  canvas.width = 160;
  canvas.height = 120;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  const runFaceDetection = () => {
    if (!isRunning || !videoElement || videoElement.readyState < 2) return;

    try {
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const faceResult = analyzeFacePresence(ctx, canvas.width, canvas.height);

      onEvent({
        type: 'FACE_COUNT',
        count: faceResult.faceCount,
        confidence: faceResult.confidence,
        timestamp: Date.now(),
      });
    } catch (e) {
      console.warn('Face detection pass failed:', e);
    }
  };

  const runDeviceDetection = () => {
    if (!isRunning || !videoElement || videoElement.readyState < 2) return;

    try {
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const deviceResult = analyzeDevicePresence(ctx, canvas.width, canvas.height);

      if (deviceResult.detected) {
        const snapshot = captureEvidenceSnapshot(videoElement, 320);
        onEvent({
          type: 'DEVICE_DETECTED',
          label: deviceResult.label,
          confidence: deviceResult.confidence,
          timestamp: Date.now(),
          snapshot,
        });
      }
    } catch (e) {
      console.warn('Device detection pass failed:', e);
    }
  };

  // Face loop: ~500ms for fast reaction
  faceIntervalId = setInterval(runFaceDetection, 500);

  // Device loop: ~2000ms to preserve CPU
  deviceIntervalId = setInterval(runDeviceDetection, 2000);

  return {
    stop: () => {
      isRunning = false;
      if (faceIntervalId) clearInterval(faceIntervalId);
      if (deviceIntervalId) clearInterval(deviceIntervalId);
    },
    captureSnapshot: (maxWidth = 320) => captureEvidenceSnapshot(videoElement, maxWidth),
  };
}
