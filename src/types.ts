export type ExpenseCategory = 
  | 'Food & Dining'
  | 'Books & Course'
  | 'Housing & Dorm'
  | 'Transit & Commute'
  | 'Social & Leisure'
  | 'Subscriptions';

export type PaymentMethod = 
  | 'Cash'
  | 'Debit Card'
  | 'Campus Meal Card'
  | 'Digital Wallet / UPI';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // YYYY-MM-DD
  paymentMethod: PaymentMethod;
  notes?: string;
  isShared?: boolean;
}

export interface CategorySummary {
  category: ExpenseCategory;
  amount: number;
  count: number;
  percentage: number;
  color: string;
}
