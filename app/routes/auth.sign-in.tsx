import type { LoaderFunctionArgs } from '@remix-run/node';
import { AuthSignInForm } from '~/components/feature/auth/molecules/AuthSignInForm';
import { notRequireUserSession } from '~/services/session.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await notRequireUserSession(request);
  return null;
};

export default function SignIn() {
  return <AuthSignInForm />;
}
