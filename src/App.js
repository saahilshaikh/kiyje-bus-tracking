import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import { setCurrentUser } from './redux/user/user.actions';
import {auth,createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';

import HomePage from './layout/pages/homepage/homepage.component';
import SignIn from './layout/pages/sign-in/sign-in.component';
import NotFound from './layout/pages/NOT-FOUND/notfound.component';
import SimpleMap from './layout/pages/homepage/maps/maps';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} =this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      }
      else{
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render(){
  return (
    <div className="App">
          <BrowserRouter>
              <Switch>
                {/* <Route exact path="/" component={SignIn} /> */}
                {/* <Route exact path="/home" component={SimpleMap} /> */}
                <Route exact path="/" component={HomePage} />
                <Route path='*' exact component={NotFound} />
              </Switch>
          </BrowserRouter>
    </div>
  );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null,mapDispatchToProps)(App);

