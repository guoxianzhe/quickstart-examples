'use strict';

var react = require('react');
var AgoraRTC = require('agora-rtc-sdk-ng');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var AgoraRTC__default = /*#__PURE__*/_interopDefault(AgoraRTC);

/**
 * @license agora-rtc-react
 * @version 0.0.1
 *
 * Copyright (c) Agora, Inc.
 *
 * This source code is licensed under the MIT license.
 */


// src/listen.ts
function listen(listenable, event, listener) {
  listenable.on(event, listener);
  return () => listenable.off(event, listener);
}

// src/utils.ts
function invoke(fn) {
  try {
    return fn();
  } catch (e) {
    console.error(e);
  }
}
function joinDisposers(disposers) {
  return () => disposers.forEach(invoke);
}
function interval(fn, interval2) {
  const id = setInterval(fn, interval2);
  return () => clearInterval(id);
}
function timeout(fn, ms) {
  const id = setTimeout(fn, ms);
  return () => clearTimeout(id);
}
function createAsyncTaskRunner() {
  let isRunning;
  let nextTask;
  let disposer;
  function runNextTask() {
    if (nextTask) {
      const _nextTask = nextTask;
      nextTask = void 0;
      _nextTask();
    }
  }
  async function disposeEffect() {
    if (disposer) {
      const _disposer = disposer;
      disposer = void 0;
      try {
        await _disposer();
      } catch (e) {
        console.error(e);
      }
    }
  }
  async function runTask(effect) {
    isRunning = true;
    await disposeEffect();
    try {
      disposer = await effect();
    } catch (e) {
      console.error(e);
    }
    isRunning = false;
    runNextTask();
  }
  async function stopTask() {
    isRunning = true;
    await disposeEffect();
    isRunning = false;
    runNextTask();
  }
  function run(task) {
    if (isRunning) {
      nextTask = () => runTask(task);
    } else {
      runTask(task);
    }
  }
  function dispose() {
    if (isRunning) {
      nextTask = stopTask;
    } else {
      stopTask();
    }
  }
  return {
    run,
    dispose
  };
}

// src/hooks/tools.ts
var useIsomorphicLayoutEffect = typeof document !== "undefined" ? react.useLayoutEffect : react.useEffect;
function isPromise(value) {
  return value != null && typeof value.then === "function";
}
function useForceUpdate() {
  const [_, forceUpdate] = react.useState(0);
  return react.useCallback(() => forceUpdate((n) => n + 1 | 0), []);
}
function useIsUnmounted() {
  const isUnmountRef = react.useRef(false);
  react.useEffect(() => {
    isUnmountRef.current = false;
    return () => {
      isUnmountRef.current = true;
    };
  }, []);
  return isUnmountRef;
}
function useSafePromise() {
  const isUnmountRef = useIsUnmounted();
  function safePromise(promise, onUnmountedError) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await promise;
        if (!isUnmountRef.current) {
          resolve(result);
        }
      } catch (error) {
        if (!isUnmountRef.current) {
          reject(error);
        } else if (onUnmountedError) {
          onUnmountedError(error);
        } else {
          if (process.env.NODE_ENV === "development") {
            console.error("An error occurs from a promise after a component is unmounted", error);
          }
        }
      }
    });
  }
  return react.useCallback(safePromise, [isUnmountRef]);
}
function applyRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (typeof ref === "object" && ref) {
    ref.current = value;
  }
}
function useForwardRef(ref) {
  const [current, setCurrent] = react.useState(null);
  const forwardedRef = react.useCallback(
    (value) => {
      setCurrent(value);
      applyRef(ref, value);
    },
    [ref, setCurrent]
  );
  return [current, forwardedRef];
}
function useAwaited(promise) {
  const sp = useSafePromise();
  const [value, setValue] = react.useState();
  useIsomorphicLayoutEffect(() => {
    if (isPromise(promise)) {
      sp(promise).then(setValue);
    } else {
      setValue(promise);
    }
  }, [promise, sp]);
  return value;
}
function useAsyncEffect(effect, deps) {
  const runnerRef = react.useRef();
  react.useEffect(() => {
    const { run, dispose } = runnerRef.current ||= createAsyncTaskRunner();
    run(effect);
    return dispose;
  }, deps);
}
function compareVersion(v1, v2) {
  const v1Parts = v1.split(".");
  const v2Parts = v2.split(".");
  const maxLength = Math.max(v1Parts.length, v2Parts.length);
  for (let i = 0; i < maxLength; i++) {
    const part1 = parseInt(v1Parts[i] || "0");
    const part2 = parseInt(v2Parts[i] || "0");
    if (part1 > part2) {
      return 1;
    }
    if (part1 < part2) {
      return -1;
    }
  }
  return 0;
}
function useClientEvent(client, event, listener) {
  const listenerRef = react.useRef(listener);
  useIsomorphicLayoutEffect(() => {
    listenerRef.current = listener;
  }, [listener]);
  react.useEffect(() => {
    if (client) {
      return listen(client, event, (...args) => {
        if (listenerRef.current) {
          listenerRef.current(...args);
        }
      });
    }
  }, [event, client]);
}
function useTrackEvent(track, event, listener) {
  const listenerRef = react.useRef(listener);
  useIsomorphicLayoutEffect(() => {
    listenerRef.current = listener;
  }, [listener]);
  react.useEffect(() => {
    if (track) {
      return listen(track, event, (...args) => {
        if (listenerRef.current) {
          listenerRef.current(...args);
        }
      });
    }
  }, [event, track]);
}

// src/error.ts
var AgoraRTCReactError = class extends Error {
  rtcMethod;
  rtcError;
  name = "AgoraRTCReactException";
  constructor(rtcMethod, rtcError) {
    if (typeof rtcError === "string") {
      super(rtcError);
    } else {
      super(rtcError.message);
    }
    this.rtcMethod = rtcMethod;
    this.rtcError = rtcError;
  }
  log(type) {
    console[type](this);
  }
};
var AgoraRTCContext = /* @__PURE__ */ react.createContext(null);
function AgoraRTCProvider({ client, children }) {
  return /* @__PURE__ */ jsxRuntime.jsx(AgoraRTCContext.Provider, { value: client, children });
}
function useOptionalRTCClient(client) {
  const clientFromContext = react.useContext(AgoraRTCContext);
  return client || clientFromContext;
}
function useRTCClient(client) {
  const resolvedClient = useOptionalRTCClient(client);
  if (!resolvedClient) {
    throw new Error(
      "Agora RTC client not found. Should be wrapped in <AgoraRTCProvider value={client} />"
    );
  }
  return resolvedClient;
}
var AgoraRTCScreenShareContext = /* @__PURE__ */ react.createContext(null);
function AgoraRTCScreenShareProvider({
  client,
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(AgoraRTCScreenShareContext.Provider, { value: client, children });
}
function useRTCScreenShareClient(client) {
  const clientFromContext = react.useContext(AgoraRTCScreenShareContext);
  return client || clientFromContext;
}

// src/hooks/client.ts
function useConnectionState(client) {
  const resolvedClient = useRTCClient(client);
  const [connectionState, setConnectionState] = react.useState(
    resolvedClient ? resolvedClient.connectionState : "DISCONNECTED"
  );
  react.useEffect(() => {
    if (resolvedClient) {
      setConnectionState(resolvedClient.connectionState);
      let dispose;
      return joinDisposers([
        listen(resolvedClient, "connection-state-change", (state) => {
          dispose?.();
          if (state === "CONNECTED") {
            dispose = timeout(() => setConnectionState(state), 0);
          } else {
            setConnectionState(state);
          }
        }),
        () => dispose?.()
      ]);
    } else {
      setConnectionState("DISCONNECTED");
    }
  }, [resolvedClient]);
  return connectionState;
}
function useIsConnected(client) {
  const resolvedClient = useRTCClient(client);
  const [isConnected, setConnected] = react.useState(
    resolvedClient ? resolvedClient.connectionState === "CONNECTED" : false
  );
  react.useEffect(() => {
    if (resolvedClient) {
      setConnected(resolvedClient.connectionState === "CONNECTED");
      let dispose;
      return joinDisposers([
        listen(resolvedClient, "connection-state-change", (state) => {
          dispose?.();
          dispose = timeout(() => setConnected(state === "CONNECTED"), 0);
        }),
        () => dispose?.()
      ]);
    } else {
      setConnected(false);
    }
  }, [resolvedClient]);
  return isConnected;
}
function useCurrentUID(client) {
  const resolvedClient = useRTCClient(client);
  const [uid, setUID] = react.useState(resolvedClient?.uid);
  react.useEffect(() => {
    if (resolvedClient) {
      return listen(resolvedClient, "connection-state-change", (state) => {
        if (state === "CONNECTED") {
          return timeout(() => setUID(resolvedClient.uid), 0);
        } else if (state === "DISCONNECTED") {
          setUID(void 0);
        }
      });
    }
  }, [resolvedClient]);
  return uid;
}
var initQuality = () => ({
  uplink: 0,
  downlink: 0,
  delay: 0
});
function useNetworkQuality(client) {
  const resolvedClient = useRTCClient(client);
  const [networkQuality, setNetworkQuality] = react.useState(initQuality);
  react.useEffect(() => {
    if (resolvedClient) {
      return listen(
        resolvedClient,
        "network-quality",
        (q) => setNetworkQuality({
          uplink: q.uplinkNetworkQuality,
          downlink: q.downlinkNetworkQuality,
          delay: resolvedClient.getRTCStats().RTT ?? 0
        })
      );
    } else {
      setNetworkQuality(initQuality());
    }
  }, [resolvedClient]);
  return networkQuality;
}
function useJoin(fetchArgs, ready = true, client) {
  const resolvedClient = useRTCClient(client);
  const isConnected = useIsConnected(client);
  const [isLoading, setIsLoading] = react.useState(false);
  const [joinResult, setJoinResult] = react.useState(0);
  const [error, setError] = react.useState(null);
  const isUnmountRef = useIsUnmounted();
  useAsyncEffect(async () => {
    if (!isUnmountRef.current) {
      setError(null);
      setJoinResult(0);
      setIsLoading(false);
    }
    if (ready && resolvedClient) {
      try {
        if (!isUnmountRef.current) {
          setIsLoading(true);
        }
        const { appid, channel, token, uid } = typeof fetchArgs === "function" ? await fetchArgs() : fetchArgs;
        const result = await resolvedClient.join(appid, channel, token, uid);
        if (!isUnmountRef.current) {
          setJoinResult(result);
        }
      } catch (err) {
        console.error(err);
        if (!isUnmountRef.current) {
          setError(new AgoraRTCReactError("IAgoraRTCClient.join", err));
        }
      }
      if (!isUnmountRef.current) {
        setIsLoading(false);
      }
      return () => {
        for (const track of resolvedClient.localTracks) {
          if (track.isPlaying) {
            track.stop();
          }
          track.close();
        }
        return resolvedClient.leave();
      };
    }
  }, [ready, client]);
  return {
    data: joinResult,
    isLoading,
    isConnected,
    error
  };
}

// src/hooks/tracks.ts
function useRemoteUserTrack(user, mediaType, client) {
  const resolvedClient = useRTCClient(client);
  const trackName = mediaType === "audio" ? "audioTrack" : "videoTrack";
  const [track, setTrack] = react.useState(user && user[trackName]);
  const isConnected = useIsConnected();
  const runnerRef = react.useRef();
  const [isLoading, setIsLoading] = react.useState(false);
  const [error, setError] = react.useState(null);
  react.useEffect(() => {
    if (!user || !isConnected)
      return;
    let isUnmounted = false;
    if (!isUnmounted) {
      setError(null);
    }
    const hasTrack = mediaType === "audio" ? "hasAudio" : "hasVideo";
    const uid = user.uid;
    const unsubscribe = async (user2, mediaType2) => {
      if (user2[trackName] && resolvedClient.remoteUsers.some(({ uid: uid2 }) => user2.uid === uid2)) {
        try {
          if (!isUnmounted) {
            setIsLoading(true);
          }
          await resolvedClient.unsubscribe(user2, mediaType2);
        } catch (err) {
          if (!isUnmounted) {
            setError(new AgoraRTCReactError("IAgoraRTCClient.unsubscribe", err));
          }
          console.error(err);
        }
      }
      if (!isUnmounted) {
        setTrack(void 0);
        setIsLoading(false);
      }
    };
    const subscribe = async (user2, mediaType2) => {
      try {
        if (!user2[trackName] && resolvedClient.remoteUsers.some(({ uid: uid2 }) => user2.uid === uid2)) {
          if (!isUnmounted) {
            setIsLoading(true);
          }
          await resolvedClient.subscribe(user2, mediaType2);
        }
        if (!isUnmounted) {
          setTrack(user2[trackName]);
        }
      } catch (err) {
        if (!isUnmounted) {
          setError(new AgoraRTCReactError("IAgoraRTCClient.subscribe", err));
        }
        console.error(err);
      }
      if (!isUnmounted) {
        setIsLoading(false);
      }
    };
    const runner = runnerRef.current ||= createAsyncTaskRunner();
    if (!user[trackName] && user[hasTrack]) {
      runner.run(() => subscribe(user, mediaType));
    } else {
      setTrack(user[trackName]);
    }
    return joinDisposers([
      () => {
        isUnmounted = true;
        runner.dispose();
      },
      listen(resolvedClient, "user-published", (pubUser, pubMediaType) => {
        if (pubUser.uid === uid && pubMediaType === mediaType) {
          runner.run(() => subscribe(pubUser, mediaType));
        }
      }),
      listen(resolvedClient, "user-unpublished", (pubUser, pubMediaType) => {
        if (pubUser.uid === uid && pubMediaType === mediaType) {
          runner.run(() => unsubscribe(pubUser, mediaType));
        }
      })
    ]);
  }, [isConnected, resolvedClient, user, mediaType, trackName]);
  return { track, isLoading, error };
}
function useVolumeLevel(audioTrack) {
  const [volumeLevel, setVolumeLevel] = react.useState(0);
  react.useEffect(() => {
    if (audioTrack) {
      return interval(() => {
        setVolumeLevel(audioTrack.getVolumeLevel());
      }, 1e3);
    }
  }, [audioTrack]);
  return volumeLevel;
}
function useRemoteAudioTracks(users, client) {
  const resolvedClient = useRTCClient(client);
  const [tracks, setTracks] = react.useState([]);
  const isConnected = useIsConnected();
  const nextTracks = react.useRef([]);
  const [isLoading, setIsLoading] = react.useState(false);
  const [error, setError] = react.useState(null);
  const isUnmountRef = useIsUnmounted();
  useAsyncEffect(async () => {
    if (!isUnmountRef.current) {
      setError(null);
    }
    if (!Array.isArray(users) || !isConnected)
      return;
    const subscribe = async (user) => {
      if (!user.audioTrack && users.some(({ uid }) => user.uid === uid)) {
        try {
          if (!isUnmountRef.current) {
            setIsLoading(true);
          }
          await resolvedClient.subscribe(user, "audio");
        } catch (err) {
          console.error(err);
          if (!isUnmountRef.current) {
            setError(new AgoraRTCReactError("IAgoraRTCClient.subscribe", err));
          }
        }
        if (user.audioTrack && !nextTracks.current.some((track) => track.getUserId() === user.uid)) {
          nextTracks.current.push(user.audioTrack);
        }
        nextTracks.current = nextTracks.current.map((track) => {
          if (user.audioTrack && track.getUserId() === user.uid && track.getTrackId() !== user.audioTrack.getTrackId()) {
            return user.audioTrack;
          } else {
            return track;
          }
        });
        if (!isUnmountRef.current) {
          setTracks(nextTracks.current);
          setIsLoading(false);
        }
      }
    };
    const unsubscribe = async (user) => {
      if (users.some(({ uid }) => user.uid === uid)) {
        if (!isUnmountRef.current) {
          nextTracks.current = nextTracks.current.filter((track) => track.getUserId() !== user.uid);
          setTracks(nextTracks.current);
        }
        try {
          if (!isUnmountRef.current) {
            setIsLoading(true);
          }
          await resolvedClient.unsubscribe(user, "audio");
        } catch (err) {
          console.error(err);
          if (!isUnmountRef.current) {
            setError(new AgoraRTCReactError("IAgoraRTCClient.unsubscribe", err));
          }
        }
        if (!isUnmountRef.current) {
          setIsLoading(false);
        }
      }
    };
    users.map((user) => {
      if (!user.audioTrack && user.hasAudio) {
        subscribe(user);
      }
    });
    const unsubscribeList = [];
    for (let i = 0; i < nextTracks.current.length; i++) {
      const track = nextTracks.current[i];
      if (!users.some((user) => user.uid === track.getUserId())) {
        const user = resolvedClient.remoteUsers.find((user2) => user2.uid === track.getUserId());
        if (user) {
          unsubscribeList.push({
            user,
            mediaType: "audio"
          });
          nextTracks.current.splice(i, 1);
          i--;
        }
      }
    }
    if (unsubscribeList.length > 0) {
      try {
        if (!isUnmountRef.current) {
          setIsLoading(true);
        }
        await resolvedClient.massUnsubscribe(unsubscribeList);
      } catch (err) {
        console.error(err);
        if (!isUnmountRef.current) {
          setError(new AgoraRTCReactError("IAgoraRTCClient.massUnsubscribe", err));
        }
      }
      if (!isUnmountRef.current) {
        setTracks(nextTracks.current.slice());
        setIsLoading(false);
      }
    }
    return joinDisposers([
      listen(resolvedClient, "user-published", (pubUser, pubMediaType) => {
        if (users.find((user) => user.uid === pubUser.uid) && pubMediaType === "audio") {
          subscribe(pubUser);
        }
      }),
      listen(resolvedClient, "user-unpublished", (pubUser, pubMediaType) => {
        if (users.find((user) => user.uid === pubUser.uid) && pubMediaType === "audio") {
          unsubscribe(pubUser);
        }
      })
    ]);
  }, [isConnected, resolvedClient, users]);
  return { audioTracks: tracks, isLoading, error };
}
function useRemoteVideoTracks(users, client) {
  const resolvedClient = useRTCClient(client);
  const [tracks, setTracks] = react.useState([]);
  const isConnected = useIsConnected();
  const nextTracks = react.useRef([]);
  const [isLoading, setIsLoading] = react.useState(false);
  const [error, setError] = react.useState(null);
  const isUnmountRef = useIsUnmounted();
  useAsyncEffect(async () => {
    if (!isUnmountRef.current) {
      setError(null);
    }
    if (!Array.isArray(users) || !isConnected)
      return;
    const subscribe = async (user) => {
      if (!user.videoTrack && users.some(({ uid }) => user.uid === uid)) {
        try {
          if (!isUnmountRef.current) {
            setIsLoading(true);
          }
          await resolvedClient.subscribe(user, "video");
        } catch (err) {
          console.error(err);
          if (!isUnmountRef.current) {
            setError(new AgoraRTCReactError("IAgoraRTCClient.subscribe", err));
          }
        }
        if (user.videoTrack && !nextTracks.current.some((track) => track.getUserId() === user.uid)) {
          nextTracks.current.push(user.videoTrack);
        }
        nextTracks.current = nextTracks.current.map((track) => {
          if (user.videoTrack && track.getUserId() === user.uid && track.getTrackId() !== user.videoTrack.getTrackId()) {
            return user.videoTrack;
          } else {
            return track;
          }
        });
        if (!isUnmountRef.current) {
          setTracks(nextTracks.current);
          setIsLoading(false);
        }
      }
    };
    const unsubscribe = async (user) => {
      if (users.some(({ uid }) => user.uid === uid)) {
        if (!isUnmountRef.current) {
          nextTracks.current = nextTracks.current.filter((track) => track.getUserId() !== user.uid);
          setTracks(nextTracks.current);
        }
        try {
          if (!isUnmountRef.current) {
            setIsLoading(true);
          }
          await resolvedClient.unsubscribe(user, "video");
        } catch (err) {
          console.error(err);
          if (!isUnmountRef.current) {
            setError(new AgoraRTCReactError("IAgoraRTCClient.unsubscribe", err));
          }
        }
        if (!isUnmountRef.current) {
          setIsLoading(false);
        }
      }
    };
    users.map((user) => {
      if (!user.videoTrack && user.hasVideo) {
        subscribe(user);
      }
    });
    const unsubscribeList = [];
    for (let i = 0; i < nextTracks.current.length; i++) {
      const track = nextTracks.current[i];
      if (!users.some((user) => user.uid === track.getUserId())) {
        const user = resolvedClient.remoteUsers.find((user2) => user2.uid === track.getUserId());
        if (user) {
          unsubscribeList.push({
            user,
            mediaType: "video"
          });
          nextTracks.current.splice(i, 1);
          i--;
        }
      }
    }
    if (unsubscribeList.length > 0) {
      try {
        if (!isUnmountRef.current) {
          setIsLoading(true);
        }
        await resolvedClient.massUnsubscribe(unsubscribeList);
      } catch (err) {
        console.error(err);
        if (!isUnmountRef.current) {
          setError(new AgoraRTCReactError("IAgoraRTCClient.massUnsubscribe", err));
        }
      }
      if (!isUnmountRef.current) {
        setTracks(nextTracks.current.slice());
        setIsLoading(false);
      }
    }
    return joinDisposers([
      listen(resolvedClient, "user-published", (pubUser, pubMediaType) => {
        if (users.find((user) => user.uid === pubUser.uid) && pubMediaType === "video") {
          subscribe(pubUser);
        }
      }),
      listen(resolvedClient, "user-unpublished", (pubUser, pubMediaType) => {
        if (users.find((user) => user.uid === pubUser.uid) && pubMediaType === "video") {
          unsubscribe(pubUser);
        }
      })
    ]);
  }, [isConnected, resolvedClient, users]);
  return { videoTracks: tracks, isLoading, error };
}
function useLocalCameraTrack(ready = true, client) {
  const isConnected = useIsConnected(client);
  const [track, setTrack] = react.useState(null);
  const [isLoading, setIsLoading] = react.useState(false);
  const [error, setError] = react.useState(null);
  const isUnmountRef = useIsUnmounted();
  useAsyncEffect(async () => {
    if (!isUnmountRef.current) {
      setIsLoading(false);
      setError(null);
    }
    if (isConnected && ready && !track) {
      try {
        if (!isUnmountRef.current) {
          setIsLoading(true);
        }
        const result = await AgoraRTC__default.default.createCameraVideoTrack();
        if (!isUnmountRef.current) {
          setTrack(result);
        }
      } catch (err) {
        console.error(err);
        if (!isUnmountRef.current) {
          setError(
            new AgoraRTCReactError("IAgoraRTC.createCameraVideoTrack", err)
          );
        }
      }
      if (!isUnmountRef.current) {
        setIsLoading(false);
      }
    }
    if (!isConnected && !isUnmountRef.current) {
      setTrack(null);
    }
  }, [isConnected, ready]);
  return { localCameraTrack: track, isLoading, error };
}
function useLocalMicrophoneTrack(ready = true, audioTrackConfig = { ANS: true, AEC: true }, client) {
  const isConnected = useIsConnected(client);
  const [track, setTrack] = react.useState(null);
  const [isLoading, setIsLoading] = react.useState(false);
  const [error, setError] = react.useState(null);
  const isUnmountRef = useIsUnmounted();
  useAsyncEffect(async () => {
    if (isConnected && ready && !track) {
      try {
        if (!isUnmountRef.current) {
          setIsLoading(true);
        }
        const result = await AgoraRTC__default.default.createMicrophoneAudioTrack(audioTrackConfig);
        if (!isUnmountRef.current) {
          setTrack(result);
        }
      } catch (err) {
        console.error(err);
        if (!isUnmountRef.current) {
          setError(
            new AgoraRTCReactError("IAgoraRTC.createMicrophoneAudioTrack", err)
          );
        }
      }
      if (!isUnmountRef.current) {
        setIsLoading(false);
      }
    }
    if (!isConnected && !isUnmountRef.current) {
      setTrack(null);
    }
  }, [isConnected, ready]);
  return { localMicrophoneTrack: track, isLoading, error };
}
function usePublish(tracks, readyToPublish = true, client) {
  const resolvedClient = useRTCClient(client);
  const isConnected = useIsConnected(client);
  const pubTracks = react.useRef([]);
  const [isLoading, setIsLoading] = react.useState(false);
  const [error, setError] = react.useState(null);
  const isUnmountRef = useIsUnmounted();
  useAsyncEffect(async () => {
    if (!isUnmountRef.current) {
      setIsLoading(false);
      setError(null);
    }
    if (!resolvedClient || !isConnected || !readyToPublish) {
      return;
    }
    const filterTracks = tracks.filter(Boolean);
    const baseCheck = (_track) => {
      const isSupport = compareVersion(AgoraRTC__default.default.VERSION, "4.18.1") >= 0;
      if (!isSupport) {
        const agoraRTCReactError = new AgoraRTCReactError(
          "usePublish",
          "please check your agora-rtc-sdk-ng version in package.json, it's recommend upgrade to >= 4.18.1"
        );
        agoraRTCReactError.log("warn");
      }
      return isSupport ? (
        // @ts-ignore
        resolvedClient.mode !== "live" || resolvedClient.role !== "audience"
      ) : true;
    };
    const isPublished = (track) => {
      return pubTracks.current.some(
        (pubTrack) => pubTrack && pubTrack.getTrackId() === track.getTrackId()
      );
    };
    const canPublish = (track) => {
      return baseCheck() && track.enabled && readyToPublish && !isPublished(track);
    };
    for (let i = 0; i < filterTracks.length; i++) {
      const track = filterTracks[i];
      if (track) {
        if (canPublish(track)) {
          try {
            if (!isUnmountRef.current) {
              setIsLoading(true);
            }
            await resolvedClient.publish(track);
          } catch (err) {
            console.error(err);
            if (!isUnmountRef.current) {
              setError(new AgoraRTCReactError("IAgoraRTCClient.publish", err));
            }
          }
          if (!isUnmountRef.current) {
            setIsLoading(false);
          }
        }
      }
    }
    pubTracks.current = filterTracks;
  }, [isConnected, readyToPublish, resolvedClient, tracks]);
  return { isLoading, error };
}
function useRemoteUsers(client) {
  const resolvedClient = useRTCClient(client);
  const [users, setUsers] = react.useState(resolvedClient ? resolvedClient.remoteUsers : []);
  react.useEffect(() => {
    if (resolvedClient) {
      const update = () => setUsers(resolvedClient.remoteUsers.slice());
      return joinDisposers([
        listen(resolvedClient, "user-joined", update),
        listen(resolvedClient, "user-left", update),
        listen(resolvedClient, "user-published", update),
        listen(resolvedClient, "user-unpublished", update)
      ]);
    }
  }, [resolvedClient]);
  return users;
}
function createTrackBoundaryController() {
  const cancelStops = /* @__PURE__ */ new Map();
  const STOP_TIMEOUT = 1500;
  return {
    onMount: (track) => {
      const cancel = cancelStops.get(track);
      if (cancel) {
        cancel();
        cancelStops.delete(track);
      }
    },
    onUnmount: (track) => {
      const cancel = cancelStops.get(track);
      if (cancel) {
        cancel();
      }
      cancelStops.set(
        track,
        timeout(() => {
          if (track.isPlaying) {
            track.stop();
          }
          cancelStops.delete(track);
        }, STOP_TIMEOUT)
      );
    },
    dispose: () => {
      for (const [track, cancel] of cancelStops) {
        if (track.isPlaying) {
          track.stop();
        }
        if (cancel) {
          cancel();
        }
      }
      cancelStops.clear();
    }
  };
}
var TrackBoundaryContext = /* @__PURE__ */ react.createContext(
  void 0
);
function TrackBoundary({ children }) {
  const [controller] = react.useState(createTrackBoundaryController);
  react.useEffect(() => controller.dispose, [controller]);
  return /* @__PURE__ */ jsxRuntime.jsx(TrackBoundaryContext.Provider, { value: controller, children });
}
function useAutoPlayVideoTrack(track, play, div) {
  const controller = react.useContext(TrackBoundaryContext);
  react.useEffect(() => {
    if (track) {
      if (div && play) {
        track.play(div);
      } else {
        track.stop();
      }
      if (controller) {
        controller.onMount(track);
        return () => controller.onUnmount(track);
      } else {
        return () => {
          if (track.isPlaying) {
            track.stop();
          }
        };
      }
    }
  }, [track, div, play, controller]);
}
function useAutoPlayAudioTrack(track, play) {
  const controller = react.useContext(TrackBoundaryContext);
  useIsomorphicLayoutEffect(() => {
    if (track) {
      if (play) {
        track.play();
      } else {
        track.stop();
      }
      if (controller) {
        controller.onMount(track);
        return () => controller.onUnmount(track);
      } else {
        return () => {
          if (track.isPlaying) {
            track.stop();
          }
        };
      }
    }
  }, [track, play, controller]);
}
function LocalAudioTrack({
  track: maybeTrack,
  play = false,
  volume,
  disabled,
  muted,
  children
}) {
  const track = useAwaited(maybeTrack);
  useAutoPlayAudioTrack(track, play);
  react.useEffect(() => {
    if (track && volume != null) {
      track.setVolume(volume);
    }
  }, [track, volume]);
  react.useEffect(() => {
    if (track && disabled != null) {
      track.setEnabled(!disabled).catch(console.warn);
    }
  }, [disabled, track]);
  react.useEffect(() => {
    if (track && muted != null) {
      track.setMuted(muted).catch(console.warn);
    }
  }, [muted, track]);
  return children ? /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children }) : null;
}
var VideoTrackWrapperStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  background: "#000"
};
var VideoTrackStyle = {
  width: "100%",
  height: "100%"
};
var FloatBoxStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: 2
};
var useMergedStyle = (s1, s2) => react.useMemo(() => ({ ...s1, ...s2 }), [s1, s2]);
function LocalVideoTrack({
  track: maybeTrack,
  play,
  disabled,
  muted,
  style,
  ...props
}) {
  const mergedStyle = useMergedStyle(VideoTrackStyle, style);
  const [div, setDiv] = react.useState(null);
  const track = useAwaited(maybeTrack);
  useAutoPlayVideoTrack(track, play, div);
  react.useEffect(() => {
    if (track && disabled != null) {
      track.setEnabled(!disabled).catch(console.warn);
    }
  }, [disabled, track]);
  react.useEffect(() => {
    if (track && muted != null) {
      track.setMuted(muted).catch(console.warn);
    }
  }, [muted, track]);
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ...props, ref: setDiv, style: mergedStyle });
}
var CoverBlurStyle = {
  width: "100%",
  height: "100%",
  background: "#1a1e21 center/cover no-repeat",
  filter: "blur(16px) brightness(0.4)"
};
var CoverImgStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  maxWidth: "50%",
  maxHeight: "50%",
  aspectRatio: "1",
  transform: "translate(-50%, -50%)",
  borderRadius: "50%",
  overflow: "hidden",
  objectFit: "cover"
};
function UserCover({ cover }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { style: FloatBoxStyle, children: typeof cover === "string" ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { style: { ...CoverBlurStyle, backgroundImage: `url(${cover})` } }),
    /* @__PURE__ */ jsxRuntime.jsx("img", { src: cover, style: CoverImgStyle })
  ] }) : cover() });
}
function LocalUser({
  micOn,
  cameraOn,
  audioTrack,
  videoTrack,
  playAudio,
  playVideo,
  volume,
  cover,
  children,
  style,
  ...props
}) {
  const mergedStyle = useMergedStyle(VideoTrackWrapperStyle, style);
  playVideo = playVideo ?? !!cameraOn;
  playAudio = playAudio ?? !!micOn;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { ...props, style: mergedStyle, children: [
    /* @__PURE__ */ jsxRuntime.jsx(LocalVideoTrack, { disabled: !cameraOn, play: playVideo, track: videoTrack }),
    /* @__PURE__ */ jsxRuntime.jsx(LocalAudioTrack, { disabled: !micOn, play: playAudio, track: audioTrack, volume }),
    cover && !cameraOn && /* @__PURE__ */ jsxRuntime.jsx(UserCover, { cover }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { style: FloatBoxStyle, children })
  ] });
}
function RemoteAudioTrack({
  track,
  play = false,
  playbackDeviceId,
  volume,
  children
}) {
  useAutoPlayAudioTrack(track, play);
  react.useEffect(() => {
    if (track && playbackDeviceId != null) {
      track.setPlaybackDevice(playbackDeviceId).catch(console.warn);
    }
  }, [track, playbackDeviceId]);
  react.useEffect(() => {
    if (track && volume != null) {
      track.setVolume(volume);
    }
  }, [track, volume]);
  return children ? /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children }) : null;
}
function RemoteVideoTrack({ track, play, style, ...props }) {
  const mergedStyle = useMergedStyle(VideoTrackStyle, style);
  const [div, setDiv] = react.useState(null);
  useAutoPlayVideoTrack(track, play, div);
  return /* @__PURE__ */ jsxRuntime.jsx("div", { ...props, ref: setDiv, style: mergedStyle });
}
function RemoteUser({
  user,
  playVideo,
  playAudio,
  playbackDeviceId,
  volume,
  cover,
  style,
  children,
  ...props
}) {
  const mergedStyle = useMergedStyle(VideoTrackWrapperStyle, style);
  const { track: videoTrack } = useRemoteUserTrack(user, "video");
  const { track: audioTrack } = useRemoteUserTrack(user, "audio");
  playVideo = playVideo ?? user?.hasVideo;
  playAudio = playAudio ?? user?.hasAudio;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { ...props, style: mergedStyle, children: [
    /* @__PURE__ */ jsxRuntime.jsx(RemoteVideoTrack, { play: playVideo, track: videoTrack }),
    /* @__PURE__ */ jsxRuntime.jsx(
      RemoteAudioTrack,
      {
        play: playAudio,
        playbackDeviceId,
        track: audioTrack,
        volume
      }
    ),
    cover && !playVideo && /* @__PURE__ */ jsxRuntime.jsx(UserCover, { cover }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { style: FloatBoxStyle, children })
  ] });
}
var AgoraRTCReact = class {
  appType = 1001;
  constructor() {
    AgoraRTC__default.default.setAppType(this.appType);
  }
};
new AgoraRTCReact();
var VERSION = "1.1.0";

exports.AgoraRTCProvider = AgoraRTCProvider;
exports.AgoraRTCReactError = AgoraRTCReactError;
exports.AgoraRTCScreenShareProvider = AgoraRTCScreenShareProvider;
exports.LocalAudioTrack = LocalAudioTrack;
exports.LocalUser = LocalUser;
exports.LocalVideoTrack = LocalVideoTrack;
exports.RemoteAudioTrack = RemoteAudioTrack;
exports.RemoteUser = RemoteUser;
exports.RemoteVideoTrack = RemoteVideoTrack;
exports.TrackBoundary = TrackBoundary;
exports.VERSION = VERSION;
exports.applyRef = applyRef;
exports.compareVersion = compareVersion;
exports.isPromise = isPromise;
exports.listen = listen;
exports.useAsyncEffect = useAsyncEffect;
exports.useAutoPlayAudioTrack = useAutoPlayAudioTrack;
exports.useAutoPlayVideoTrack = useAutoPlayVideoTrack;
exports.useAwaited = useAwaited;
exports.useClientEvent = useClientEvent;
exports.useConnectionState = useConnectionState;
exports.useCurrentUID = useCurrentUID;
exports.useForceUpdate = useForceUpdate;
exports.useForwardRef = useForwardRef;
exports.useIsConnected = useIsConnected;
exports.useIsUnmounted = useIsUnmounted;
exports.useIsomorphicLayoutEffect = useIsomorphicLayoutEffect;
exports.useJoin = useJoin;
exports.useLocalCameraTrack = useLocalCameraTrack;
exports.useLocalMicrophoneTrack = useLocalMicrophoneTrack;
exports.useNetworkQuality = useNetworkQuality;
exports.usePublish = usePublish;
exports.useRTCClient = useRTCClient;
exports.useRTCScreenShareClient = useRTCScreenShareClient;
exports.useRemoteAudioTracks = useRemoteAudioTracks;
exports.useRemoteUserTrack = useRemoteUserTrack;
exports.useRemoteUsers = useRemoteUsers;
exports.useRemoteVideoTracks = useRemoteVideoTracks;
exports.useSafePromise = useSafePromise;
exports.useTrackEvent = useTrackEvent;
exports.useVolumeLevel = useVolumeLevel;
