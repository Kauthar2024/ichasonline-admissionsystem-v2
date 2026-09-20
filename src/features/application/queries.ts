import { queryOptions } from '@tanstack/react-query';
import { fetchMyApplication } from './api';

export const applicationKeys = {
  all: ['application'] as const,
  mine: ['application', 'me'] as const,
};

export const myApplicationQueryOptions = () =>
  queryOptions({ queryKey: applicationKeys.mine, queryFn: fetchMyApplication });
