import { useState } from "react";

// swr
import useSWR from "swr";

// components
import { DeleteConfirmModal } from "@/components";

// hoc
import withAuth from "@/hoc/withAuthentication";

// services
import ExpensesServices from "@/services/expenses";

// helpers
import { formatTime, timeAgo } from "@/helpers";

// icons
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Home = () => {
  const [deleteSelected, setDeleteSelected] = useState<string | null>(null);

  const {
    data: expenses,
    error,
    mutate,
  } = useSWR("expenses", () => ExpensesServices.getExpenses());

  if (!expenses)
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Loading...
        </h1>
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Failed to load
        </h1>
      </div>
    );

  return (
    <div className="container mx-auto h-screen overflow-auto py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Expenses
            </h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Expenses
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      Date of Expense
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Updated At
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Created By
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.results.map((expense) => (
                    <tr key={expense.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                        {expense.name}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {expense.category_display}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {formatTime(expense.date_of_expense)}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        INR {expense.amount}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {timeAgo(expense.update_at)}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {expense.can_modify
                          ? `${expense.user_details.username} (You)`
                          : expense.user_details.username}
                      </td>
                      <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        <div className="flex items-center gap-2">
                          {expense.can_modify && (
                            <button
                              type="button"
                              className="text-indigo-600 hover:text-indigo-500"
                            >
                              <PencilIcon className="h-5 w-5" />
                              <span className="sr-only">
                                , Edit {expense.name}
                              </span>
                            </button>
                          )}
                          {expense.can_modify && (
                            <button
                              type="button"
                              onClick={() => setDeleteSelected(expense.id)}
                              className="text-red-600 hover:text-red-500"
                            >
                              <TrashIcon className="h-5 w-5" />
                              <span className="sr-only">
                                , Delete {expense.name}
                              </span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <nav className="isolate mt-5 flex justify-end" aria-label="Pagination">
          <button
            type="button"
            disabled={expenses.previous === null}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-current="page"
            className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            1
          </button>
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            2
          </button>
          <button
            type="button"
            disabled={expenses.next === null}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>

      <DeleteConfirmModal
        isOpen={deleteSelected !== null}
        onClose={() => {
          setDeleteSelected(null);
        }}
        onConfirm={async () => {
          if (deleteSelected === null) return;
          await ExpensesServices.deleteExpense(deleteSelected)
            .then(() => {
              setDeleteSelected(null);
              mutate((prevData) => {
                if (!prevData) return prevData;
                return {
                  ...prevData,
                  results: prevData.results.filter(
                    (expense) => expense.id !== deleteSelected
                  ),
                };
              });
            })
            .catch((error) => {
              setDeleteSelected(null);
              if (
                error?.response?.status === 403 ||
                error?.response?.status === 401
              ) {
                alert(
                  error?.response?.data?.detail ??
                    "You don't have permission to delete this expense"
                );
              }
            });
        }}
      />
    </div>
  );
};

export default withAuth(Home);
