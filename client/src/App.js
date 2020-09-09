import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
// import Alert from "./components/auth/Alert";
// import Dashboard from "./components/dashboard/Dashboard";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

import "./style/App.css";

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    } else if (localStorage.user) {
      console.log("hi guest");
    } else {
      const user = {
        name: "guest",
        accountType: "guest",
        settings: {
          timeMode: "Countdown + Timer",
          sessionTime: 25,
          breakTime: 5,
        },
      };
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, []);
  // adding the [] after useEffect has it only run once
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            {/* <Alert /> */}
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              {/* <Route exact path="/dashboard" component={Dashboard} /> */}
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
