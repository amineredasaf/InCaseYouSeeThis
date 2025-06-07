// this code is not imporeted anywhere 
import { useEffect } from "react";

export function Shortcuts() {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
        console.log(event);
    }
    window.addEventListener('keydown', handleKeyDown);
    return ()=>{
        window.removeEventListener('keydown', handleKeyDown);
    }
  });
}
