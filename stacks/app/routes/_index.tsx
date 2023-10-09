import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Header from "~/components/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "Stacks" },
    { name: "description", content: "The Best Poker Room Manager!" },
  ];
};

export default function Index() {
  return <Header></Header>;
}
