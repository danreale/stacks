import type { MetaFunction } from "@remix-run/node";

import Header from "~/components/Header";

export const meta: MetaFunction = () => {
  return [
    { title: "Stacks" },
    { name: "description", content: "The Best Poker Room Manager!" },
  ];
};

export default function Index() {
  return (
    <>
      <Header></Header>
      <div className="flex justify-center text-center py-5">
        <p className="text-2xl font-bold">
          Stacks - The Best Poker Room Manager
        </p>
      </div>
    </>
  );
}
