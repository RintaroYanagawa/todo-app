import { z } from 'zod';

export const authSignInFormValuesSchema = z
  .object({
    email: z.string().email('Please enter your email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    passwordConfirm: z.string().min(1),
    name: z.string().min(1),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        path: ['passwordConfirm'],
        code: 'custom',
        message: 'Password does not match',
      });
    }
  });

export type AuthSignInFormValues = z.infer<typeof authSignInFormValuesSchema>;
