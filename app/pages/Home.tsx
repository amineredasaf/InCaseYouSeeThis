"use client";
// import { Popover, PopoverContent, PopoverTrigger, Input, Button } from "@heroui/react";
import { useRef, useEffect } from "react";
import MessageForm from "../components/Form";
import Search from "../components/Search";
import BackgroundCanvas from "../components/background_model";
import TitleCanvas from "../components/TitleCanvas";
import FlyingEmojisTitle from "../components/FlyingEmojisTitle";
import { useResponsiveLimit } from "../utils/resposinve_limits"

export default function Home() {
  const SearchInput = useRef<HTMLInputElement>(null);
  const NewMessage = useRef<HTMLButtonElement>(null);
  const limit = useResponsiveLimit() || 8

  useEffect(() => {
    // console.log(isOpen);
    function handleKeyDown(event: KeyboardEvent) {
      // console.log(event);
      if (event.ctrlKey && event.keyCode == 75) {
        event.preventDefault();
        SearchInput.current?.focus();
        // console.log(event.key);
      }
      if (event.ctrlKey && event.keyCode == 73) {
        event.preventDefault();
        NewMessage.current?.click();
        // console.log(event.key);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="h-full w-full grid justify-center items-center">
      <div className="grid ">
      {/* <h1 className="text-white text-2xl justify-center text-center top-30">InCaseYouSeeThis🧧</h1> */}
        {/* <TitleCanvas/> */}
        <FlyingEmojisTitle/>
        <Search ref={SearchInput} limit={limit} />
        {/* Message Form Here */}
        <MessageForm ref={NewMessage} />

        {/* Shortcuts Here */}
        <div className=" text-gray-400 text-start absolute bottom-10 left-10 ">
          <h3 className="text-gray-300">shortcuts</h3>
          <p>ctrl+k for search</p>
          <p>ctrl+i for new message</p>
        </div>
      </div>
      {/* <BackgroundCanvas /> */}
    </div>
  );
}
