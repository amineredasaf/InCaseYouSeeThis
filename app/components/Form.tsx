import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { randomUUID, UUID } from "crypto";
import { generateSlug } from "../utils/gen_slug";

interface MessageProp {
  name: string,
  message: string,
  slug: String
}

async function CreateMessage(Data: MessageProp) {
  try {
    const { error } = await supabase
    .from("messages")
    .insert({ name: Data.name , message: Data.message, slug: Data.slug });
  } catch (error) {
    console.log("error", error);
  }
}

const MessageForm = React.forwardRef<HTMLButtonElement, {}>((props, ref) => {
  const [Name, SetName] = useState<string>("");
  const [Message, setMessage] = useState<string>("");
  const [ActiveButton, SetActiveButton] = useState(false);

  useEffect(() => {
    if (Name.trim() !== "" && Message.trim() !== "") {
      SetActiveButton(true);
    } else {
      SetActiveButton(false);
    }
  }, [Name, Message]);

  const handleSubmit = async () => {
    const Data : MessageProp = {
      name: Name,
      message: Message,
      slug: generateSlug()
    };
    console.log("We Are Sending this Data");
    console.log(Data);

    await CreateMessage(Data);
  };

  return (
    <div className="h-full w-full justify-center grid">
      <Dialog>
        <div className="component-noise-bg" />
        <form >
          <DialogTrigger asChild>
            <Button
              className="text-white text-sm rounded-md hover:text-pink-300 transition-colors duration-200"
              ref={ref}
            >
              Send Message
            </Button>
          </DialogTrigger>
          <DialogContent className="backdrop-blur-md bg-[#24496b]/80 border border-black text-white rounded-xl p-6 shadow-xl am-x">
            <DialogHeader>
              <p className="text-xs -mb-3">whispr.com</p>
            </DialogHeader>
            <DialogTitle className="text-lg font-semibold mb-0 text-lg">
              Write Your Message
            </DialogTitle>

            <DialogDescription className="text-gray-300 mb-3 text-sm">
              Think about something you've always wanted to tell someone.
            </DialogDescription>

            <div className="space-y-5">
              <div>
                <Label className="text-sm text-gray-200">to? @myex</Label>
                <Input
                  // value={}
                  onChange={(e: any) => SetName(e.target.value)}
                  maxLength={22}
                  placeholder="Jack The ex"
                  className="mt-1  uppercase text-white placeholder:text-gray-400  bg-[#2c2c2c] border-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <Label className="text-sm text-gray-200">Message</Label>
                <textarea
                  maxLength={200}
                  onChange={(e: any) => setMessage(e.target.value)}
                  placeholder="I don’t miss you, I have a cat now"
                  className="w-full h-32 p-3 rounded-md resize-none text-white  placeholder:text-gray-400  bg-[#2c2c2c] border-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            {/* <div className="mt-6 flex justify-end"> */}
              {ActiveButton ? (
                <Button
                  type="submit"
                  className="bg-pink-400 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
                  onPress={handleSubmit}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  disabled
                  type="submit"
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </Button>
              )}
            {/* </div> */}
            <DialogFooter>{/* Put social media here */}</DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
});

export default MessageForm;
