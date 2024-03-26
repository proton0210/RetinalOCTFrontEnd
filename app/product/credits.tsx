"use client";
import { getUserCredits } from "@/lib/actions/user.action";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

const Credits = ({ ClerkID }: { ClerkID: string }) => {
  const [credits, setCredits] = useState(0);
  useEffect(() => {
    fetchCredits(ClerkID);
  }, []);
  const fetchCredits = async (ClerkID: string) => {
    const result = (await getUserCredits(ClerkID)) as number;
    setCredits(result);
    console.log({ result });
    return <div>Credits</div>;
  };
  return (
    <div className="absolute top-20 font-sans ">
      Number of credits Available:
      {"    "}
      {credits}
      <div>
        <Link href="/pricing" className="text-indigo-500 text-sm">
          Buy more credits
        </Link>
      </div>
    </div>
  );
};

export default Credits;
