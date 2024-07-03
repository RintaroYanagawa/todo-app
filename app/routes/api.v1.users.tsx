import { json } from '@remix-run/node';
import prisma from '~/libs/prisma';

export const loader = async () => {
  const users = await prisma.user.findMany();
  return json({
    data: { users },
  });
};
