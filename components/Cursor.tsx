"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [hover, setHover] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 200, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 200, damping: 22, mass: 0.6 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);

    const interactive = "a, button, [data-magnetic], [data-project]";
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(interactive)) setHover(true);
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(interactive)) setHover(false);
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [x, y]);

  return (
    <>
      <motion.div className={`cursor${hover ? " is-hover" : ""}`} style={{ x, y }}>
        <svg className="cursor__arrow" width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <path
            className="cursor__arrow-fill"
            d="M5.5 3.2 L5.5 18.8 L9.6 14.9 L12.3 20.8 L14.6 19.8 L11.9 14 L17.4 14 Z"
          />
          <circle className="cursor__arrow-dot" cx="5.5" cy="3.2" r="1.7" />
        </svg>
      </motion.div>
      <motion.div
        className={`cursor-follower${hover ? " is-hover" : ""}`}
        style={{ x: ringX, y: ringY }}
        animate={{ width: hover ? 64 : 30, height: hover ? 64 : 30, opacity: hover ? 1 : 0.5 }}
        transition={{ duration: 0.3, ease: [0.65, 0.05, 0.36, 1] }}
      />
    </>
  );
}
