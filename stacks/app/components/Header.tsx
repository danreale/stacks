import { NavLink } from "@remix-run/react";
export default function Header() {
  return (
    <header className="px-2">
      <h1 className="flex justify-center text-center py-5">Stacks</h1>
      <nav>
        <h1 className="text-center text-2xl pb-2">Admin Links</h1>
        <ul className="flex justify-center items-center text-center space-x-5">
          <li>
            <NavLink to="/tables">Tables</NavLink>
          </li>
          <li>
            <NavLink to="/tables/add">Add Table</NavLink>
          </li>
          <li>
            <NavLink to="/gametypes">Game Types</NavLink>
          </li>
          <li>
            <NavLink to="/gametypes/add">Add Game Type</NavLink>
          </li>
          <li>
            <NavLink to="/waitinglist">Waiting List</NavLink>
          </li>
          <li>
            <NavLink to="/waitinglist/add">Add Waiting List</NavLink>
          </li>
          <li>
            <NavLink to="/waitinglistplayers">Waiting List Players</NavLink>
          </li>
        </ul>
      </nav>
      <nav className="py-5">
        <h1 className="text-center text-2xl pb-2">Public Links</h1>
        <ul className="flex justify-center items-center text-center space-x-5">
          <li>
            <NavLink to="/waitinglistplayers/public">
              Waiting List Players Public
            </NavLink>
          </li>
          <li>
            <NavLink to="/waitinglistplayers/add">
              Add Player To Waiting List
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
