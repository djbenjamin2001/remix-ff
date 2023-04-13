import { NavLink } from "@remix-run/react";

function MainNavigation() {
    return(
        <nav id="main-navigation">
            <ul>
                <li className="nav-item">
                <NavLink to="/">forside</NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/notes">mine noter</NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default MainNavigation