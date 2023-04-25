import type { NextPage } from "next";
import { useRouter } from "next/router";

// react hook form
import { useForm } from "react-hook-form";

// services
import Authentication from "@/services/authentication";

// icons
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

// ui
import { Input } from "@/components";

type FormValues = {
  username: string;
  password: string;
};

const defaultValues = {
  username: "",
  password: "",
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  const nextUrl = router.query.next as string;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    Authentication.login(data.username, data.password)
      .then(() => {
        if (nextUrl) router.push(nextUrl);
        else router.push("/");
      })
      .catch(() => {
        setError("username", {
          type: "manual",
          message: "Invalid username or password",
        });
      });
  };

  return (
    <div className="container mx-auto flex h-screen items-center justify-center p-6">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border bg-white px-4 py-6 sm:rounded-lg sm:px-10">
          {nextUrl && (
            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon
                    className="h-5 w-5 text-yellow-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Login with an account that has access to this page.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in
            </h2>
          </div>
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Username"
                  register={register}
                  validations={{ required: "Username is required" }}
                  error={errors.username}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  register={register}
                  validations={{ required: "Password is required" }}
                  error={errors.password}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
