import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProgramme, updateProgramme } from './api';
import { programmeKeys, programmesQueryOptions } from './queries';
import type { NewProgramme } from './types';

export const useProgrammes = () => useQuery(programmesQueryOptions());

export const useCreateProgramme = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: NewProgramme) => createProgramme(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: programmeKeys.all }),
  });
};

export const useUpdateProgramme = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Partial<NewProgramme> }) => updateProgramme(id, patch),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: programmeKeys.all }),
  });
};
