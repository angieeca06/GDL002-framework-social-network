import React from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";
import Register from "./Components/Register/Register";

function App() {
  return (
    <HashRouter basename="/">
      <div className="App">
        <Switch>
          <Route exact path="/" component={Register} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
