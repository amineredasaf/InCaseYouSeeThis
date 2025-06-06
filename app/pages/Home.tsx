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

export default function Home() {
  const SearchInput = useRef<HTMLInputElement>(null);
  const NewMessage = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // console.log(isOpen);
    function handleKeyDown(event: any) {
      console.log(event);
      if (event.ctrlKey && event.keyCode == 75) {
        event.preventDefault();
        SearchInput.current?.focus();
        console.log(event.key);
      }
      if (event.ctrlKey && event.keyCode == 73) {
        event.preventDefault();
        NewMessage.current?.click();
        console.log(event.key);
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
        <div className="h-full w-full justify-center grid">
          <Dialog>
                <div className="component-noise-bg" />
            <form>
              <DialogTrigger asChild>
                <Button
                  className="text-white text-sm rounded-md hover:text-pink-300 transition-colors duration-200"
                  ref={NewMessage}
                >
                  Send Message
                </Button>
              </DialogTrigger>
              <DialogContent className="backdrop-blur-md bg-[#24496b]/80 border border-black text-white rounded-xl p-6 shadow-xl am-x">
                <DialogTitle className="text-lg font-semibold mb-0">
                  Write Your Message
                </DialogTitle>

                <DialogDescription className="text-gray-300 mb-3 text-sm">
                  Think about something you've always wanted to tell someone.
                </DialogDescription>

                <div className="space-y-5">
                  <div>
                    <Label className="text-sm text-gray-200">Name</Label>
                    <Input
                      placeholder="Jack The ex"
                      className="mt-1  uppercase text-white placeholder:text-gray-400  bg-[#2c2c2c] border-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <Label className="text-sm text-gray-200">Message</Label>
                    <textarea
                      placeholder="I don’t miss you, I have a cat now"
                      className="w-full h-32 p-3 rounded-md resize-none text-white  placeholder:text-gray-400  bg-[#2c2c2c] border-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-pink-400 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
                  >
                    Submit
                  </Button>
                </div>
                <DialogFooter>
                  {/* Put social media here */}
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
        <div className=" text-gray-400 text-start absolute w-[300px] bottom-10 left-10 ">
          <h3 className="text-gray-300">shortcuts</h3>
          <p>ctrl+k for search</p>
          <p>ctrl+i for new message</p>
        </div>
      </div>
    </div>
  );
}
