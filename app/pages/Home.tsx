"use client";
// import { Popover, PopoverContent, PopoverTrigger, Input, Button } from "@heroui/react";
import { Button, useDisclosure } from "@heroui/react";
import { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MessageForm from "../components/Form";

export default function Home() {
  const SearchInput = useRef<HTMLInputElement>(null);
  const NewMessage = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // console.log(isOpen);
    function handleKeyDown(event: any) {
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
    <div className=" grid justify-center items-center h-full w-full border border-red-400">
      <div className="grid ">
        <div className="flex m-4">
          <input
            ref={SearchInput}
            type="text"
            maxLength={19}
            placeholder="Search Your Name"
            className="bg-transparent outline-none border border-gray-600 focus:border-pink-500 hover:border-pink-500 text-gray-300 focus:text-pink-300 hover:text-pink-400 rounded-md text-center p-2 uppercase"
          />
        </div>
        {/* Message Form Here */}
        <MessageForm ref={NewMessage}/>

        {/* Shortcuts Here */}
        <div className=" text-gray-400 text-start absolute w-[300px] bottom-10 left-10 ">
          <h3 className="text-gray-300">shortcuts</h3>
          <p>ctrl+k for search</p>
          <p>ctrl+i for new message</p>
        </div>
      </div>
    </div>
  );
}
