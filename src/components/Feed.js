import "./Feed.css";
import Message from "./Message";
import UserMessage from "./UserMessage";

const Feed = ({data, userMessages}) => {

  if (data) {
    return (
      <>
        {data.messages.map((item) => {
          return (
            <div key={item.id}>
              {userMessages? <UserMessage {...item} /> :
                <Message {...item} />}
            </div>
          );
        })}
      </>
    );
  }
  return <p>Data in Feed is falsy.</p>;
};

export default Feed;
