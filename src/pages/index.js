import React from "react";
import { useFirebase } from "@/useHooks/useFirebase";

export default function homePage() {
  const firebase = useFirebase();
  const [dessertList, setDessertList] = React.useState([]);

  const dessertListComponent = dessertList.map(dessert=> {
    return(
      <li key={dessert.id}>{dessert.name}</li>
    )
  });

  async function pullDessertsFromDb() {
    const desserts = await firebase.getDesserts();
    setDessertList(desserts);
  }

  return (
    <>
    <h1>My Name is {firebase.currentUser.displayName || '--'}</h1>
    <button onClick={pullDessertsFromDb}>Show Desserts</button>
    <ul>
      {dessertListComponent}
    </ul>
    </>
  )
}