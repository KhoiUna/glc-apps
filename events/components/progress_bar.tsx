import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

interface ProgressBarProps {
  progressValue: number;
}

export default function ProgressBar({ progressValue }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const diff = Math.random() * 10;
        return Math.min(prev + diff, 100);
      });
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      style={{
        margin: "2rem",
      }}
    >
      <LinearProgress variant="determinate" value={progressValue || progress} />
    </div>
  );
}
