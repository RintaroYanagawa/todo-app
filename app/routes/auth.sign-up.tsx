import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type TypedResponse,
  json,
} from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { AuthSignUpForm } from '~/components/feature/auth/molecules/AuthSignUpForm';
import { createUser, readUserByEmail } from '~/models/user.server';
import { authSignInFormValuesSchema } from '~/schemas/auth';
import {
  createUserSession,
  notRequireUserSession,
} from '~/services/session.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await notRequireUserSession(request);
  return null;
};

export const action = async ({
  request,
}: ActionFunctionArgs): Promise<
  TypedResponse<{ errors: { name: string; message: string }[] }>
> => {
  const formData = Object.fromEntries(await request.formData());
  const result = authSignInFormValuesSchema.safeParse(formData);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      name: issue.path.join(''),
      message: issue.message,
    }));
    return json({
      errors,
    });
  }

  const { email, password, name } = result.data;
  const existsUser = (await readUserByEmail(email)) != null;
  if (existsUser) {
    const errors = [
      {
        name: 'email',
        message: 'Your email address is already in use',
      },
    ];
    return json({
      errors,
    });
  }

  const user = await createUser({ email, password, name });
  return await createUserSession(user.id, '/');
};

export default function SignUp() {
  const actionData = useActionData<typeof action>();
  return (
    <div className="mx-3 md:mx-40 lg:mx-80 xl:mx-80 my-5">
      <AuthSignUpForm validationErrors={actionData?.errors ?? []} />
    </div>
  );
}
