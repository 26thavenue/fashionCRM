import { Task } from "../types";

;

export const getDaysInMonth = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1).getDay();
};

export const formatDateKey = (year: number, month: number, day: number): string => {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

export const getTasksForDate = (tasks: { [key: string]: Task[] }, year: number, month: number, day: number): Task[] => {
  const dateKey = formatDateKey(year, month, day);
  return tasks[dateKey] || [];
};

export const getTaskTypeColor = (type: Task['type']): string => {
  return type === 'deadline' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
};

export const monthNames: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
