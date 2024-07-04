import type { LoaderFunctionArgs } from '@remix-run/node';
import { AuthSignUpForm } from '~/components/feature/auth/molecules/AuthSignUpForm';
import { notRequireUserSession } from '~/services/session.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await notRequireUserSession(request);
  return null;
};

export default function SignUp() {
  return (
    <div className="mx-3 md:mx-40 lg:mx-80 xl:mx-80 my-5">
      <AuthSignUpForm />
    </div>
  );
}
