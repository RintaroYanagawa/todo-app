import type { MetaFunction } from '@remix-run/node';
import { Link, useRouteLoaderData } from '@remix-run/react';
import { buttonVariants } from '~/components/ui/button';
import type { loader } from '~/root';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const data = useRouteLoaderData<typeof loader>('route');
  return (
    <div>
      <header className="flex items-center justify-between px-5 py-3">
        <Link to="/" className="text-4xl font-bold select-none">
          Todos
        </Link>
        <div className="space-x-3">
          {data?.isLoggedIn ? (
            <Link
              to="/auth/sign-out"
              className={buttonVariants({ variant: 'outline' })}
            >
              Sign out
            </Link>
          ) : (
            <>
              <Link
                to="/auth/sign-in"
                className={buttonVariants({ variant: 'outline' })}
              >
                Sign in
              </Link>
              <Link
                to="/auth/sign-up"
                className={buttonVariants({ variant: 'outline' })}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
