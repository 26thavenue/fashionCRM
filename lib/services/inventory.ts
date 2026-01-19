import { createClient } from '../supabase/client';
import type {
  InventoryItem,
  CreateInventoryInput,
  UpdateInventoryInput,
  InventoryResponse,
  InventorySingleResponse,
} from '../types';

const supabase = createClient();

export async function getInventory(): Promise<InventoryResponse> {
  const response = await supabase
    .from('inventory')
    .select('*')
    .order('inventory_name');

  return {
    data: response.data as InventoryItem[] | null,
    error: response.error,
  };
}

export async function createInventory(
  input: CreateInventoryInput
): Promise<InventorySingleResponse> {
  const response = await supabase
    .from('inventory')
    .insert(input)
    .select()
    .single();

  return {
    data: response.data as InventoryItem | null,
    error: response.error,
  };
}

export async function updateInventory(
  id: string,
  updates: UpdateInventoryInput
): Promise<InventoryResponse> {
  const response = await supabase
    .from('inventory')
    .update(updates)
    .eq('id', id)
    .select();

  return {
    data: response.data as InventoryItem[] | null,
    error: response.error,
  };
}

export async function deleteInventory(id: string): Promise<InventoryResponse> {
  const response = await supabase.from('inventory').delete().eq('id', id).select();

  return {
    data: response.data as InventoryItem[] | null,
    error: response.error,
  };
}
