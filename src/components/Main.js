import React, { useState, useEffect } from "react";
import "./Main.css";
import LoadingComponent from './LoadingComponent';
import Error from './Error.js'
import Feed from "./Feed";

const Main = (props) => {
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    let url = "/Feed.json";  // Replace by real API address
    console.log('Triggered fetch data wiht search value: ' ,props.searchValue)
    if (props.searchValue) {
      switch (props.searchValue.charAt(0)) {
        case "#":
          url += "?hastag=" + props.searchValue.substr(1, props.searchValue.length - 1);
          break;
        case "@":
          url += "?user=" + props.searchValue.substr(1, props.searchValue.length - 1);
          break;
        default:
          url +=
            "?mustContainString=" +
            props.searchValue.substr(1, props.searchValue.length - 1);
      }
    }

    setIsError(false);
    setIsLoading(true);

    fetch(url)
    .then(result => {
      if (result.ok) {
        return result.json();
      }
      throw Error('Error occured during fetching data.');
    }, (networkError) => {
      throw Error(networkError);
    })
    .then(jsonResult => {
      console.log('Fetched following data from the API: ', jsonResult);
      setSearchResult(jsonResult);

      setIsLoading(false);
    })
    .catch(error => {
      console.error(error);

      setIsLoading(false);
      setIsError(true);
    })

  }, [props.searchValue]);

  if (isLoading) {
    return <LoadingComponent />;
  } else if(isError) {
    return <Error />
  } else {
    return (
		<>
      <Feed data={searchResult} />
	  </>
    )
  }
};

export default Main;
