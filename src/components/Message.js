import React from "react";
import MessageStyle from "../styles/Message.module.css";

/**
 * @typedef {Object} MessageProps
 * @prop {'error' | 'success' | 'info'}  type This is the type of message being displayed
 */
/**
 *
 * @param {MessageProps} param0
 * @returns
 */

export default function Message({ children, type }) {
  function getMessageClassNameByType() {
    if (type === "error") {
      return MessageStyle.error;
    } else if (type === "info") {
      return MessageStyle.info;
    } else if (type === "success") {
      return MessageStyle.success;
    }
  }

  const messageClasses = [MessageStyle.message];
  messageClasses.push(getMessageClassNameByType());

  return (
    <>
      <div className={messageClasses.join(" ")}>
        <p>{children}</p>
      </div>
    </>
  );
}
