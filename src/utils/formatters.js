import { GRADE_THRESHOLDS } from './constants';

export function formatDuration(milliseconds) {
  if (!milliseconds || isNaN(milliseconds)) return '00:00';
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function formatDurationLong(milliseconds) {
  if (!milliseconds || isNaN(milliseconds)) return '0s';
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
}

export function formatNumber(number) {
  if (number === undefined || number === null) return '00';
  return number < 10 && number >= 0 ? `0${number}` : `${number}`;
}

export function getGrade(accuracy) {
  return GRADE_THRESHOLDS.find((threshold) => accuracy >= threshold.min) || GRADE_THRESHOLDS[2];
}

export function formatTimeAgo(timestamp) {
  if (!timestamp) return 'Recent';
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}
