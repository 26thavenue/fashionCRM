'use client'
import React from 'react';
import { X, Clock } from 'lucide-react';
import { SelectedDate } from '@/lib/types/calendar';
import { getTaskTypeColor, monthNames } from '@/lib/utils/calendar';
import { CalendarItem } from '@/lib/types';

interface CalendarSliderProps {
  isOpen: boolean;
  selectedDate: SelectedDate | null;
  dateItems?: CalendarItem[];
  dateLoading?: boolean;
  dateError?: string | null;
  onClose: () => void;
}

const CalendarSlider: React.FC<CalendarSliderProps> = ({ 
  isOpen, 
  selectedDate, 
  dateItems = [],
  dateLoading = false,
  dateError = null,
  onClose 
}) => {
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
              {dateLoading ? 'Loading items...' : `${dateItems.length} ${dateItems.length === 1 ? 'item' : 'items'}`}
            </p>
          </div>

          {/* Slider Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {dateLoading ? (
              <div className="text-center text-gray-500 py-8">
                <p>Loading items...</p>
              </div>
            ) : dateError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                Error: {dateError}
              </div>
            ) : dateItems.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>No items for this date</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dateItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 transition hover:border-gray-300"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getTaskTypeColor(item.type as any)}`}>
                        {item.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(item.due_date).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}</span>
                    </div>
                    {item.status && (
                      <div className="mt-2 text-xs text-gray-500">
                        Status: <span className="font-medium">{item.status}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarSlider;
