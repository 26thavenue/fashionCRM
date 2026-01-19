import { createClient } from '../supabase/client';
import type {
  CalendarItem,
  GetCalendarItemsByDateInput,
  GetCalendarItemsByMonthInput,
  CalendarResponse,
  OrdersByMonthResponse,
} from '../types';

export async function getCalendarItemsByDate(
  input: GetCalendarItemsByDateInput
): Promise<CalendarResponse> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('get_calendar_items_by_date', {
    target_date: input.date,
  });

  return {
    data: data as CalendarItem[] | null,
    error,
  };
}

export async function getCalendarItemsByMonth(
  input: GetCalendarItemsByMonthInput
): Promise<CalendarResponse> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('get_calendar_items_by_month', {
    target_year: input.year,
    target_month: input.month,
  });

  return {
    data: data as CalendarItem[] | null,
    error,
  };
}

export async function getOrdersCreatedByMonth(
  input: GetCalendarItemsByMonthInput
): Promise<OrdersByMonthResponse> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('get_orders_created_by_month', {
    target_year: input.year,
    target_month: input.month,
  });

  return {
    data,
    error,
  };
}