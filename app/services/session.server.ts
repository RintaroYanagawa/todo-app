import { createCookieSessionStorage, redirect } from '@remix-run/node';

const sessionSecret: string | undefined = process.env['SESSION_SECRET'];
if (sessionSecret === undefined) throw new Error('set SESSION_SECRET');

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'auth_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
  },
});

export const createUserSession = async (
  userId: string,
  redirectPath: string,
) => {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
};

export const deleteUserSession = async () => {
  const session = await sessionStorage.getSession();

  return redirect('/auth/sign-in', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
};

export async function getUserFromSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie'),
  );

  const userId: string = session.get('userId');

  if (!userId) {
    return null;
  }

  return userId;
}

export async function requireUserSession(request: Request) {
  const userId = await getUserFromSession(request);

  if (!userId) {
    throw redirect('/auth/sign-in');
  }

  return userId;
}

export async function notRequireUserSession(request: Request) {
  const userId = await getUserFromSession(request);

  if (userId) {
    throw redirect('/');
  }

  return null;
}
