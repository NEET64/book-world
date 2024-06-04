import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/useAuth";
import { loginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { isLoggedIn, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
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
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, values)
      .then((response) => {
        const { token, role } = response.data;
        login({ token, role });
        toast({
          description: response.data.message,
        });
        navigate("/books");
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.response.data.message,
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Toaster />
      <div className="grid items-center h-screen dark:bg-zinc-950">
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
                  {isLoading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  )}
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
            <h3 className="text-zinc-400">user: john.doe@example.com</h3>
            <h3 className="text-zinc-400">admin: john.doe2@example.com</h3>
            <h3 className="text-zinc-400">password: password123</h3>
          </div>
        </Card>
      </div>
    </>
  );
};

export default LoginForm;
