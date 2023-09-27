export const checkUser = (currentUserId: string): boolean => {
  const allowedUserId: string | undefined =
    process.env.NEXT_PUBLIC_ADMIN_USER_1;

  if (allowedUserId) {
    return allowedUserId === currentUserId;
  }

  return false;
};
