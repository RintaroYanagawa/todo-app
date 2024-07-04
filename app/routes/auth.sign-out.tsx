import { deleteUserSession } from '~/services/session.server';

export const action = async () => {
  return await deleteUserSession();
};
