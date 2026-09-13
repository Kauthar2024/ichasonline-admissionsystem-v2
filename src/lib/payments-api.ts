import api from './axios';

export interface Payment {
  id: number;
  control_number: string;
  amount: string;
  currency: string;
  payment_type: string;
  payment_type_display: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  status_display: string;
  paid_at: string | null;
  transaction_id: string | null;
  provider: string | null;
  created_at: string;
  updated_at: string;
}

export interface InitiatePaymentPayload {
  amount: number;
  payment_type: string;
  application_id?: number;
}

export interface ControlNumberResponse {
  control_number: string;
  amount: string;
  payment_id: number;
  status: string;
}

export const fetchPayments = async (): Promise<Payment[]> => {
  const response = await api.get<Payment[]>('/payments/');
  return response.data;
};

export const fetchPaymentDetail = async (id: number): Promise<Payment> => {
  const response = await api.get<Payment>(`/payments/${id}/`);
  return response.data;
};

export const initiatePayment = async (
  payload: InitiatePaymentPayload
): Promise<ControlNumberResponse> => {
  const response = await api.post<ControlNumberResponse>('/payments/', payload);
  return response.data;
};