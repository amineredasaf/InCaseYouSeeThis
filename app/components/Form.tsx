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
import { generateSlug } from "../utils/gen_slug";
import { Toaster, toast } from "sonner";

interface MessageProp {
  name: string;
  message: string;
  slug: string;
}

async function CreateMessage(Data: MessageProp) {
  try {
    await supabase
      .from("messages")
      .insert({ name: Data.name, message: Data.message, slug: Data.slug });
    // toast.success('Event has been created')
  } catch (error) {
    console.log("error", error);
  }
}

const MessageForm = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>((props, ref) => {
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
    const Data: MessageProp = {
      name: Name.toLowerCase().trim(),
      message: Message,
      slug: generateSlug(),
    };
    console.log("We Are Sending this Data");
    console.log(Data);

    try {
      await CreateMessage(Data);
      toast.success("Message has been created", { position: "top-center" });
    } catch {}
  };

  return (
    <div className="h-full w-full justify-center grid">
      <Dialog>
        <Toaster richColors />
        <div className="component-noise-bg" />
        <form>
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
              <p className="text-xs -mb-3">InCaseYouSeeThis.com</p>
            </DialogHeader>
            <DialogTitle className="font-semibold mb-0 text-lg">
              Write Your Message
            </DialogTitle>

            <DialogDescription className="text-gray-300 mb-3 text-sm">
              Think about something you ve always wanted to tell someone.
            </DialogDescription>

            <div className="space-y-5">
              <div>
                <Label className="text-sm text-gray-200">to? @myex</Label>
                <Input
                  // value={}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    SetName(e.target.value)
                  }
                  maxLength={22}
                  placeholder="Jack The ex"
                  className="mt-1  uppercase text-white placeholder:text-gray-400  bg-[#2c2c2c] border-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <Label className="text-sm text-gray-200">Message</Label>
                <textarea
                  maxLength={200}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setMessage(e.target.value)
                  }
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

MessageForm.displayName = "MessageForm";

export default MessageForm;
