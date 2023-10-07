import React, { createContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContex = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loding, setloding] = useState(true);
  const [token, setToken] = useState(null);

  const googleprovaider = new GoogleAuthProvider()
  const facebookprovaider = new FacebookAuthProvider()

  const createuseremailpass = (email, password) => {
    setloding(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signin = (email, password) => {
    setloding(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setloding(true);
    return signOut(auth);
  };

  const updateuser = (userinfo) => {
    return updateProfile(auth.currentUser, userinfo);
  };


  const emailvaryfication = () => {
    setloding(true)
    return sendEmailVerification(auth.currentUser)
  }


  const forgatepassword = (email) => {
    setloding(true)
    return sendPasswordResetEmail(auth, email)
  }

  const removeuser = () => {
    setloding(true)
    return deleteUser(auth.currentUser)
  }

  const googlelogin = () => {
    setloding(true)
    return signInWithPopup(auth, googleprovaider)
  }

  const facebooklogin = () => {
    setloding(true)
    return signInWithPopup(auth, facebookprovaider)
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("user observing");
      // console.log(currentUser?.email);
      if (currentUser?.email) {
        fetch(`https://doctors-portal-server-kohl-gamma.vercel.app/jwt?email=${currentUser.email}`)
          .then(res => res.json())
          .then(data => {
            if (data.accessToken) {
              localStorage.setItem('accessToken', data.accessToken);
              setToken(data.accessToken);
            }
          });
      }
      setUser(currentUser);
      setloding(false);
    });

    return () => unsubscribe();
  }, []);

  const authinfo = {
    createuseremailpass,
    signin,
    logout,
    updateuser,
    user,
    loding,
    emailvaryfication,
    forgatepassword,
    removeuser,
    googlelogin,
    facebooklogin,
    token
  };
  return <AuthContex.Provider value={authinfo}>{children}</AuthContex.Provider>;
};

export default AuthProvider;
