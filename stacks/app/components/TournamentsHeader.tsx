import { NavLink, Link } from "@remix-run/react";
export default function Header() {
  return (
    <header className="px-2">
      <h1 className="flex justify-center text-center py-5 text-4xl">
        <Link to="/">Stacks</Link>
      </h1>
      <nav className="py-5">
        <h1 className="text-center text-2xl pb-2">Tournaments Admin</h1>
        <ul className="flex justify-center items-center text-center space-x-5">
          <li>
            <NavLink to="/tournaments">Tournaments</NavLink>
          </li>
          <li>
            <NavLink to="/tournaments/add">Tournaments Add</NavLink>
          </li>
        </ul>
      </nav>
      <nav className="py-5">
        <h1 className="text-center text-2xl pb-2">Tournaments Public</h1>
        <ul className="flex justify-center items-center text-center space-x-5">
          <li>
            <NavLink to="/tournaments">Tournaments</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
