
'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { renderCalendar } from '@/app/dashboard/calendar/renderCalendar';
import { formatDateKey, getTasksForDate, monthNames } from '@/lib/utils/calendar';
import { Task, TaskMap, SelectedDate } from '@/lib/types/calendar';
import CalendarSlider from '@/app/components/ui/slider';

const TaskCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 0, 1));
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
  const [isSliderOpen, setIsSliderOpen] = useState<boolean>(false);

  // Sample task data - in production, this would come from your backend/state management
  const tasks: TaskMap = {
    '2026-01-15': [
      { id: 1, type: 'deadline', title: 'Project proposal due', time: '5:00 PM' },
      { id: 2, type: 'order', title: 'Office supplies order', time: '2:00 PM' }
    ],
    '2026-01-20': [
      { id: 3, type: 'deadline', title: 'Client presentation', time: '10:00 AM' }
    ],
    '2026-02-01': [
      { id: 4, type: 'order', title: 'Equipment delivery', time: '9:00 AM' },
      { id: 5, type: 'deadline', title: 'Monthly report', time: '11:59 PM' },
      { id: 6, type: 'deadline', title: 'Budget review', time: '3:00 PM' }
    ]
  };

  const handleDateClick = (day: number): void => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dateKey = formatDateKey(year, month, day);
    const dateTasks = getTasksForDate(tasks, year, month, day);
    
    if (dateTasks.length > 0) {
      setSelectedDate({ day, month, year, dateKey, tasks: dateTasks });
      setIsSliderOpen(true);
    }
  };

  const navigateMonth = (direction: number): void => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  return (
    <div className=" mx-auto p-6 bg-secondary min-h-screen">
      <div className=" min-w-5xl rounded-lg  p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-zinc-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h1>

            <div className="flex items-center gap-1">
                <button
                onClick={() => navigateMonth(-1)} 
                className="cursor-pointer rounded-l-xl bg-secondary w-8 h-8 shadow-bordered flex items-center justify-center ">
                    <ChevronLeft className="w-5 h-5"/>
                </button>
                <button
                onClick={() => navigateMonth(1)}
                className=" cursor-pointer rounded-r-xl bg-secondary w-8 h-8 shadow-bordered flex items-center justify-center ">
                    <ChevronRight className="w-5 h-5"/>
                </button>
            </div>
          
        </div>


        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0 border border-zinc-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day: string) => (
            <div key={day} className="bg-gray-100 p-3 text-center font-semibold text-gray-700 border-b border-gray-200">
              {day}
            </div>
          ))}
          {renderCalendar({ currentDate, tasks, onDateClick: handleDateClick })}
        </div>
      </div>

      {/* Slider */}
      <CalendarSlider 
        isOpen={isSliderOpen}
        selectedDate={selectedDate}
        onClose={() => setIsSliderOpen(false)}
      />

      {/* Overlay */}
      {isSliderOpen && (
        <div
          className="fixed inset-0 bg-[#1a1a1a3] bg-opacity-30 z-40"
          onClick={() => setIsSliderOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default TaskCalendar;