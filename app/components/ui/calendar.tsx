
'use client'
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { renderCalendar } from '@/app/dashboard/calendar/renderCalendar';
import { formatDateKey, getTasksForDate, monthNames } from '@/lib/utils/calendar';
import { Task, TaskMap, SelectedDate } from '@/lib/types/calendar';
import CalendarSlider from '@/app/components/ui/slider';
import { getCalendarItemsByMonth, getCalendarItemsByDate } from '@/lib/services/calendar';
import { CalendarItem } from '@/lib/types';

const TaskCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 0, 1));
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);
  const [isSliderOpen, setIsSliderOpen] = useState<boolean>(false);
  
  // Month level loading state
  const [monthLoading, setMonthLoading] = useState<boolean>(true);
  const [monthError, setMonthError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TaskMap>({});
  
  // Date level loading state
  const [dateLoading, setDateLoading] = useState<boolean>(false);
  const [dateError, setDateError] = useState<string | null>(null);
  const [dateItems, setDateItems] = useState<CalendarItem[]>([]);

  // Fetch calendar items for the current month
  useEffect(() => {
    const fetchMonthData = async () => {
      try {
        setMonthLoading(true)
        setMonthError(null)
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        
        const response = await getCalendarItemsByMonth({ year, month })
        
        if (response.error) {
          setMonthError(response.error.message || 'Failed to fetch calendar items')
        } else {
          // Transform calendar items into TaskMap
          const taskMap: TaskMap = {}
          if (response.data) {
            response.data.forEach((item: CalendarItem) => {
              const dateKey = item.due_date
              if (!taskMap[dateKey]) {
                taskMap[dateKey] = []
              }
              taskMap[dateKey].push({
                id: parseInt(item.id),
                type: item.type as 'deadline' | 'order',
                title: item.title,
                time: new Date(item.due_date).toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                }) || '12:00 AM',
              })
            })
          }
          setTasks(taskMap)
        }
      } catch (err) {
        setMonthError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setMonthLoading(false)
      }
    }

    fetchMonthData()
  }, [currentDate])

  const handleDateClick = (day: number): void => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dateKey = formatDateKey(year, month, day);
    const dateTasks = getTasksForDate(tasks, year, month, day);
    
    if (dateTasks.length > 0) {
      // Fetch specific date items
      fetchDateItems(dateKey)
      setSelectedDate({ day, month, year, dateKey, tasks: dateTasks });
      setIsSliderOpen(true);
    }
  };

  const fetchDateItems = async (dateKey: string) => {
    try {
      setDateLoading(true)
      setDateError(null)
      
      const response = await getCalendarItemsByDate({ date: dateKey })
      
      if (response.error) {
        setDateError(response.error.message || 'Failed to fetch items for this date')
      } else {
        setDateItems(response.data || [])
      }
    } catch (err) {
      setDateError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setDateLoading(false)
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
        {monthLoading ? (
          <div className="grid grid-cols-7 gap-0 border border-zinc-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day: string) => (
              <div key={day} className="bg-gray-100 p-3 text-center font-semibold text-gray-700 border-b border-gray-200">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={`empty-${i}`} className="h-20 bg-gray-50 border border-gray-200 flex items-center justify-center">
                <p className="text-gray-400 text-sm">Loading...</p>
              </div>
            ))}
          </div>
        ) : monthError ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            Error: {monthError}
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-0 border border-zinc-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day: string) => (
              <div key={day} className="bg-gray-100 p-3 text-center font-semibold text-gray-700 border-b border-gray-200">
                {day}
              </div>
            ))}
            {renderCalendar({ currentDate, tasks, onDateClick: handleDateClick })}
          </div>
        )}
      </div>

      {/* Slider */}
      <CalendarSlider 
        isOpen={isSliderOpen}
        selectedDate={selectedDate}
        dateItems={dateItems}
        dateLoading={dateLoading}
        dateError={dateError}
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