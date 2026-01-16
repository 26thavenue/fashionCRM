'use client'
import React from 'react';
import { X, Clock } from 'lucide-react';
import { SelectedDate } from '@/lib/types/calendar';
import { getTaskTypeColor, monthNames } from '@/lib/utils/calendar';

interface CalendarSliderProps {
  isOpen: boolean;
  selectedDate: SelectedDate | null;
  onClose: () => void;
}

const CalendarSlider: React.FC<CalendarSliderProps> = ({ isOpen, selectedDate, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-bordered transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {selectedDate && (
        <div className="h-full flex flex-col">
          {/* Slider Header */}
          <div className="p-6 border-b border-gray-200 bg-primary text-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">
                {monthNames[selectedDate.month]} {selectedDate.day}, {selectedDate.year}
              </h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-zinc-700 rounded-md cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-zinc-100 text-sm">
              {selectedDate.tasks.length} {selectedDate.tasks.length === 1 ? 'task' : 'tasks'}
            </p>
          </div>

          {/* Slider Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {selectedDate.tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 h transition"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{task.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getTaskTypeColor(task.type)}`}>
                      {task.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{task.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarSlider;
