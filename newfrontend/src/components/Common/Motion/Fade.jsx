import { motion } from "framer-motion";

const Fade = ({
  children,
  left,
  right,
  up,
  bottom, // alias for down
  delay = 0,   // delay in ms
  duration = 1000, // default 1000ms
  distance = 40,  // how far to slide from
  ...props
}) => {
  // starting animation position
  let initial = { opacity: 0 };

  if (left)  initial.x = -distance;
  if (right) initial.x = distance;
  if (up)    initial.y = -distance;
  if (bottom) initial.y = distance;

  return (
    <motion.div
      {...props}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{
        opacity: { duration: duration / 1000, ease: "easeInOut", delay: delay / 1000 },
        x:       { duration: duration / 1000, ease: "easeInOut", delay: delay / 1000 },
        y:       { duration: duration / 1000, ease: "easeInOut", delay: delay / 1000 },
      }}
      style={{
        display: "flex", // preserve child layout like React Reveal
        justifyContent: "center",
        height: "100%"
      }}
    >
      {children}
    </motion.div>
  );
};

export default Fade;
