import "./Status.css";
import Message from "./Message";
import UserMessage from "./UserMessage";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import LoadingComponent from "./LoadingComponent";
import Error from "./Error.js";
import Header from "./Header";
import Footer from "./Footer";

const Status = () => {
  const [statusMessage, setStatusMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const status = useRef(null);
  const comments = useRef(null);
  const { id } = useParams();

  // async function fetchChildren(childrenArray, children) {
  //   for (const childId in children.split(',')) {
  //     const commentResult = await fetch("/Comment.json"); //TODO: Replace by API from backend with messages/:childId
  //     let comment = null;
  //     if (commentResult.ok) {
  //       comment = await commentResult.json();
  //     }
  //     childrenArray.push(comment);
  //     // setComments(comments.push(comment)); //TODO: test if this works correctly!
  //     console.log(
  //       "Fetched following comment message from the API: ",
  //       status.comments
  //     );
  //     if (comment && comment.children) {
  //       const childrenString = comment.children;
  //       comment.children = [];
  //       await fetchChildren(comment.children, childrenString);
  //     }
  //   }
  // }

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    (async () => {
      try {
        const messageResult = await fetch("/Feed.json"); // TODO: Replace by API from backend with messages/:id
        if (!messageResult.ok) {
          throw Error("Failed to fetch the status data.");
        }
        const message = await messageResult.json();
        status.current = message;
        console.log("Fetched following data from the message API: ", message);

        status.current.comments = [];
        console.log("Fetching comments for this message");
        for (const commentId in message.children.split(",")) {
          status.current.comments.push(await getComment(commentId));
        }
        setIsLoading(false);
        setStatusMessage(status.current);
      } catch (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      }
    })()}, []);

  if (isLoading) {
    return <LoadingComponent />;
  } else if (isError) {
    return <Error />;
  } else {
    if (statusMessage) {
      return (
        <>
          <Message {...statusMessage} />
          {statusMessage && statusMessage.children_objects.map(item => {
            <Message {...item} />
          })}
        </>
      );
    }
    return <>Oops! We were unable to load the status page.</>;
  }
};

export default Status;

const getComment = async (messageId) => {
  const messageResult = await fetch("/Message.json"); // TODO: Replace by API from backend with messages/:messageId
  if (!messageResult.ok) {
    throw Error("Failed to fetch the status data.");
  }
  const message = await messageResult.json();
  message.children_objects = [];
  if (message.children) {
    //final child in recursive chain
    for (const childId in message.children.split(",")) {
      message.children_objects.put(await getComment(childId));
    }
  }
  return message;
};
