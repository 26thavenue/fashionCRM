import { createClient } from '../supabase/client';
import type {
  TaskItem,
  CreateTaskInput,
  UpdateTaskInput,
  TaskResponse,
  TaskSingleResponse,
} from '../types';

const supabase = createClient();

export async function getTasks(): Promise<TaskResponse> {
  const response = await supabase
    .from('tasks')
    .select('*')
    .order('due_date', { ascending: true });

  return {
    data: response.data as TaskItem[] | null,
    error: response.error,
  };
}

export async function createTask(input: CreateTaskInput): Promise<TaskSingleResponse> {
  const response = await supabase
    .from('tasks')
    .insert(input)
    .select()
    .single();

  return {
    data: response.data as TaskItem | null,
    error: response.error,
  };
}

export async function updateTask(
  id: string,
  updates: UpdateTaskInput
): Promise<TaskResponse> {
  const response = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select();

  return {
    data: response.data as TaskItem[] | null,
    error: response.error,
  };
}

export async function deleteTask(id: string): Promise<TaskResponse> {
  const response = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .select();

  return {
    data: response.data as TaskItem[] | null,
    error: response.error,
  };
}