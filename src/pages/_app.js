import React from "react";
import "@/styles/globals.css";
import { useFirebase } from "@/useHooks/useFirebase";
import Link from "next/link";
import { GlobalProvider } from "@/useHooks/useGlobalValues";
import HomeStyle from "../styles/Home.module.css";

export default function App({ Component, pageProps }) {
  const initialGlobalValues = {
    dessertList: [],
    error: "",
  };
  const [globalValues, setGlobalValues] = React.useState(initialGlobalValues);

  function updateGlobalValues(newValues) {
    setGlobalValues({ ...globalValues, ...newValues });
  }

  const firebase = useFirebase();

  return (
    <>
      <GlobalProvider value={{ ...globalValues, update: updateGlobalValues }}>
        <nav className={HomeStyle.nav}>
          <ul>
            <li>
              {firebase.currentUser.email ? (
                <button
                  className={HomeStyle.logUser}
                  onClick={firebase.logOutUser}
                >
                  Logout
                </button>
              ) : (
                <button
                  className={HomeStyle.logUser}
                  onClick={firebase.loginUser}
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </nav>

        <Component {...pageProps} />
      </GlobalProvider>
    </>
  );
}
