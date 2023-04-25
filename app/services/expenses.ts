import ApiBase from "./api-base";

import type { IExpense, IExpenseForm, IExpenseResponse } from "@/types";

class ExpenseServices extends ApiBase {
  static async getExpenses() {
    return await this.get<IExpenseResponse>("/expenses/");
  }

  static async getExpenseById(id: string) {
    return await this.get<IExpense>(`/expenses/${id}`);
  }

  static async createExpense(expense: IExpenseForm) {
    return await this.post<IExpense>("/expenses/", expense);
  }

  static async updateExpense(expense: IExpense) {
    return await this.patch<IExpense>(`/expenses/${expense.id}/`, expense);
  }

  static async deleteExpense(id: string) {
    return await this.delete(`/expenses/${id}`);
  }
}

export default ExpenseServices;
