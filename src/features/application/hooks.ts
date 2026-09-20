import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteDocument, saveDraft, submitApplication, uploadDocument } from './api';
import { applicationKeys, myApplicationQueryOptions } from './queries';
import type { DraftPatch } from './types';

export const useMyApplication = () => useQuery(myApplicationQueryOptions());

// Every write returns the whole application, so seed the cache with the
// response instead of forcing a refetch.
function useApplicationMutation<TInput, TResult>(mutationFn: (input: TInput) => Promise<TResult>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      if (data && typeof data === 'object' && 'ref' in data) {
        queryClient.setQueryData(applicationKeys.mine, data);
      } else {
        queryClient.invalidateQueries({ queryKey: applicationKeys.all });
      }
    },
  });
}

export const useSaveDraft = () => useApplicationMutation((patch: DraftPatch) => saveDraft(patch));

export const useSubmitApplication = () => useApplicationMutation(() => submitApplication());

export const useUploadDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadDocument(file),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: applicationKeys.all }),
  });
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (docId: string) => deleteDocument(docId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: applicationKeys.all }),
  });
};
