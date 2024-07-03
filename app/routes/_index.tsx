import type { MetaFunction } from '@remix-run/node';
import { useRouteLoaderData } from '@remix-run/react';
import { Button } from '~/components/ui/button';
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
        <p className="text-4xl font-bold select-none">Todos</p>
        <div>
          {data?.isLoggedIn ? (
            <Button>Sign out</Button>
          ) : (
            <>
              <Button>Sign in</Button>
              <Button>Sign up</Button>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
