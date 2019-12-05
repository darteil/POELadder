import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Ladder from "../Ladder";
import LabyrinthLadder from "../LabyrinthLadder";
import Menu from "../Menu";
import ErrorBoundary from "../ErrorBoundary";
import NotFound from "../NotFound";
/* eslint-disable */
import "!style-loader!css-loader!normalize.css/normalize.css";
import "!style-loader!css-loader!@blueprintjs/icons/lib/css/blueprint-icons.css";
import "!style-loader!css-loader!@blueprintjs/core/lib/css/blueprint.css";
/* eslint-enable */
import styles from "./styles.css";

const App = () => (
  <div className="bp3-dark">
    <BrowserRouter>
      <Fragment>
        <Menu />
        <ErrorBoundary>
          <div className={styles.wrap}>
            <Switch>
              <Route path="/" component={Ladder} />
              <Route path="/lab-ladder" component={LabyrinthLadder} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </ErrorBoundary>
      </Fragment>
    </BrowserRouter>
  </div>
);

export default App;
