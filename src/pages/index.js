import React, { use } from "react";
import { useFirebase } from "@/useHooks/useFirebase";
import Message from "@/components/Message";
import MessageStyle from "../styles/Message.module.css";
import HomeStyle from "../styles/Home.module.css";
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
      <div className={HomeStyle.hero}>
        <h1 className={HomeStyle.callout}>
          Hey there, {firebase.currentUser.displayName || "Login"}!
        </h1>
        <button className={HomeStyle.loadList} onClick={pullDessertsFromDb}>
          View Dessert List
        </button>
        <ul className={HomeStyle.listItems}>{dessertListComponent}</ul>
        {error ? (
          <>
            <Message type="error">{error}</Message>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
