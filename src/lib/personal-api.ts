import { api } from './axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Type contract matching your form structure
export interface PersonalDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  zanzibarId: string;
  nida: string;
  passportNumber: string;
  isEmployed: string;
  kinName: string;
  kinPhone: string;
  kinRelationship: string;
}

// 1. API functions matching your backend routes
export const fetchPersonalDetails = async (): Promise<PersonalDetails> => {
  const response = await api.get<PersonalDetails>('/personal/'); // Resolves to /api/personal/
  return response.data;
};

export const savePersonalDetails = async (data: PersonalDetails): Promise<PersonalDetails> => {
  // If the server requires POST/PUT depending on whether it exists
  const response = await api.post<PersonalDetails>('/personal/', data); 
  return response.data;
};

// 2. Custom TanStack hooks following your query pattern
export const usePersonalDetails = () => {
  return useQuery({
    queryKey: ['personalDetails'],
    queryFn: fetchPersonalDetails,
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('access_token'),
    retry: false,
  });
};

export const useSavePersonalDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PersonalDetails) => savePersonalDetails(data),
    onSuccess: () => {
      // Refresh the query cache immediately upon database sync
      queryClient.invalidateQueries({ queryKey: ['personalDetails'] });
    },
  });
};
