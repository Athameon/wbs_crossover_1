import { useEffect, useState} from 'react';
import LoadingComponent from './LoadingComponent';
import Error from './Error.js'
import './User.css'
import { useParams } from 'react-router-dom';
import Feed from './Feed.js';

const User = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null)
  
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false)

  const { id } = useParams();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    (async () => {
      try {
        const userResult = await fetch('/UserMock.json'); // TODO: Replace by API from backend with 'id'
        if (!userResult.ok) {
          throw Error("Failed to fetch the user data.");
        }
        const user = await userResult.json();

        const messagesResult = await fetch('/Feed.json'); // TODO: Filter and replace by API from backend
        if(!messagesResult.ok) {
          throw Error("Failed to fetch the messages data.");
        }
        const messages = await messagesResult.json();

        console.log('Fetched following data from the user API: ', user);
        setUser(user);
        console.log('Fetched following user messages from the API: ', messages);
        setData(messages);

        setIsError(false);
        setIsLoading(false);
      } catch(error) {
        console.error(error);

        setIsError(true);
        setIsLoading(false);
      }
    })()}, []);

  if (isLoading) {
    return <LoadingComponent />;
  } else if(isError) {
    return <Error />
  } else {
    return (
		<>
      <div>
        <div>
          <img src={user.img} alt='User'></img>
                  <h2>{user.first_name} {user.last_name}</h2>
                  <h3>{user.user_name}</h3>
          <h3>{user.email}</h3>
        </div>
      </div>
      <Feed userMessages={true} data={data}/>
	  </>
    )
  }
}

export default User;