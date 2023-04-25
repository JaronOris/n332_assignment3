import React, { use } from "react";
import { useFirebase } from "@/useHooks/useFirebase";
import Message from "@/components/Message";
import MessageStyle from "../styles/Message.module.css";
import useGlobalValues from "@/useHooks/useGlobalValues";

export default function homePage() {
  const firebase = useFirebase();
  const { dessertList, update, error } = useGlobalValues();

  const dessertListComponent = dessertList.map((dessert) => {
    return <li key={dessert.id}>{dessert.name}</li>;
  });

  async function pullDessertsFromDb() {
    try {
      if (!firebase.currentUser.email)
        throw { code: "auth-failed", name: "Firebase Auth" };
      const desserts = await firebase.getDesserts();
      update({ dessertList: desserts, error: "" });
    } catch (e) {
      if (e.code === "auth-failed" && e.name === "Firebase Auth") {
        update({
          error: `${e.name} (${e.code}): You need to login to view the dessert recipes.`,
        });
        console.log();
      } else {
        update({ error: e.toString() });
      }
    }
  }

  return (
    <>
      <h1>My Name is {firebase.currentUser.displayName || "--"}</h1>
      <button onClick={pullDessertsFromDb}>Show Desserts</button>
      <ul>{dessertListComponent}</ul>
      {error ? (
        <>
          <Message type="error">{error}</Message>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
