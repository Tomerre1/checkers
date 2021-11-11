import { BoardPage } from './pages/BoardPage'

const routes = [
    {
        path: '/',
        component: BoardPage,
        isExact: true
    },
    {
        path: '/checkers',
        component: BoardPage,
        isExact: true
    },
]

export default routes;