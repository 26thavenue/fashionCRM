import { createClient } from '../supabase/client';
import type {
  OrderItem,
  CreateOrderInput,
  UpdateOrderInput,
  OrderResponse,
  OrderSingleResponse,
  Client,
} from '../types';

const supabase = createClient();

export async function createOrder(
  orderData: CreateOrderInput
): Promise<OrderSingleResponse> {
  try {
    const { data: existingClient, error: clientSearchError } = await supabase
      .from('clients')
      .select('id')
      .eq('phone_number', orderData.customer_number)
      .single();

    if (clientSearchError && clientSearchError.code !== 'PGRST116') {
      throw clientSearchError;
    }

    let clientId: string;

    if (existingClient) {
      clientId = existingClient.id;
    } else {
      const { data: newClient, error: clientError } = await supabase
        .from('clients')
        .insert({
          name: orderData.customer_name,
          phone_number: orderData.customer_number,
        })
        .select('id')
        .single();

      if (clientError) throw clientError;
      clientId = newClient!.id;
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        ...orderData,
        client_id: clientId,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    return {
      data: order as OrderItem,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
}

export async function getOrders(): Promise<OrderResponse> {
  const response = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  return {
    data: response.data as OrderItem[] | null,
    error: response.error,
  };
}

export async function updateOrder(
  id: string,
  updates: UpdateOrderInput
): Promise<OrderResponse> {
  const response = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select();

  return {
    data: response.data as OrderItem[] | null,
    error: response.error,
  };
}

export async function deleteOrder(id: string): Promise<OrderResponse> {
  const response = await supabase.from('orders').delete().eq('id', id).select();

  return {
    data: response.data as OrderItem[] | null,
    error: response.error,
  };
}
