import { apiError } from '@/lib/api-error';
import { api } from '@/lib/axios';
import type { DraftDocument, DraftPatch, MyApplication } from './types';

// The applicant wizard saves into a server-side draft one step at a time
// (`/api/applications/me/`), then submits it. There is no mock branch: the
// applicant screens need a backend, as personal-info and payments already do.

export const fetchMyApplication = async (): Promise<MyApplication | null> => {
  try {
    const { data } = await api.get<MyApplication | ''>('/applications/me/');
    // An applicant who has not started answers 204, which axios surfaces as an
    // empty string — normalise it to null so callers only handle one absence.
    return data || null;
  } catch (error) {
    throw apiError(error, 'Could not load your application');
  }
};

export const saveDraft = async (patch: DraftPatch): Promise<MyApplication> => {
  try {
    const { data } = await api.patch<MyApplication>('/applications/me/', patch);
    return data;
  } catch (error) {
    throw apiError(error, 'Could not save your application');
  }
};

export const uploadDocument = async (file: File): Promise<DraftDocument> => {
  const body = new FormData();
  body.append('file', file);
  try {
    // Let the browser set the multipart boundary itself.
    const { data } = await api.post<DraftDocument>('/applications/me/documents/', body);
    return data;
  } catch (error) {
    throw apiError(error, 'Could not upload the document');
  }
};

export const deleteDocument = async (docId: string): Promise<void> => {
  try {
    await api.delete(`/applications/me/documents/${docId}/`);
  } catch (error) {
    throw apiError(error, 'Could not remove the document');
  }
};

export const submitApplication = async (): Promise<MyApplication> => {
  try {
    const { data } = await api.post<MyApplication>('/applications/me/submit/');
    return data;
  } catch (error) {
    throw apiError(error, 'Could not submit your application');
  }
};
