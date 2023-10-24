import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

export const signup = async <T extends Record<string, string>>(
  data: T,
  imageUrl?: string
) => {
  try {
    const userCredentail = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredentail.user;
    await updateProfile(user, {
      displayName: data.fullName,
      photoURL: imageUrl,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const login = async <T extends Record<string, string>>(data: T) => {
  try {
    const userCredentail = await signInWithEmailAndPassword(
      auth,
      data?.email,
      data?.password
    );
    const user = userCredentail.user;
    return user;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) return null;
      resolve(user);
    });
  });
};
