import { Button, buttonVariants } from '~/components/ui/button';

const AuthSignOutLinkPresentational = () => {
  return (
    <form
      method="post"
      action="/auth/sign-out"
      className={buttonVariants({ variant: 'outline' })}
    >
      <button type="submit">Sign out</button>
    </form>
  );
};

export const AuthSignOutLink = () => {
  return <AuthSignOutLinkPresentational />;
};
