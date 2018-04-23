import * as React from "react";
import ReactDOM from "react-dom";
import {Route,BrowserRouter} from "react-router-dom"

import Index from "./components/index"
import "./assets/style/base.css"

const App = props => {
    return (
        <BrowserRouter basename="/">
            <Route path="/" component={Index} />
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.getElementById("app"))