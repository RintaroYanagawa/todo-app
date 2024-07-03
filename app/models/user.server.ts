import crypto from 'node:crypto';
import { encryptSha256 } from '~/libs/hash';
import prisma from '~/libs/prisma';

export const readUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const readUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
};

export const readUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};

export const createUser = async ({
  email,
  password,
  name,
}: { email: string; password: string; name: string }) => {
  const uuid = crypto.randomUUID();
  const hashedPassword = encryptSha256(password);

  return await prisma.user.create({
    data: {
      id: uuid,
      email: email,
      hashedPassword: hashedPassword,
      name: name,
    },
  });
};
