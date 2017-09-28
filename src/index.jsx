import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Loadable from 'react-loadable'

import './index.css'

const defaultLoadingConfig = {
    loading: () => <div>Loading...</div>,
    render(loaded, props) {
        console.log(loaded);
        console.log(props);
        const Component = loaded.default;
        return <Component {...props}/>;
    }
};

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" exact component={Loadable({
                ...defaultLoadingConfig,
                loader: () => import(/* webpackChunkName: "home" */'./components/Home/Home')
            })}/>
            <Route path="/help" component={Loadable({
                ...defaultLoadingConfig,
                loader: () => import(/* webpackChunkName: "help" */'./components/Help/Help')
            })}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);
