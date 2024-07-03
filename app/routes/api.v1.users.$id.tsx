import { type LoaderFunction, json } from '@remix-run/node';
import prisma from '~/libs/prisma';

export const loader: LoaderFunction = async ({ params }) => {
  const userId = params['id'];
  if (!userId) {
    return json(
      {
        error: 'id is not specified',
      },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return json(
      {
        error: 'user does not exist',
      },
      { status: 404 },
    );
  }

  return json({ user: user });
};
