import { isAxiosError } from 'axios';

// The API answers every failure with a `detail` string (see
// config/exceptions.py in ichas-api). Screens render `error.message`, so turn
// an axios rejection into an Error carrying that message.
export function apiError(error: unknown, fallback = 'Something went wrong'): Error {
  if (isAxiosError(error)) {
    if (!error.response) {
      return new Error('Cannot reach the server. Is the API running?');
    }
    const detail = (error.response.data as { detail?: unknown } | undefined)?.detail;
    if (typeof detail === 'string' && detail.trim()) return new Error(detail);
    if (error.response.status === 401) return new Error('Your session has expired. Please sign in again.');
    if (error.response.status === 403) return new Error('You do not have permission to do that.');
  }
  if (error instanceof Error) return error;
  return new Error(fallback);
}
