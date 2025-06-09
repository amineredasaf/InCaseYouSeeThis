'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { ArrowRight } from "lucide-react";

interface props {
  limit: number
}

const Search = React.forwardRef<HTMLInputElement, props>((props, ref,) => {
  const router = useRouter()
  const [name, setName] = useState<string>("");
  const handleSubmit = async () => {
    try {
      //   await SearchAPI(name);
      router.push(
        "/results?name="+name.toLowerCase().trim()+"&limit=",

      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex m-4 relative">
        {name && (
          <button
            type="button"
            aria-label="Search"
            onClick={handleSubmit}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-500 focus:outline-none"
            tabIndex={0}
          >
            <ArrowRight size={16} />
          </button>
        )}
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
        className={`bg-transparent outline-none border border-gray-600 focus:border-pink-500 hover:border-pink-500 text-gray-300 focus:text-pink-300 hover:text-pink-400 rounded-md text-center p-2 uppercase `}
      />
    </div>
  );
});

Search.displayName = "Search";

export default Search;
