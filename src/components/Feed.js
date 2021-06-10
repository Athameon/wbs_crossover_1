import "./Feed.css";
import FeedMock from "../Feed.json";
import { useEffect, useState } from "react";
import Message from "./Message";
import UserMessage from "./UserMessage";

const Feed = ({id}) => {
  const [feedData, setFeedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); //TODO: true
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setFeedData(FeedMock);
  }, []);

  console.log('id', id);

  // useEffect(() => {
  //   setIsError(false);
  //   setIsLoading(true);

  //   fetch('id')
  //   .then(result => {
  //     if (result.ok) {
  //       return result.json();
  //     }
  //     throw Error('Error occured during fetching data.');
  //   }, (networkError) => {
  //     throw Error(networkError);
  //   })
  //   .then(jsonResult => {
  //     setUser(jsonResult);

  //     setIsLoading(false);
  //   })
  //   .catch(error => {
  //     console.error(error);

  //     setIsLoading(false);
  //     setIsError(true);
  //   })
  // }, [])
  if (feedData) { // TODO: Remove after real fetch is implemented
    return (
      <>
        {feedData.messages.map((item) => {
          return (
            <>
              {id? <UserMessage {...item} /> :
                <Message {...item} />}
            </>
          );
        })}
      </>
    );
  }
  return <p></p>;
};

export default Feed;
