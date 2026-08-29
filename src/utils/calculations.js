/**
 * Helper calculation utilities for Test Maza statistics and analytics
 */

export function calculateCourseStats(course, practiceHistory = {}) {
  const totalQuestions = course.questions?.length || 0;
  const coursePhases = course.phases || [];
  
  let totalAttempted = 0;
  let totalCorrect = 0;
  let phasesCompleted = 0;

  coursePhases.forEach((phase) => {
    const result = practiceHistory[`${course.id}_${phase.id}`];
    if (result) {
      phasesCompleted += 1;
      totalAttempted += result.answered || 0;
      totalCorrect += result.correct || 0;
    }
  });

  // If no phases, check course-level record
  if (coursePhases.length === 0) {
    const result = practiceHistory[course.id];
    if (result) {
      totalAttempted = result.answered || 0;
      totalCorrect = result.correct || 0;
      phasesCompleted = result.answered === totalQuestions ? 1 : 0;
    }
  }

  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const completion = totalQuestions > 0 ? Math.round((totalAttempted / totalQuestions) * 100) : 0;

  return {
    totalQuestions,
    totalAttempted,
    totalCorrect,
    accuracy,
    completion,
    phasesCompleted,
    totalPhases: coursePhases.length,
  };
}

export function calculateGlobalMetrics(courses = [], practiceHistory = {}) {
  let totalMCQs = 0;
  let totalAttempted = 0;
  let totalCorrect = 0;
  let totalPhasesCount = 0;
  let completedPhasesCount = 0;

  courses.forEach((course) => {
    totalMCQs += course.questions?.length || 0;
    const stats = calculateCourseStats(course, practiceHistory);
    totalAttempted += stats.totalAttempted;
    totalCorrect += stats.totalCorrect;
    totalPhasesCount += stats.totalPhases;
    completedPhasesCount += stats.phasesCompleted;
  });

  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const overallCompletion = totalMCQs > 0 ? Math.round((totalAttempted / totalMCQs) * 100) : 0;
  const readinessIndex = Math.min(100, Math.round((overallAccuracy * 0.7) + (overallCompletion * 0.3)));

  return {
    totalMCQs,
    totalAttempted,
    totalCorrect,
    overallAccuracy,
    overallCompletion,
    totalPhasesCount,
    completedPhasesCount,
    readinessIndex,
  };
}

export function extractUnitStats(questions = [], answers = {}) {
  const unitsMap = {};

  questions.forEach((question) => {
    const unitName = question.unit || 'General';
    if (!unitsMap[unitName]) {
      unitsMap[unitName] = {
        unit: unitName,
        total: 0,
        answered: 0,
        correct: 0,
      };
    }

    unitsMap[unitName].total += 1;
    if (answers[question.id]) {
      unitsMap[unitName].answered += 1;
      if (answers[question.id] === question.answer) {
        unitsMap[unitName].correct += 1;
      }
    }
  });

  return Object.values(unitsMap).map((unit) => {
    const accuracy = unit.answered > 0 ? Math.round((unit.correct / unit.answered) * 100) : 0;
    const completion = unit.total > 0 ? Math.round((unit.answered / unit.total) * 100) : 0;
    return {
      ...unit,
      accuracy,
      completion,
    };
  });
}
