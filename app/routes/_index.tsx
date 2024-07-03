import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import { getSession } from '../sessions';
import { useLoaderData } from '@remix-run/react';
import { Button } from '~/components/ui/button';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));
  const isLoggedIn = session.has('userId');

  return json({
    isLoggedIn,
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <header className="flex items-center justify-between px-5 py-3">
        <p className="text-4xl font-bold select-none">Todos</p>
        {data.isLoggedIn ? <Button>Sign out</Button> : <Button>Sign in</Button>}
      </header>
    </div>
  );
}
