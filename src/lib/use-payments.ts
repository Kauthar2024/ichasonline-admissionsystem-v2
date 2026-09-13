import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// If using explicit extensions in your TS config:
import {
  fetchPayments,
  fetchPaymentDetail,
  initiatePayment,
  type Payment,
  type InitiatePaymentPayload,
  type ControlNumberResponse,
 } from './payments-api';


// Hook to fetch applicant payments list
export const useGetPayments = () => {
  return useQuery<Payment[], Error>({
    queryKey: ['payments'],
    queryFn: fetchPayments,
  });
};

// Hook to fetch specific payment
// export const useGetPaymentDetail = (id: number) => {
//   return useQuery<Payment, Error>({
//     queryKey: ['payments', id],
//     queryFn: () => fetchPaymentDetail(id),
//     enabled: !!id,
//   });
// };

export const useGetPaymentDetail = (id:number) =>{
  return useQuery<Payment,Error>({
    queryKey:['payments', id],
    queryFn: () => fetchPaymentDetail(id),
    enabled: !! id,

  });
};

// Hook to request/initiate a new payment or control number
export const useInitiatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation<ControlNumberResponse, Error, InitiatePaymentPayload>({
    mutationFn: initiatePayment,
    onSuccess: () => {
      // Refresh the payment list in cache automatically
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};