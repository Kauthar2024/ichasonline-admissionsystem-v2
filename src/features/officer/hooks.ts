import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { decideApplication, runSelection } from './api';
import { applicationQueryOptions, applicationsQueryOptions, notificationsQueryOptions } from './queries';
import type { DecisionInput } from './types';

export const useApplications = () => useQuery(applicationsQueryOptions());
export const useApplication = (ref: string) => useQuery(applicationQueryOptions(ref));
export const useNotifications = () => useQuery(notificationsQueryOptions());

// Decisions and selection change applications and the notification log.
function useInvalidateOfficerData() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['officer'] });
}

export const useDecideApplication = () => {
  const invalidate = useInvalidateOfficerData();
  return useMutation({
    mutationFn: (input: DecisionInput) => decideApplication(input),
    onSuccess: invalidate,
  });
};

export const useRunSelection = () => {
  const invalidate = useInvalidateOfficerData();
  return useMutation({ mutationFn: runSelection, onSuccess: invalidate });
};

