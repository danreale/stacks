import { Link } from "@remix-run/react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-5">
      <div
        id="logo"
        style={{ textAlign: "center" }}
        className="flex justify-center items-center text-center"
      >
        <p>{`Copyright © ${year} `}</p>
        <div className="px-1"></div>
        <Link to="/" className="underline">
          Stacks{" "}
        </Link>
      </div>
      <div className="text-red flex justify-center items-center text-center py-2">
        <img
          src="../images/casino-chips.png"
          alt="poker chip stack"
          className="object-scale-down h-12 w-12"
        />
      </div>
    </footer>
  );
}

export default Footer;
