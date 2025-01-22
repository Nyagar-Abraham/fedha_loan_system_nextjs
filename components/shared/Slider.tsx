"use client";

import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

const Slider = ({
  children,
  orderChange,
}: {
  children: React.ReactNode;
  orderChange?: string;
}) => {
  const [paused, setPaused] = useState(false);
  const animation: any = useRef();

  const updateAnimation = () => {
    const scrollable = document.getElementById("scrollable");
    const slider = document.getElementById("slider");

    if (scrollable && slider) {
      const scrollableWidth = scrollable.offsetWidth;
      const sliderWidth = slider.offsetWidth;

      const sliderLenght = sliderWidth - scrollableWidth;

      if (animation.current) {
        animation.current.kill();
      }

      animation.current = gsap.to("#slider", {
        x: -sliderLenght,
        duration: 20,
        repeat: -1,
        yoyo: true,
        repeatDelay: 1,
        ease: "none",
      });
    }
  };

  useEffect(() => {
    updateAnimation();

    const handleResize = () => {
      updateAnimation();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animation.current) {
        animation.current.kill();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [orderChange]);

  return (
    <div
      id="scrollable"
      className="mt-6 overflow-hidden  overflow-x-scroll whitespace-nowrap rounded-sm  hide-scrollbar"
    >
      <div
        id="slider"
        className="flex w-fit gap-4 rounded-sm  p-1"
        onMouseLeave={() => {
          if (paused) {
            animation.current.play();
            setPaused(false);
          }
        }}
        onClick={() => {
          if (!paused) {
            animation.current.pause();
            setPaused(true);
          } else {
            animation.current.play();
            setPaused(false);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Slider;
