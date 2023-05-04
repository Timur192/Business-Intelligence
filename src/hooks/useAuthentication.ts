import { signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import useToasts from "./useToast";
import userSlice from "../zustand/userSlice";

function useAuthentication() {
  const setUser = userSlice((state) => state.setUser);
  const {ShowToast} = useToasts()
  const navigate = useNavigate()

  function serviceLogin ( providerName: string ) {
    signInWithPopup(
    auth,
    providerName == "googleProvider" ? googleProvider : githubProvider
  )
    .then(() => {
      ShowToast({ status: "success" });
      navigate('/')
    })
    .catch((error) => {
      ShowToast({ status: "error", error: error });
    })
  }

  function Update ({name, urlImg}: {name?: string, urlImg?: string}) {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: name !== '' ? name : null,
        photoURL: urlImg !== '' ? urlImg : null,
      })
        .then(() => {
          ShowToast({ status: "success" });
        })
        .catch((error) => {
          ShowToast({ status: "error", error: error });
        });
    } else return;
  };

  function logOut() {
    signOut(auth).then(()=> navigate('/login'))
    setUser(undefined)
  };

    return { serviceLogin, logOut, Update }
}

export default useAuthentication
