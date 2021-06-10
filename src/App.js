import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header'
import Error from './components/Error'
import Main from './components/Main'
import Footer from './components/Footer'
import LoadingComponent from './components/LoadingComponent'

function App() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div>
      <Header />
      <Switch>
          <Route path="/error" component={Error} />
          <Route path="/">
          { isLoading? 
              <LoadingComponent /> :
              isError?
                <Redirect to="/error" /> :
                <Main />}
          </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
