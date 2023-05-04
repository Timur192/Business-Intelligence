import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../firebase";

type TypeForm = { email: string; password: string };

export default async function Registration({ email, password }: TypeForm) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.code)
    }
    throw new Error("Неизвестная ошибка")
  }
}
