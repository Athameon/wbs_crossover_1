import './App.css';
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import User from './components/User';
import Status from './components/Status';
import About from './components/About.js';

function App() {
  const [searchValue, setSearchValue] = useState(null);

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
            <Main searchValue={searchValue} />
          </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
