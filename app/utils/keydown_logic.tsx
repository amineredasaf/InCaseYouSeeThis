import { useEffect } from "react";

export function Shortcuts() {
  useEffect(() => {
    function handleKeyDown(event: any) {
        console.log(event);
    }
    window.addEventListener('keydown', handleKeyDown);
    return ()=>{
        window.removeEventListener('keydown', handleKeyDown);
    }
  });
}
