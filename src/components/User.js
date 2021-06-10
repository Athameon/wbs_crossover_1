import { useEffect, useState} from 'react';
import LoadingComponent from './LoadingComponent';
import Error from './Error.js'
import './User.css'
import UserMock from '../UserMock.json';
import { useParams } from 'react-router-dom';
import Feed from './Feed.js';

const User = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false);    //TODO: true
  const [isError, setIsError] = useState(false)

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    setUser(UserMock);

  }, [])

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

  if (user) { // TODO: Remove after real fetch is implemented
    return (
		<>
      <div>
        {isLoading? <LoadingComponent /> :
          isError? <Error /> :
            <div>
              <img src={user.img} alt='User Image'></img>
                      <h2>{user.first_name} {user.last_name}</h2>
                      <h3>{user.user_name}</h3>
              <h3>{user.email}</h3>
            </div>}
      </div>
      <Feed id={id}/>
	  </>
    )
  }
    return <p></p>
}

export default User
