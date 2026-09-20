import { queryOptions } from '@tanstack/react-query';
import { fetchUsers } from './api';

export const userKeys = {
  all: ['users'] as const,
};

export const usersQueryOptions = () => queryOptions({ queryKey: userKeys.all, queryFn: fetchUsers });
