import "../libs/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const signInWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user);
    })
    .catch((error) => {
      console.log(error.code);
    });
}