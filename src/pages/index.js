import React from "react";
import { useFirebase } from "@/useHooks/useFirebase";
import Message from "@/components/Message";
import MessageStyle from "../styles/Message.module.css";

export default function homePage() {
  const firebase = useFirebase();
  const [dessertList, setDessertList] = React.useState([]);
  const [error, setError] = React.useState("");

  const dessertListComponent = dessertList.map((dessert) => {
    return <li key={dessert.id}>{dessert.name}</li>;
  });

  async function pullDessertsFromDb() {
    try {
      if (!firebase.currentUser.email)
        throw { code: "auth-failed", name: "Firebase Auth" };
      const desserts = await firebase.getDesserts();
      setDessertList(desserts);
      setError("");
    } catch (e) {
      if (e.code === "auth-failed" && e.name === "Firebase Auth") {
        setError(
          `${e.name} (${e.code}): You need to login to view the dessert recipes.`
        );
        console.log();
      } else {
        setError(e.toString());
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
