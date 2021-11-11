import { NavLink } from "react-router-dom";
export const BoardHeader = () => {
    return (
        <header className="app-header flex align-center justify-center">
            <NavLink to="/">
                <h1>Checkers Game</h1>
            </NavLink>
        </header>
    )
}
