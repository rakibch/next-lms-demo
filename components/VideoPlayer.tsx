import React from "react";
import ReactPlayer from "react-player"

const VideoPlayer = ({ url }) => (
  <div className="player-wrapper" style={{ position: "relative", paddingTop: "56.25%" }}>
    <ReactPlayer
      url={url}
      controls
      width="100%"
      height="100%"
      style={{ position: "absolute", top: 0, left: 0 }}
    />
  </div>
);

export default VideoPlayer;
