import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../firebase";

type TypeForm = { email: string; password: string };

export default async function Login({ email, password }: TypeForm) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.code);
    }
    throw new Error("Неизвестная ошибка");
  }
}
