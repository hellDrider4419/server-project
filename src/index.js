import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PostForm from "./component/postForm";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Provider } from "react-redux";
import store from "./component/store/store.js";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate}>
        <Router>
          <Switch>
            <Route
              path="/Ersrjsgcysafhasbn/:ghfhj/:sdjadj"
              component={PostForm}
            />
            <Route path="/" component={App} />
          </Switch>
        </Router>
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
