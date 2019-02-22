import * as React from 'react'
import {render} from 'react-dom'
import routes from './router';
import "@babel/polyfill";
import 'assets/style/base.css' 
import { Switch, HashRouter as Router, Route } from 'react-router-dom';
interface AppProps{}
interface AppStates{}

class App extends React.Component<AppProps,AppStates> {
    
    constructor(props) {
        super(props)
    }

    render():JSX.Element{
        return(
            <Router>
                <Switch>
                    {
                        routes.map(route => (
                            <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
                        ))
                    }
                </Switch> 
            </Router>
        )
    }
}
render(<App/>,document.getElementById('root'))

