import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import './tailwind.css';
import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { SiteHeader } from './components/feature/site/molecules/SiteHeader';
import { getUserFromSession } from './services/session.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const isLoggedIn = (await getUserFromSession(request)) != null;

  return json({
    isLoggedIn,
  });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SiteHeader />
        <div className="p-5">{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
