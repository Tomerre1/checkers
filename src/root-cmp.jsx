import React from 'react'
import { Route } from 'react-router'
import routes from './routes'
import { BoardHeader } from './cmps/BoardHeader'

export class RootCmp extends React.Component {
    render() {
        return (
            <div>
                <BoardHeader />
                <main>
                    {routes.map(route => <Route key={route.path} exact={route.isExact} component={route.component} path={route.path} />)}
                </main>
            </div>
        )
    }
}


