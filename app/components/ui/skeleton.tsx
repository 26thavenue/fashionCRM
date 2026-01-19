import React from 'react'

export const CalendarDaySkeleton = () => (
  <div className="h-20 bg-gray-200 border border-gray-300 p-2 animate-pulse rounded"></div>
)

export const CalendarGridSkeleton = () => (
  <div className="grid grid-cols-7 gap-0 border border-zinc-200">
    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day: string) => (
      <div key={day} className="bg-gray-100 p-3 text-center font-semibold text-gray-700 border-b border-gray-200">
        {day}
      </div>
    ))}
    {Array.from({ length: 35 }).map((_, i) => (
      <CalendarDaySkeleton key={`skeleton-${i}`} />
    ))}
  </div>
)

export const TaskCardSkeleton = () => (
  <div className="bg-gray-100 rounded-lg p-4 border border-gray-200 animate-pulse">
    <div className="flex items-start justify-between mb-2">
      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
      <div className="h-6 bg-gray-300 rounded w-12"></div>
    </div>
    <div className="flex items-center gap-2">
      <div className="h-4 bg-gray-300 rounded w-4"></div>
      <div className="h-4 bg-gray-300 rounded w-20"></div>
    </div>
  </div>
)

export const SliderTaskListSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <TaskCardSkeleton key={`task-skeleton-${i}`} />
    ))}
  </div>
)
