import CustomFormField from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldType } from "@/constants/form";
import { LoginSchema, LoginSchemaType } from "@/validators/auth-validator";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/http/auth";
import { useMutation } from "@tanstack/react-query";

function LoginPage() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  const handleLoginSubmit = async (values: LoginSchemaType) => {
    mutation.mutate(values);
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLoginSubmit)}
          className="flex items-center justify-center py-12"
        >
          <div>
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>

              {/* Errors */}
              {mutation.isError && (
                <div className="p-2 border-l-4 border-destructive bg-destructive/10 rounded-md">
                  <p className="text-destructive">{mutation.error.message}</p>
                </div>
              )}

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <CustomFormField
                    fieldType={FormFieldType.EMAIL_INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="m@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <CustomFormField
                    fieldType={FormFieldType.PASSWORD_INPUT}
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                  />
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/auth/register" className="underline">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </form>
      </Form>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default LoginPage;
