export interface IExpense {
  id: string;
  name: string;
  description: string;
  date_of_expense: Date;
  category: string;
  category_display: string;
  amount: number;
  created_by: number;
  user_details: User;
  created_at: Date;
  update_at: Date;
  can_modify: boolean;
}

export interface IExpenseForm {
  name: string;
  description: string;
  date_of_expense: Date;
  category: string;
  amount: number;
}

export interface ILogin {
  user: User;
  refresh_token: string;
  access_token: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
}
