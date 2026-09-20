import { queryOptions } from '@tanstack/react-query';
import { fetchApplication, fetchApplications, fetchLetterQr, fetchNotifications } from './api';

export const officerKeys = {
  applications: ['officer', 'applications'] as const,
  application: (ref: string) => ['officer', 'applications', ref] as const,
  letterQr: (ref: string) => ['officer', 'applications', ref, 'letter-qr'] as const,
  notifications: ['officer', 'notifications'] as const,
};

export const applicationsQueryOptions = () =>
  queryOptions({ queryKey: officerKeys.applications, queryFn: fetchApplications });

export const applicationQueryOptions = (ref: string) =>
  queryOptions({ queryKey: officerKeys.application(ref), queryFn: () => fetchApplication(ref) });

// The QR only changes when a new letter is issued, and issuing one invalidates
// the whole ['officer'] prefix, so it never needs refetching on its own.
export const letterQrQueryOptions = (ref: string) =>
  queryOptions({
    queryKey: officerKeys.letterQr(ref),
    queryFn: () => fetchLetterQr(ref),
    enabled: Boolean(ref),
    staleTime: Infinity,
    retry: false,
  });

export const notificationsQueryOptions = () =>
  queryOptions({ queryKey: officerKeys.notifications, queryFn: fetchNotifications });
