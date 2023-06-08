import {
  LocalMicrophoneAndCameraUser,
  RemoteVideoPlayer,
  useIsConnected,
  useJoin,
  useLocalAudioTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
  useRemoteVideoTracks,
} from "./agora-rtc-react";
import React, { useState }  from 'react';

import "./styles.css";
import agoraLogo from "./agora-logo.svg";
export const Basics = () => {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected();
  const [appId, setAppId] = useState(""); 
  const [channel, setChannel] = useState(""); 
  const [token, setToken] = useState("");

  useJoin({appid: appId, channel: channel, token: token ? token : null}, calling);

  //local user
  const [micOn, setMic] = useState(false);
  const [cameraOn, setCamera] = useState(false);
  const audioTrack = useLocalAudioTrack(micOn);
  const videoTrack = useLocalCameraTrack(cameraOn);
  usePublish([audioTrack, videoTrack]);

  //remote users
  const remoteUsers = useRemoteUsers();
  const videoTracks = useRemoteVideoTracks(remoteUsers);

  return (
    <>
      <div className="room">
        {isConnected ? (
          <div className="user-list">
            <div className="user">
              <LocalMicrophoneAndCameraUser
                audioTrack={audioTrack}
                cameraOn={cameraOn}
                cover={
                  "https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                }
                micOn={micOn}
                videoTrack={videoTrack}
              >
                <samp className="user-name">You</samp>
              </LocalMicrophoneAndCameraUser>
            </div>
            {videoTracks.map(track => (
              <div className="user" key={track.getUserId()}>
                <RemoteVideoPlayer
                  cover={
                    "https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                  }
                  key={track.getUserId()}
                  track={track}
                />
                <samp className="user-name">{track.getUserId()}</samp>
              </div>
            ))}
          </div>
        ) : (
          <div className="join-room">
            <img alt="agora-logo" className="logo" src={agoraLogo} />
            <input
              onChange={e => setAppId(e.target.value)}
              placeholder="<Your app ID>"
              value={appId}
            />
            <input
              onChange={e => setChannel(e.target.value)}
              placeholder="<Your channel Name>"
              value={channel}
            />
            <input
              onChange={e => setToken(e.target.value)}
              placeholder="<Your token>"
              value={token}
            />

            <button
              className={`join-channel ${!appId || !channel ? "disabled" : ""}`}
              disabled={!appId || !channel}
              onClick={() => setCalling(true)}
            >
              <span>Join Channel</span>
            </button>
          </div>
        )}
      </div>
      {isConnected && (
        <div className="control">
          <div className="left-control">
            <button className="btn" onClick={() => setMic(a => !a)}>
              <i className={`i-microphone ${!micOn ? "off" : ""}`} />
            </button>
            <button className="btn" onClick={() => setCamera(a => !a)}>
              <i className={`i-camera ${!cameraOn ? "off" : ""}`} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Basics;
