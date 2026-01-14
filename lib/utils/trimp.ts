/**
 * Calculate TRIMP (Training Impulse) - a measure of training load
 * Based on the formula from the Python Running Coach app
 */

interface TrimpParams {
  durationMin: number;
  avgHr: number;
  restingHr?: number;
  maxHr?: number;
}

/**
 * Calculate TRIMP training load
 * Uses exponential heart rate weighting to account for intensity
 */
export function calculateTrimp({
  durationMin,
  avgHr,
  restingHr = 51,
  maxHr = 185,
}: TrimpParams): number {
  // Calculate heart rate reserve percentage
  let hrReserve = (avgHr - restingHr) / (maxHr - restingHr);

  // Clamp between 0 and 1
  hrReserve = Math.max(0, Math.min(1, hrReserve));

  // TRIMP formula with exponential weighting
  // Higher HR values contribute more to training load
  const trimp = durationMin * hrReserve * 0.64 * Math.exp(1.92 * hrReserve);

  return Math.round(trimp * 10) / 10;
}

/**
 * Get TRIMP category based on score
 */
export function getTrimpCategory(trimp: number): string {
  if (trimp < 50) return 'Easy';
  if (trimp < 100) return 'Moderate';
  if (trimp < 150) return 'Hard';
  if (trimp < 200) return 'Very Hard';
  return 'Extreme';
}

/**
 * Calculate weekly training load from runs
 */
export function calculateWeeklyLoad(runs: { trimp?: number }[]): number {
  return runs.reduce((sum, run) => sum + (run.trimp || 0), 0);
}

/**
 * Calculate acute:chronic workload ratio
 * Acute = last 7 days, Chronic = last 28 days average per week
 */
export function calculateAcuteChronicRatio(
  acuteLoad: number,
  chronicLoad: number
): number {
  if (chronicLoad === 0) return 0;
  return Math.round((acuteLoad / chronicLoad) * 100) / 100;
}

/**
 * Get injury risk level based on acute:chronic ratio
 */
export function getInjuryRisk(ratio: number): 'low' | 'moderate' | 'high' {
  if (ratio < 0.8) return 'low'; // Undertraining
  if (ratio <= 1.3) return 'low'; // Sweet spot
  if (ratio <= 1.5) return 'moderate';
  return 'high';
}
