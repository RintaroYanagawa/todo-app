import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { type UseFormReturn, useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import {
  type AuthSignInFormValues,
  authSignInFormValuesSchema,
} from '~/schemas/auth';

type AuthSignUpFormPresentationalProps = {
  form: UseFormReturn<AuthSignInFormValues>;
};

const AuthSignUpFormPresentational = ({
  form,
}: AuthSignUpFormPresentationalProps) => {
  return (
    <div className="p-5 shadow rounded-lg space-y-3">
      <Form {...form}>
        <p className="font-bold text-xl">Sign In</p>
        <form method="post" className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>This is your email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>This is your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>Confirm password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>This is your name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

type AuthSignUpFormProps = {
  validationErrors: { name: string; message: string }[];
};

export const AuthSignUpForm = ({ validationErrors }: AuthSignUpFormProps) => {
  const form = useForm<AuthSignInFormValues>({
    resolver: zodResolver(authSignInFormValuesSchema),
  });

  useEffect(() => {
    for (const validationError of validationErrors) {
      if (validationError.name === 'email') {
        form.setError('email', {
          type: 'server',
          message: validationError.message,
        });
      }
      if (validationError.name === 'password') {
        form.setError('password', {
          type: 'server',
          message: validationError.message,
        });
      }
      if (validationError.name === 'passwordConfirm') {
        form.setError('passwordConfirm', {
          type: 'server',
          message: validationError.message,
        });
      }
      if (validationError.name === 'name') {
        form.setError('name', {
          type: 'server',
          message: validationError.message,
        });
      }
    }
  }, [form.setError, validationErrors]);

  return <AuthSignUpFormPresentational form={form} />;
};
