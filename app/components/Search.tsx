'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const Search = React.forwardRef<HTMLInputElement, object>((props, ref) => {
  const router = useRouter()
  const [name, setName] = useState<string>("");
  const handleSubmit = async () => {
    try {
      //   await SearchAPI(name);
      router.push(
        "/results?name="+name.toLowerCase().trim(),
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex m-4">
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        ref={ref}
        type="text"
        maxLength={19}
        placeholder="Search Your Name"
        className="bg-transparent outline-none border border-gray-600 focus:border-pink-500 hover:border-pink-500 text-gray-300 focus:text-pink-300 hover:text-pink-400 rounded-md text-center p-2 uppercase"
      />
    </div>
  );
});

Search.displayName = "Search";

export default Search;
