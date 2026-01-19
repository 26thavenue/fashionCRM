import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Email validation regex - RFC 5322 simplified but practical
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Password validation - minimum 8 chars, at least one uppercase, one lowercase, one number, one special char
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

/**
 * Validate email format
 * @param email - Email to validate
 * @returns object with isValid boolean and error message
 */
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email.trim()) {
    return { isValid: false, error: 'Email is required' }
  }
  
  if (email.length > 254) {
    return { isValid: false, error: 'Email is too long' }
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' }
  }
  
  return { isValid: true }
}

/**
 * Validate password strength
 * Requirements: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
 * @param password - Password to validate
 * @returns object with isValid boolean and error message
 */
export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (!password) {
    return { isValid: false, error: 'Password is required' }
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' }
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' }
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' }
  }
  
  if (!/\d/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' }
  }
  
  if (!/[@$!%*?&]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character (@, $, !, %, *, ?, &)' }
  }
  
  return { isValid: true }
}

/**
 * Validate password confirmation
 * @param password - Original password
 * @param confirmPassword - Password confirmation
 * @returns object with isValid boolean and error message
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): { isValid: boolean; error?: string } => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' }
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' }
  }
  
  return { isValid: true }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'Cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

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

/**
 * Get today's date in YYYY-MM-DD format
 */
export const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Get yesterday's date in YYYY-MM-DD format
 */
export const getYesterdayDate = (): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
};

/**
 * Get the current week range (Sunday to Saturday)
 * Returns { startDate, endDate, displayText }
 */
export const getCurrentWeekRange = (): { startDate: string; endDate: string; displayText: string } => {
  const today = new Date();
  const currentDay = today.getDay();
  
  // Calculate days to subtract to get to Sunday (0)
  const daysToSubtract = currentDay === 0 ? 0 : currentDay;
  
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - daysToSubtract);
  
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  
  const startStr = startDate.toISOString().split('T')[0];
  const endStr = endDate.toISOString().split('T')[0];
  
  // Format display text like "7th Jan - 13th Jan"
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const monthName = startDate.toLocaleString('en-US', { month: 'short' });
  const endMonthName = endDate.toLocaleString('en-US', { month: 'short' });
  
  const startOrdinal = getOrdinalSuffix(startDay);
  const endOrdinal = getOrdinalSuffix(endDay);
  
  const displayText = startDate.getMonth() === endDate.getMonth()
    ? `${startDay}${startOrdinal} - ${endDay}${endOrdinal} ${monthName}`
    : `${startDay}${startOrdinal} ${monthName} - ${endDay}${endOrdinal} ${endMonthName}`;
  
  return { startDate: startStr, endDate: endStr, displayText };
};

/**
 * Get ordinal suffix for day number (1st, 2nd, 3rd, 4th, etc.)
 */
export const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};
