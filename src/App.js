import './App.css';
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import User from './components/User';
import Status from './components/Status';
import About from './components/About.js';

function App() {
  const [searchValue, setSearchValue] = useState(null);
  const [selfUser, setSelfUser] = useState(null);

  useEffect(() => {
    fetch('/UserSelfMock.json')
    .then(result => {
      if (result.ok) {
        return result.json();
      }
      throw Error('Error occured during fetching data.');
    }, (networkError) => {
      throw Error(networkError);
    })
    .then(jsonResult => {
      console.log('Fetched user self from the API: ', jsonResult);
      setSelfUser(jsonResult);
    })
    .catch(error => {
      console.error(error);
    })
    
  }, [])

  const performSearch = (searchValue) => {
    setSearchValue(searchValue);
  }

  return (
    <div>
      <Header performSearch={performSearch} />
      <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route path="/user/:id" component={User} />
          <Route path="/message/:id" component={Status} />
          <Route path="/">
            <Main searchValue={searchValue} selfUser={selfUser} />
          </Route>
      </Switch>
      <Footer selfUser={selfUser} />
    </div>
  );
}

export default App;
