import React from "react";

export default function homePage() {
  return (
    <>
    <h1>My Name is {process.env.NEXT_PUBLIC_MY_NAME}</h1>
    </>
  )
}