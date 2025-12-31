"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { MaximizeIcon, MinimizeIcon } from "../Icons";

export default function Fullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggle = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(
          `Error toggling full-screen mode: ${err.message} (${err.name})`,
        );
      } else {
        console.error("Unknown error occured while toggling full-screen mode.");
      }
    }
  };

  return (
    <>
      <div className="relative">
        <Button
          size="icon"
          type="button"
          variant="ghost"
          onClick={handleToggle}
        >
          {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
        </Button>
      </div>
    </>
  );
}
