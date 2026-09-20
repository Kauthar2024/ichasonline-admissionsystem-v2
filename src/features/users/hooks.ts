import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createStaffUser, setUserActive } from './api';
import { userKeys, usersQueryOptions } from './queries';
import type { NewStaffUser } from './types';

export const useUsers = () => useQuery(usersQueryOptions());

export const useCreateStaffUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: NewStaffUser) => createStaffUser(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  });
};

export const useSetUserActive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) => setUserActive(id, active),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.all }),
  });
};
