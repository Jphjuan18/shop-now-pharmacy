"use client";
import React, { useState } from "react";
import { db, auth, provider } from "../../lib/firebase-config";
import {
  collection,
  Timestamp,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import Forgot from "../components/forgot";
import { useCookies } from "react-cookie";

function Login() {
  const [cookies, setCookie] = useCookies(["uid", "isAuth"]);
  const [signUp, setSignUp] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const usersCollectionRef = collection(db, "users");
  // eslint-disable-next-line

  const signUpWithEmail = (fname, lname, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // create the user document with the specified fields
        const newDocRef = doc(usersCollectionRef, userCredential.user.uid);
        const data = {
          userName: fname.toLowerCase() + " " + lname.toLowerCase(),
          userEmail: email,
        };
        // check if the userCreationDate field already exists
        return getDoc(newDocRef).then((doc) => {
          if (doc.exists("userCreationDate")) {
            setDoc(newDocRef, data, { merge: true });
          } else {
            data.userCreationDate = Timestamp.fromDate(new Date());
            setDoc(newDocRef, data);
          }
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast("Email already in use");
        }
      })
      .then(() => {
        toast("Sign up successful");
        setSignUp(false);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setCookie("uid", result.user.uid, {
          path: "/",
          secure: true,
          expires: new Date(Date.now() + 30 * 24 * 3600 * 1000),
        });

        setCookie("isAuth", true, {
          path: "/",
          secure: true,
          expires: new Date(Date.now() + 30 * 24 * 3600 * 1000),
        });
        // create the user document with the specified fields
        const newDocRef = doc(usersCollectionRef, result.user.uid);
        const data = {
          userName: result.user.displayName,
          userEmail: result.user.email,
        };
        // check if the userCreationDate field already exists
        return getDoc(newDocRef).then((doc) => {
          if (doc.exists("userCreationDate")) {
            return setDoc(newDocRef, data, { merge: true }).then(() => {
              return result;
            });
          } else {
            data.userCreationDate = Timestamp.fromDate(new Date());
            return setDoc(newDocRef, data).then(() => {
              return result;
            });
          }
        });
      })
      .then((result) => {
        // Navigate to the new page after the document has been added
        const newDocRef = doc(usersCollectionRef, result.user.uid);
        return waitForDoc(newDocRef).then(() => {
          window.location.pathname = "/";
        });
      });
  };

  const waitForDoc = (docRef) => {
    return new Promise((resolve) => {
      const unsubscribe = onSnapshot(
        docRef,
        (doc) => {
          if (doc.exists()) {
            unsubscribe();
            resolve();
          }
        },
        (error) => {
          unsubscribe();
          throw error;
        }
      );
    });
  };

  const signInWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setCookie("uid", result.user.uid, {
          path: "/",
          secure: true,
          expires: new Date(Date.now() + 30 * 24 * 3600 * 1000),
        });

        setCookie("isAuth", true, {
          path: "/",
          secure: true,
          expires: new Date(Date.now() + 30 * 24 * 3600 * 1000),
        });

        window.location.pathname = "/";
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          // handle the user not found error here
          toast("Create an account to login");
        }
        if (error.code === "auth/wrong-password") {
          // handle the user not found error here
          toast("Incorrect password");
        } else {
          // handle other errors here
          console.log(error);
        }
      });
  };

  return (
    <>
      {!forgotPassword ? (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <Toaster />
          {!signUp ? (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-8">Sign in</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = e.target.email.value;
                  const password = e.target.password.value;
                  signInWithEmail(email, password);
                }}
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="border rounded-lg py-2 px-3"
                    type="email"
                    name="email"
                    id="email"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="border rounded-lg py-2 px-3"
                    type="password"
                    name="password"
                    id="password"
                    required
                  />
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  type="submit"
                >
                  Continue with Email
                </button>
              </form>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-6 flex flex-row my-5"
                onClick={signInWithGoogle}
              >
                <h1>Continue with Google</h1>
              </button>
              <button onClick={() => setSignUp(true)}>Sign up</button>
              <br></br>
              <button className="py-2" onClick={() => setForgotPassword(true)}>
                Forgot Password?
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-8">Sign up</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fnameSignUp = e.target.fnameSignUp.value;
                      const lnameSignUp = e.target.lnameSignUp.value;
                      const emailSignUp = e.target.emailSignUp.value;
                      const passwordSignUp = e.target.passwordSignUp.value;
                      signUpWithEmail(
                        fnameSignUp,
                        lnameSignUp,
                        emailSignUp,
                        passwordSignUp
                      );
                    }}
                  >
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="name"
                      >
                        First name
                      </label>
                      <input
                        className="border rounded-lg py-2 px-3"
                        type="name"
                        id="fnameSignUp"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="name"
                      >
                        Last name
                      </label>
                      <input
                        className="border rounded-lg py-2 px-3"
                        type="name"
                        id="lnameSignUp"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="border rounded-lg py-2 px-3"
                        type="email"
                        id="emailSignUp"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="border rounded-lg py-2 px-3"
                        type="password"
                        id="passwordSignUp"
                        required
                      />
                    </div>

                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      type="submit"
                    >
                      Sign up with Email
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-6 flex flex-row my-5"
                      onClick={signInWithGoogle}
                    >
                      <h1>Sign up with Google</h1>
                    </button>
                  </form>
                  {/* {error && (
                  <div className="text-red-500 mt-4 text-sm">{error}</div>
                )} */}
                  <button onClick={() => setSignUp(false)}>Sign in</button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <Forgot />
      )}
    </>
  );
}
export default Login;
