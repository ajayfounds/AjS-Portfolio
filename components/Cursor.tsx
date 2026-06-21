"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import OrnateCursor from "./OrnateCursor";

export default function Cursor() {
  const [hover, setHover] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

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
    <motion.div className={`cursor${hover ? " is-hover" : ""}`} style={{ x, y }}>
      <OrnateCursor variant="amber" />
    </motion.div>
  );
}
