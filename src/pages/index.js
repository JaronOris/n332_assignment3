import React from "react";
import useFirebase from "@/useHooks/useFirebase";

export default function homePage() {
  const firebase = useFirebase();
  return (
    <>
    <h1>My Name is {firebase.currentUser.displayName || '--'}</h1>
    </>
  )
}