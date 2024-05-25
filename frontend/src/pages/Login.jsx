import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const LoginForm = () => {
  const { isLoggedIn, login } = useAuth();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/books");
    }
  }, [isLoggedIn]);

  const onSubmit = (values) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, values)
      .then((response) => {
        const { token, role } = response.data;
        login({ token, role });
        navigate("/books");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="grid items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid">
                      <FormLabel className="text-left">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid">
                      <div className="flex">
                        <FormLabel className="text-left">Password</FormLabel>
                        <Link
                          href="#"
                          className="ml-auto inline-block text-sm underline">
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </form>
        </Form>
        <div className="w-full text-center">
          <h3 className="text-slate-400">user: john.doe@example.com</h3>
          <h3 className="text-slate-400">admin: john.doe2@example.com</h3>
          <h3 className="text-slate-400">password: password123</h3>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
