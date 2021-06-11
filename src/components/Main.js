import React, { useState, useEffect } from "react";
import "./Main.css";
import LoadingComponent from './LoadingComponent';
import Error from './Error.js'
import Feed from "./Feed";
import Modal from 'react-modal';
import { DateTime } from "luxon";
import { v4 as uuidv4 } from 'uuid';

const Main = (props) => {
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false)
  const [openModal, setOpenModal] =useState(false)

  async function postData(url = '', data = {}) { 
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const submitPost = (event) => {
    event.preventDefault()
    const messageText = event.target.value;
    event.target.reset()
    if (event.target.value.length === 0){
        alert('You can\'t create empty posts.');
    } else {
      const post_id = uuidv4();
      const post_content = event.target.value;
      const post_date = DateTime.now().toISO();
      let hashtags = "";
      let extracted_hashtags = post_content.split(' ').filter(v=> v.startsWith('#'));
      const author_id = props.selfUser? props.selfUser.id : "";
      for (const single_hashtag in extracted_hashtags)
      {
          hashtags += single_hashtag.replace("#","") + ",";
      }
      const post_hashtags = hashtags.substr(0,hashtags.length-1);
      let messageJson = {
        "id": {post_id},
        "content": {post_content},
        "date": {post_date},
        "author": {
          "id": {author_id},
        },
        "hashtags": {post_hashtags},
        "parent": null,
        "children": ""
      };
      postData("./messages/",messageJson) //TODO: replace "./" with correct API url (probably https://apiurl.domain/messages/) and keys needed
      .then(data => {
        console.log(data); //JSON data parsed by data.json() call
      });
    }
  }

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

  const showModal =() => {
    setOpenModal(true)
  }
  const closeModal =() => {
    setOpenModal(false)
  }

  if (isLoading) {
    return <LoadingComponent />;
  } else if(isError) {
    return <Error />
  } else {
    return (
		<>
      <Feed data={searchResult} />
      <div className='modal-pop'>
        <button className='open-modal-btn' onClick={showModal}>+</button>
      <Modal 
      isOpen={openModal}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className='Modal'
      >
        <form onSubmit={submitPost} className='modal-form'>
          <input id='input' type="text"></input>
          {/* <textarea cols="20" rows="3"></textarea> */}
          <button className='close-modal-btn' onClick={closeModal}>x</button>
        </form>
      </Modal>
      </div>
	  </>
    )
  }
};

export default Main;
