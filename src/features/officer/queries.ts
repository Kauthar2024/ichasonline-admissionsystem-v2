import { queryOptions } from '@tanstack/react-query';
import { fetchApplication, fetchApplications, fetchNotifications } from './api';

export const officerKeys = {
  applications: ['officer', 'applications'] as const,
  application: (ref: string) => ['officer', 'applications', ref] as const,
  notifications: ['officer', 'notifications'] as const,
};

export const applicationsQueryOptions = () =>
  queryOptions({ queryKey: officerKeys.applications, queryFn: fetchApplications });

export const applicationQueryOptions = (ref: string) =>
  queryOptions({ queryKey: officerKeys.application(ref), queryFn: () => fetchApplication(ref) });

export const notificationsQueryOptions = () =>
  queryOptions({ queryKey: officerKeys.notifications, queryFn: fetchNotifications });
