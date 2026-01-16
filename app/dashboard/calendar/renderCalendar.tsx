import React, { JSX } from 'react';
import { getDaysInMonth, getFirstDayOfMonth, getTasksForDate, formatDateKey } from '@/lib/utils/calendar';
import { Task, TaskMap } from '@/lib/types/calendar';

interface RenderCalendarProps {
  currentDate: Date;
  tasks: TaskMap;
  onDateClick: (day: number) => void;
}

export const renderCalendar = ({ currentDate, tasks, onDateClick }: RenderCalendarProps): JSX.Element[] => {
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days: JSX.Element[] = [];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-20 bg-gray-50"></div>);
  }

  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateTasks = getTasksForDate(tasks, year, month, day);
    const taskCount = dateTasks.length;
    const isToday = new Date().getDate() === day && 
                    new Date().getMonth() === month && 
                    new Date().getFullYear() === year;

    days.push(
      <div
        key={day}
        onClick={() => onDateClick(day)}
        className={`h-20 border border-gray-200 p-2 relative ${
          taskCount > 0 ? 'cursor-pointer hover:bg-zinc-50' : ''
        } ${isToday ? 'bg-zinc-100' : 'bg-white'}`}
      >
        <div className="font-semibold text-gray-700">{day}</div>
        {taskCount > 0 && (
          <div className="absolute bottom-1 right-1 flex items-center gap-1">
            <div className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {taskCount}
            </div>
          </div>
        )}
      </div>
    );
  }

  return days;
};
