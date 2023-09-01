// https://firebase.google.com/docs/auth/admin/errors
/* Todo : Use Error Code instead of message */

export const Firebase_Errors = {
  "Firebase: Password should be at least 6 characters (auth/weak-password).":
    "Password should be at lease 6 characters",
  "Firebase: Error (auth/email-already-in-use).":
    "A user with that email already exists.",
  "Firebase: Error (auth/user-not-found).": "Invalid email or password",
  "Firebase: Error (auth/wrong-password).": "Invalid email or password",
};
