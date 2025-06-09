import { useState } from "react";
import { motion } from "framer-motion";

const EMOJIS = ["😥", "📩", "💖", "💔", "🌻", "🆘", "🥀", "🌘"];

const FlyingEmojisTitle = () => {
  const [emojis, setEmojis] = useState<number[]>([]);

  const handleHover = () => {
    const newEmojis = Array.from({ length: 5 }, (_, i) => Date.now() + i);
    setEmojis((prev) => [...prev, ...newEmojis]);

    setTimeout(() => {
      setEmojis((prev) => prev.filter((id) => !newEmojis.includes(id)));
    }, 1500);
  };

  return (
    <div className="relative flex justify-center mt-10">
      <h1
        className="text-white text-2xl text-center cursor-pointer relative"
        onMouseEnter={handleHover}
      >
        InCaseYouSeeThis🧧
        {emojis.map((id, i) => (
          <motion.span
            key={id}
            className="absolute right-[-10px] top-[-10px] text-xl select-none pointer-events-none"
            initial={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            animate={{
              opacity: 0,
              y: -40 - Math.random() * 40,
              x: 20 + Math.random() * 30,
              scale: 1.5,
            }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          >
            {EMOJIS[i % EMOJIS.length]}
          </motion.span>
        ))}
      </h1>
    </div>
  );
};

export default FlyingEmojisTitle;
