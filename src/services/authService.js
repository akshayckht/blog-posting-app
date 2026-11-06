import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import { auth } from "../lib/firebase.js";

//Register New User
export const registerUser = async ({ fullName, email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const user = userCredential.user;

  if (fullName?.trim()) {
    await updateProfile(user, {
      displayName: fullName.trim(),
    });
  }

  return user;
};

//Login an user
export const loginUser = async ({email, password}) => {

    const userCredential =await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
    );

    return userCredential.user
}

//Log out
export const logOut = async () => {
    await signOut(auth);
}