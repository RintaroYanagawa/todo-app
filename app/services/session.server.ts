import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { encryptSha256 } from '~/libs/hash';
import { createUser, readUserByEmail } from '~/models/user.server';

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

const createUserSession = async (userId: string, redirectPath: string) => {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
};

export const signIn = async ({
  email,
  password,
}: { email: string; password: string }) => {
  const user = await readUserByEmail(email);
  const hashedPassword = encryptSha256(password);
  if (user?.hashedPassword !== hashedPassword) {
    return {
      ok: false,
      error: new Error(
        'Could not log you in, please check the provided email or password',
      ),
    } as const;
  }

  return await createUserSession(user.id, '/');
};

export const signUp = async ({
  email,
  password,
  name,
}: { email: string; password: string; name: string }) => {
  const user = await readUserByEmail(email);
  if (user != null) {
    return {
      ok: false,
      error: new Error('A user with the provided email address exists already'),
    } as const;
  }

  const createdUser = await createUser({ email, password, name });

  return await createUserSession(createdUser.id, '/');
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
