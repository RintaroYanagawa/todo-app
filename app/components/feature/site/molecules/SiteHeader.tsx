import { Link, useRouteLoaderData } from '@remix-run/react';
import { buttonVariants } from '~/components/ui/button';
import type { loader as routeLoader } from '~/root';
import { AuthSignOutLink } from '../../auth/atoms/AuthSignOutLink';

type SiteHeaderPresentationalProps = {
  isLoggedIn: boolean;
};

const SiteHeaderPresentational = ({
  isLoggedIn,
}: SiteHeaderPresentationalProps) => {
  return (
    <header className="flex items-center justify-between px-5 py-3 shadow">
      <Link to="/" className="text-3xl font-bold select-none">
        Todos
      </Link>
      <div className="space-x-3">
        {isLoggedIn ? (
          <AuthSignOutLink />
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
  );
};

export const SiteHeader = () => {
  const data = useRouteLoaderData<typeof routeLoader>('root');
  return <SiteHeaderPresentational isLoggedIn={!!data?.isLoggedIn} />;
};
