import { queryOptions } from '@tanstack/react-query';
import { fetchProgrammes } from './api';

export const programmeKeys = {
  all: ['programmes'] as const,
};

export const programmesQueryOptions = () =>
  queryOptions({ queryKey: programmeKeys.all, queryFn: fetchProgrammes });
