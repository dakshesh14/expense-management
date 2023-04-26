import React, { useEffect } from "react";

// react hook form
import { useForm } from "react-hook-form";

// headless ui
import { Dialog, Transition } from "@headlessui/react";

// services
import ExpensesServices from "@/services/expenses";

// ui
import { Input } from "@/components";

import type { IExpense, IExpenseForm } from "@/types";
type Props = {
  open: boolean;
  handleClose: () => void;
  onSuccess: () => void;
  data?: IExpense | null;
};

const defaultValues: IExpenseForm = {
  name: "",
  amount: 0,
  category: "other",
  date_of_expense: new Date(),
  description: "",
};

const CATEGORIES = [
  "health",
  "electronics",
  "transport",
  "education",
  "book",
  "other",
];

export const CreateUpdateExpensesModal: React.FC<Props> = (props) => {
  const { open, handleClose, data, onSuccess } = props;

  const onClose = () => {
    handleClose();
    const timer = setTimeout(() => {
      reset(defaultValues);
      clearTimeout(timer);
    }, 500);
  };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IExpense>({
    defaultValues: defaultValues,
  });

  const onSubmit = async (formData: IExpense) => {
    const payload = {
      ...formData,
    };
    if (data) {
      await ExpensesServices.updateExpense(payload)
        .then(() => {
          onClose();
          onSuccess();
        })
        .catch((err) => {
          Object.keys(err?.response?.data).forEach((key) => {
            setError(key as keyof IExpense, {
              type: "manual",
              message: err[key]?.join(", "),
            });
          });
        });
    } else {
      await ExpensesServices.createExpense(payload)
        .then(() => {
          onClose();
          onSuccess();
        })
        .catch((err) => {
          Object.keys(err?.response?.data).forEach((key) => {
            setError(key as keyof IExpense, {
              type: "manual",
              message: err[key]?.join(", "),
            });
          });
        });
    }
  };

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-500 bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-100 bg-opacity-60 bg-clip-padding px-4 pb-4 pt-5 text-left text-gray-900 shadow-xl backdrop-blur-sm backdrop-filter transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 lg:max-w-3xl">
                <div className="mt-3 sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6"
                  >
                    {data ? "Update" : "Create"} Resource
                  </Dialog.Title>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-3 sm:mt-5"
                >
                  <div className="space-y-6">
                    <div>
                      <Input
                        label="Name"
                        placeholder="Name"
                        register={register}
                        name="name"
                        error={errors.name}
                        validations={{
                          required: "Name is required",
                        }}
                      />
                    </div>
                    <div>
                      <Input
                        label="Amount"
                        placeholder="Amount"
                        register={register}
                        name="amount"
                        type="number"
                        error={errors.amount}
                        validations={{
                          required: "Amount is required",
                        }}
                      />
                    </div>
                    <div>
                      <Input
                        label="Description"
                        placeholder="Description"
                        register={register}
                        name="description"
                        error={errors.description}
                        validations={{
                          required: "Description is required",
                        }}
                      />
                    </div>
                    <div>
                      <Input
                        label="Date of expense"
                        placeholder="Date of expense"
                        register={register}
                        name="date_of_expense"
                        type="date"
                        error={errors.date_of_expense}
                        validations={{
                          required: "Date of expense is required",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        {...register("category", {
                          required: "Category is required",
                        })}
                        className="mt-2 block w-full rounded-md border-0 py-3 pl-3 pr-10 capitalize text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        {CATEGORIES.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-end gap-3 sm:mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {data
                        ? isSubmitting
                          ? "Updating..."
                          : "Update"
                        : isSubmitting
                        ? "Creating..."
                        : "Create"}
                    </button>

                    <button
                      type="button"
                      className="block rounded-md bg-gray-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
