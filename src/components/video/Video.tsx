import React, { useEffect, useRef, FC, useState } from "react";
import vid from "../../assets/video/generic.mp4";
import "./style.css";
import { ReactComponent as PlayIcon } from "../../assets/svg/play.svg";
import { ReactComponent as PauseIcon } from "../../assets/svg/pause.svg";
import { ReactComponent as FullScreenIcon } from "../../assets/svg/fullscreen.svg";
import { ReactComponent as VolumeIcon } from "../../assets/svg/volume.svg";

const data = vid;

export const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [volumePercentage, setVolumePercentage] = useState<number>(10);
  const [time, setTime] = useState({
    current: "0:00",
    duration: "0:00",
    duration_number: 0,
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = data;
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (play) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [play]);

  useEffect(() => {
    if (videoRef.current) {
      if (!fullScreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen();
          return;
        }
      }
      videoRef.current.requestFullscreen();
    }
  }, [fullScreen]);

  const handlePlay = () => {
    setPlay((play) => !play);
  };
  const handleFullScreen = () => {
    setFullScreen((f) => !f);
  };

  const formatVideoTime = (time: number) => {
    const floor = Math.floor(time);

    const minutes = Math.floor(floor / 60);
    const seconds = ("0" + (floor % 60)).slice(-2);

    return `${minutes}:${seconds}`;
  };

  const handleOnLoadedData = (e: React.ChangeEvent<HTMLVideoElement>) => {
    const current = e.currentTarget;
    current.volume = volumePercentage / 100;
    const duration = formatVideoTime(current.duration);

    setTime((prev) => ({
      ...prev,
      duration: duration,
      duration_number: current.duration,
    }));
  };

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className=""
        onLoadedData={handleOnLoadedData}
        controls={false}
      ></video>
      <div className="controls">
        <button className="button" onClick={handlePlay}>
          {play ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button className="button" onClick={handleFullScreen}>
          <FullScreenIcon />
        </button>
        <div className="volume">
          <button className="button">
            <VolumeIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
