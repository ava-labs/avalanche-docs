export type StepState = 'not_started' | 'in_progress' | 'error' | 'success';
export const statusColors: Record<StepState, string> = {
    not_started: 'bg-gray-50 border-gray-200',
    in_progress: 'bg-blue-50 border-blue-200',
    error: 'bg-red-50 border-red-200',
    success: 'bg-green-50 border-green-200'
};
