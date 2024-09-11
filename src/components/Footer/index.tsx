import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="md:hidden  bg-blue10 mt-4 p-10 items-center">
      <div className="bg-white rounded-md  text-center">
        <Link href={"#"} className="text-bold text-brown500 underline">
          View allergy information
        </Link>
      </div>
    </footer>
  );
}
