import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const Waveform = ({ audioUrl }) => {
  const waveformRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#4a5568",
      progressColor: "#4299e1", 
      cursorColor: "#4299e1", 
      barWidth: 2, 
      barHeight: 1,
      responsive: true, 
    });

    const simulateVoiceActivity = () => {
      const peaks = Array.from({ length: 100 }, () =>
        isSpeaking ? Math.random() * 0.5 + 0.5 : 0 
      );
      wavesurfer.load("", peaks); 
    };

    wavesurfer.load(audioUrl);

    wavesurfer.on("ready", () => {
      wavesurfer.play();
      setIsPlaying(true);
    });

    return () => wavesurfer.destroy();
  }, [audioUrl]);

  return <div ref={waveformRef} style={{ width: "100%", height: "100px" }}></div>;
};

export default Waveform;
