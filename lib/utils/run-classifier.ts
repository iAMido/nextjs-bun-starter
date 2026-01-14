/**
 * Run type classification based on distance and heart rate
 * Ported from Python Running Coach app
 */

export type RunType =
  | 'Recovery'
  | 'Easy'
  | 'Moderate'
  | 'Tempo'
  | 'Long Run'
  | 'Race'
  | 'Interval';

interface ClassifyRunParams {
  distanceKm: number;
  avgHr?: number;
  maxHr?: number;
  durationMin?: number;
}

/**
 * Classify run type based on distance and heart rate
 * Uses heuristics from the original Python app
 */
export function classifyRun({
  distanceKm,
  avgHr,
  maxHr: maxHrParam,
  durationMin,
}: ClassifyRunParams): RunType {
  // Default HR thresholds (can be customized per athlete)
  const hrThresholds = {
    recovery: 130,
    easy: 145,
    moderate: 155,
    tempo: 170,
    threshold: 175,
  };

  // If no HR data, classify by distance only
  if (!avgHr) {
    if (distanceKm < 5) return 'Easy';
    if (distanceKm >= 15) return 'Long Run';
    return 'Moderate';
  }

  // Recovery: short distance + low HR
  if (distanceKm < 4 && avgHr < hrThresholds.recovery) {
    return 'Recovery';
  }

  // Long Run: long distance + controlled HR
  if (distanceKm >= 15 && avgHr < hrThresholds.moderate) {
    return 'Long Run';
  }
  if (distanceKm >= 12 && avgHr < 160) {
    return 'Long Run';
  }

  // Tempo: elevated HR in moderate zone
  if (avgHr >= hrThresholds.moderate && avgHr <= hrThresholds.tempo) {
    return 'Tempo';
  }

  // Race: high HR + decent distance
  if (avgHr > hrThresholds.tempo && distanceKm >= 5) {
    return 'Race';
  }

  // Easy: low HR
  if (avgHr < hrThresholds.easy) {
    return 'Easy';
  }

  // Default to moderate
  return 'Moderate';
}

/**
 * Get color for run type badge
 */
export function getRunTypeColor(runType: RunType): string {
  const colors: Record<RunType, string> = {
    Recovery: 'bg-gray-500',
    Easy: 'bg-blue-500',
    Moderate: 'bg-green-500',
    Tempo: 'bg-yellow-500',
    'Long Run': 'bg-purple-500',
    Race: 'bg-red-500',
    Interval: 'bg-orange-500',
  };
  return colors[runType] || 'bg-gray-500';
}

/**
 * Get suggested HR zone for run type
 */
export function getSuggestedHrZone(runType: RunType): string {
  const zones: Record<RunType, string> = {
    Recovery: 'Z1 (< 130 bpm)',
    Easy: 'Z2 (130-145 bpm)',
    Moderate: 'Z3 (145-155 bpm)',
    Tempo: 'Z3-Z4 (155-170 bpm)',
    'Long Run': 'Z2 (130-150 bpm)',
    Race: 'Z4-Z5 (165+ bpm)',
    Interval: 'Z5 (175+ bpm)',
  };
  return zones[runType] || 'Z2-Z3';
}

/**
 * Calculate intensity distribution from runs
 */
export function calculateIntensityDistribution(
  runs: { run_type?: string }[]
): Record<string, number> {
  const distribution: Record<string, number> = {
    Easy: 0,
    Moderate: 0,
    Hard: 0,
  };

  runs.forEach((run) => {
    const type = run.run_type || 'Moderate';
    if (['Recovery', 'Easy'].includes(type)) {
      distribution.Easy++;
    } else if (['Tempo', 'Race', 'Interval'].includes(type)) {
      distribution.Hard++;
    } else {
      distribution.Moderate++;
    }
  });

  const total = runs.length || 1;
  return {
    Easy: Math.round((distribution.Easy / total) * 100),
    Moderate: Math.round((distribution.Moderate / total) * 100),
    Hard: Math.round((distribution.Hard / total) * 100),
  };
}
