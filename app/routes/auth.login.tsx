import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { getSession } from '../sessions';
import { useLoaderData } from '@remix-run/react';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));
  const isLoggedIn = session.has('userId');

  return json({
    isLoggedIn,
  });
};

export const Login = () => {
  const data = useLoaderData<typeof loader>();
  return <div> </div>;
};
