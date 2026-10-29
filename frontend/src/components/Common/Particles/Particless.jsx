import React from "react";
import Particles from "@tsparticles/react";

// Keep the options stable when the surrounding page renders again.
const options = {
  fullScreen: { enable: true, zIndex: -10 },
  particles: {
    number: { value: 20, density: { enable: false } },
    paint: { color: { value: "#fff" }, fill: { enable: true } },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.1, max: 0.8 },
      animation: { enable: true, speed: 1, sync: false, startValue: "max" },
    },
    size: { value: 3 },
    rotate: {
      value: { min: 0, max: 360 },
      direction: "clockwise",
      animation: { enable: true, speed: 5, sync: false },
    },
    links: {
      enable: true,
      distance: 300,
      color: "#ffffff",
      opacity: 0.4,
      width: 2,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      outModes: { default: "out" },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: false, mode: "bubble" },
    },
    modes: { repulse: { distance: 100 } },
  },
  resize: { enable: true },
  detectRetina: true,
  background: {
    color: "#000",
    image: "",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
};

const Particless = () => <Particles id="tsparticles" options={options} />;

export default Particless;
