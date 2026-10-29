import { Expense, ExpenseCategory } from '../types.ts';

export const CATEGORY_CONFIG: Record<
  ExpenseCategory,
  { label: string; icon: string; color: string; badgeColor: string }
> = {
  'Food & Dining': {
    label: 'Food & Dining',
    icon: 'Utensils',
    color: '#0284c7', // Sky blue
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  'Books & Course': {
    label: 'Books & Course',
    icon: 'BookOpen',
    color: '#8b5cf6', // Violet
    badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
  },
  'Housing & Dorm': {
    label: 'Housing & Dorm',
    icon: 'Home',
    color: '#d97706', // Amber
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  'Transit & Commute': {
    label: 'Transit & Commute',
    icon: 'Bus',
    color: '#10b981', // Emerald
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  'Social & Leisure': {
    label: 'Social & Leisure',
    icon: 'Coffee',
    color: '#ec4899', // Pink
    badgeColor: 'bg-pink-50 text-pink-700 border-pink-200',
  },
  'Subscriptions': {
    label: 'Subscriptions',
    icon: 'Film',
    color: '#6366f1', // Indigo
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
};

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    title: 'CS 101 Data Structures Textbook (Used)',
    amount: 38.5,
    category: 'Books & Course',
    date: '2026-10-24',
    paymentMethod: 'Debit Card',
    notes: 'Bought second-hand from senior in dorm 4B',
  },
  {
    id: 'exp-2',
    title: 'Campus Canteen Lunch Bowl & Drink',
    amount: 11.25,
    category: 'Food & Dining',
    date: '2026-10-25',
    paymentMethod: 'Campus Meal Card',
    notes: 'Chicken teriyaki bowl + green tea',
  },
  {
    id: 'exp-3',
    title: 'Study Session Iced Americano',
    amount: 4.75,
    category: 'Food & Dining',
    date: '2026-10-26',
    paymentMethod: 'Digital Wallet / UPI',
    notes: 'Library cafe before midterm',
  },
  {
    id: 'exp-4',
    title: 'Monthly College Metro Pass Reload',
    amount: 25.0,
    category: 'Transit & Commute',
    date: '2026-10-26',
    paymentMethod: 'Debit Card',
    notes: 'Student 30-day discounted transit pass',
  },
  {
    id: 'exp-5',
    title: 'Dorm Shared Detergent & Toilet Paper',
    amount: 14.8,
    category: 'Housing & Dorm',
    date: '2026-10-27',
    paymentMethod: 'Digital Wallet / UPI',
    notes: 'My split share for apartment restock',
    isShared: true,
  },
  {
    id: 'exp-6',
    title: 'Late Night Dorm Pizza with Study Group',
    amount: 9.5,
    category: 'Social & Leisure',
    date: '2026-10-28',
    paymentMethod: 'Cash',
    notes: '3-way split for 2 large pizzas',
    isShared: true,
  },
  {
    id: 'exp-7',
    title: 'Spotify Student + Hulu Bundle',
    amount: 5.99,
    category: 'Subscriptions',
    date: '2026-10-29',
    paymentMethod: 'Debit Card',
    notes: 'Verified college discount',
  },
];
