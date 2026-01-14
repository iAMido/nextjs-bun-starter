import { supabase } from './supabase';
import type { TrainingPlan, PlanData } from './types';

/**
 * Get the active training plan for a user
 */
export async function getActivePlan(userId: string): Promise<TrainingPlan | null> {
  const { data, error } = await supabase
    .from('training_plans')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
  return data;
}

/**
 * Get all training plans for a user
 */
export async function getUserPlans(userId: string): Promise<TrainingPlan[]> {
  const { data, error } = await supabase
    .from('training_plans')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Create a new training plan
 */
export async function createPlan(
  userId: string,
  planType: string,
  planJson: PlanData,
  durationWeeks: number,
  startDate?: string
): Promise<TrainingPlan> {
  // Deactivate any existing active plans
  await supabase
    .from('training_plans')
    .update({ status: 'completed' })
    .eq('user_id', userId)
    .eq('status', 'active');

  // Create the new plan
  const { data, error } = await supabase
    .from('training_plans')
    .insert({
      user_id: userId,
      plan_type: planType,
      plan_json: planJson,
      duration_weeks: durationWeeks,
      status: 'active',
      start_date: startDate || new Date().toISOString().split('T')[0],
      current_week_num: 1,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update current week number
 */
export async function updatePlanWeek(
  planId: string,
  weekNum: number
): Promise<TrainingPlan> {
  const { data, error } = await supabase
    .from('training_plans')
    .update({ current_week_num: weekNum })
    .eq('id', planId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update plan status
 */
export async function updatePlanStatus(
  planId: string,
  status: 'active' | 'completed' | 'deleted'
): Promise<void> {
  const { error } = await supabase
    .from('training_plans')
    .update({ status })
    .eq('id', planId);

  if (error) throw error;
}

/**
 * Delete a plan (soft delete by setting status)
 */
export async function deletePlan(planId: string): Promise<void> {
  await updatePlanStatus(planId, 'deleted');
}

/**
 * Get current week's workouts from plan
 */
export function getCurrentWeekWorkouts(plan: TrainingPlan): PlanData['weeks'][0] | null {
  const planData = plan.plan_json as PlanData;
  const currentWeek = plan.current_week_num;

  if (!planData.weeks || planData.weeks.length === 0) return null;

  return planData.weeks.find((w) => w.week_number === currentWeek) || null;
}
