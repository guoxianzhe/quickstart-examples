'use strict';

var react = require('react');
var AgoraRTC = require('agora-rtc-sdk-ng');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var AgoraRTC__default = /*#__PURE__*/_interopDefault(AgoraRTC);

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
function useAutoJoin(appid, channel, token, uid, client) {
  const resolvedClient = useRTCClient(client);
  useAsyncEffect(async () => {
    if (resolvedClient) {
      await resolvedClient.join(appid, channel, token, uid);
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
  }, [appid, channel, token, uid, resolvedClient]);
}
function useJoin(fetchArgs, ready = true, client) {
  const resolvedClient = useRTCClient(client);
  useAsyncEffect(async () => {
    if (ready && resolvedClient) {
      try {
        const { appid, channel, token, uid } = typeof fetchArgs === "function" ? await fetchArgs() : fetchArgs;
        await resolvedClient.join(appid, channel, token, uid);
      } catch (error) {
        console.error(error);
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
}

// src/hooks/tracks.ts
function useRemoteUserTrack(user, mediaType, client) {
  const resolvedClient = useRTCClient(client);
  const trackName = mediaType === "audio" ? "audioTrack" : "videoTrack";
  const [track, setTrack] = react.useState(user && user[trackName]);
  const isConnected = useIsConnected();
  const runnerRef = react.useRef();
  react.useEffect(() => {
    if (!user || !isConnected)
      return;
    let isUnmounted = false;
    const hasTrack = mediaType === "audio" ? "hasAudio" : "hasVideo";
    const uid = user.uid;
    const unsubscribe = async (user2, mediaType2) => {
      if (user2[trackName] && resolvedClient.remoteUsers.some(({ uid: uid2 }) => user2.uid === uid2)) {
        try {
          await resolvedClient.unsubscribe(user2, mediaType2);
        } catch (error) {
          console.error(error);
        }
      }
      if (!isUnmounted) {
        setTrack(void 0);
      }
    };
    const subscribe = async (user2, mediaType2) => {
      try {
        if (!user2[trackName] && resolvedClient.remoteUsers.some(({ uid: uid2 }) => user2.uid === uid2)) {
          await resolvedClient.subscribe(user2, mediaType2);
        }
        if (!isUnmounted) {
          setTrack(user2[trackName]);
        }
      } catch (error) {
        console.error(error);
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
  return track;
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
  useAsyncEffect(async () => {
    if (!Array.isArray(users) || !isConnected)
      return;
    let isUnmounted = false;
    const subscribe = async (user) => {
      if (!user.audioTrack && users.some(({ uid }) => user.uid === uid)) {
        try {
          await resolvedClient.subscribe(user, "audio");
        } catch (error) {
          console.error(error);
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
        if (!isUnmounted) {
          setTracks(nextTracks.current);
        }
      }
    };
    const unsubscribe = async (user) => {
      if (users.some(({ uid }) => user.uid === uid)) {
        if (!isUnmounted) {
          nextTracks.current = nextTracks.current.filter((track) => track.getUserId() !== user.uid);
          setTracks(nextTracks.current);
        }
        try {
          await resolvedClient.unsubscribe(user, "audio");
        } catch (error) {
          console.error(error);
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
      await resolvedClient.massUnsubscribe(unsubscribeList);
      if (!isUnmounted) {
        setTracks(nextTracks.current.slice());
      }
    }
    return joinDisposers([
      () => {
        isUnmounted = true;
      },
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
  return tracks;
}
function useRemoteVideoTracks(users, client) {
  const resolvedClient = useRTCClient(client);
  const [tracks, setTracks] = react.useState([]);
  const isConnected = useIsConnected();
  const nextTracks = react.useRef([]);
  useAsyncEffect(async () => {
    if (!Array.isArray(users) || !isConnected)
      return;
    let isUnmounted = false;
    const subscribe = async (user) => {
      if (!user.videoTrack && users.some(({ uid }) => user.uid === uid)) {
        try {
          await resolvedClient.subscribe(user, "video");
        } catch (error) {
          console.error(error);
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
        if (!isUnmounted) {
          setTracks(nextTracks.current);
        }
      }
    };
    const unsubscribe = async (user) => {
      if (users.some(({ uid }) => user.uid === uid)) {
        if (!isUnmounted) {
          nextTracks.current = nextTracks.current.filter((track) => track.getUserId() !== user.uid);
          setTracks(nextTracks.current);
        }
        try {
          await resolvedClient.unsubscribe(user, "video");
        } catch (error) {
          console.error(error);
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
      await resolvedClient.massUnsubscribe(unsubscribeList);
      if (!isUnmounted) {
        setTracks(nextTracks.current.slice());
      }
    }
    return joinDisposers([
      () => {
        isUnmounted = true;
      },
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
  return tracks;
}
function useLocalCameraTrack(ready = true, client) {
  const isConnected = useIsConnected(client);
  const [track, setTrack] = react.useState(null);
  const isUnmountRef = useIsUnmounted();
  useAsyncEffect(async () => {
    if (isConnected && ready && !track) {
      const result = await AgoraRTC__default.default.createCameraVideoTrack();
      if (!isUnmountRef.current) {
        setTrack(result);
      }
    }
    if (!isConnected && !isUnmountRef.current) {
      setTrack(null);
    }
  }, [isConnected, ready]);
  return track;
}
function useLocalAudioTrack(ready = true, audioTrackConfig = { ANS: true, AEC: true }, client) {
  const isConnected = useIsConnected(client);
  const [track, setTrack] = react.useState(null);
  const isUnmountRef = useIsUnmounted();
  useAsyncEffect(async () => {
    if (isConnected && ready && !track) {
      const result = await AgoraRTC__default.default.createMicrophoneAudioTrack(audioTrackConfig);
      if (!isUnmountRef.current) {
        setTrack(result);
      }
    }
    if (!isConnected && !isUnmountRef.current) {
      setTrack(null);
    }
  }, [isConnected, ready]);
  return track;
}
function usePublish(tracks, readyToPublish = true, client) {
  const resolvedClient = useRTCClient(client);
  const isConnected = useIsConnected(client);
  const pubTracks = react.useRef([]);
  useAsyncEffect(async () => {
    if (!resolvedClient || !isConnected || !readyToPublish) {
      return;
    }
    const filterTracks = tracks.filter(Boolean);
    const isPublished = (track) => {
      return pubTracks.current.some(
        (pubTrack) => pubTrack && pubTrack.getTrackId() === track.getTrackId()
      );
    };
    const canPublish = (track) => {
      return track.enabled && readyToPublish && !isPublished(track);
    };
    for (let i = 0; i < filterTracks.length; i++) {
      const track = filterTracks[i];
      if (track) {
        if (canPublish(track)) {
          try {
            await resolvedClient.publish(track);
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
    pubTracks.current = filterTracks;
  }, [isConnected, readyToPublish, resolvedClient, tracks]);
}
function useRemoteUsers(client) {
  const resolvedClient = useRTCClient(client);
  const [users, setUsers] = react.useState(resolvedClient ? resolvedClient.remoteUsers : []);
  react.useEffect(() => {
    if (resolvedClient) {
      const update = () => setUsers(resolvedClient.remoteUsers.slice());
      return joinDisposers([
        listen(resolvedClient, "user-joined", update),
        listen(resolvedClient, "user-left", update)
      ]);
    }
  }, [resolvedClient]);
  return users;
}
function usePublishedRemoteUsers(client) {
  const resolvedClient = useRTCClient(client);
  const [users, setUsers] = react.useState(
    () => resolvedClient.remoteUsers.filter(
      (user) => user.uid !== resolvedClient.uid && (user.hasAudio || user.hasVideo)
    )
  );
  react.useEffect(() => {
    if (resolvedClient) {
      const updatePublishedRemoteUsers = () => {
        setUsers((users2) => {
          const newUsers = [];
          let isSame = true;
          for (let i = 0; i < resolvedClient.remoteUsers.length; i++) {
            const user = resolvedClient.remoteUsers[i];
            if (user.uid !== resolvedClient.uid && (user.hasAudio || user.hasVideo)) {
              newUsers.push(user);
              if (isSame) {
                isSame = i < users2.length && users2[i] === user;
              }
            }
          }
          isSame = isSame && newUsers.length === users2.length;
          return isSame ? users2 : newUsers;
        });
      };
      updatePublishedRemoteUsers();
      return joinDisposers([
        listen(resolvedClient, "user-joined", updatePublishedRemoteUsers),
        listen(resolvedClient, "user-left", updatePublishedRemoteUsers),
        listen(resolvedClient, "user-published", updatePublishedRemoteUsers),
        listen(resolvedClient, "user-unpublished", updatePublishedRemoteUsers)
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
function MicrophoneAudioTrack({
  track: maybeTrack,
  deviceId,
  ...props
}) {
  const track = useAwaited(maybeTrack);
  react.useEffect(() => {
    if (track && deviceId != null) {
      track.setDevice(deviceId).catch(console.warn);
    }
  }, [deviceId, track]);
  return /* @__PURE__ */ jsxRuntime.jsx(LocalAudioTrack, { track: maybeTrack, ...props });
}
function CameraVideoTrack({ track: maybeTrack, deviceId, ...props }) {
  const track = useAwaited(maybeTrack);
  react.useEffect(() => {
    if (track && deviceId != null) {
      track.setDevice(deviceId).catch(console.warn);
    }
  }, [deviceId, track]);
  return /* @__PURE__ */ jsxRuntime.jsx(LocalVideoTrack, { track: maybeTrack, ...props });
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
function LocalMicrophoneAndCameraUser({
  micOn,
  cameraOn,
  audioTrack,
  videoTrack,
  playAudio,
  playVideo,
  micDeviceId,
  cameraDeviceId,
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
    /* @__PURE__ */ jsxRuntime.jsx(
      CameraVideoTrack,
      {
        deviceId: cameraDeviceId,
        disabled: !cameraOn,
        play: playVideo,
        track: videoTrack
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      MicrophoneAudioTrack,
      {
        deviceId: micDeviceId,
        disabled: !micOn,
        play: playAudio,
        track: audioTrack,
        volume
      }
    ),
    cover && !cameraOn && /* @__PURE__ */ jsxRuntime.jsx(UserCover, { cover }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { style: FloatBoxStyle, children })
  ] });
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
  const videoTrack = useRemoteUserTrack(user, "video");
  const audioTrack = useRemoteUserTrack(user, "audio");
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
function RemoteVideoPlayer({
  track,
  playVideo,
  cover,
  client,
  style,
  children,
  ...props
}) {
  const mergedStyle = useMergedStyle(VideoTrackWrapperStyle, style);
  const resolvedClient = useRTCClient(client);
  const hasVideo = resolvedClient.remoteUsers?.find(
    (user) => user.uid === track?.getUserId()
  )?.hasVideo;
  playVideo = playVideo ?? hasVideo;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { ...props, style: mergedStyle, children: [
    /* @__PURE__ */ jsxRuntime.jsx(RemoteVideoTrack, { play: playVideo, track }),
    cover && !playVideo && /* @__PURE__ */ jsxRuntime.jsx(UserCover, { cover }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { style: FloatBoxStyle, children })
  ] });
}

exports.AgoraRTCProvider = AgoraRTCProvider;
exports.AgoraRTCScreenShareProvider = AgoraRTCScreenShareProvider;
exports.CameraVideoTrack = CameraVideoTrack;
exports.LocalAudioTrack = LocalAudioTrack;
exports.LocalMicrophoneAndCameraUser = LocalMicrophoneAndCameraUser;
exports.LocalUser = LocalUser;
exports.LocalVideoTrack = LocalVideoTrack;
exports.MicrophoneAudioTrack = MicrophoneAudioTrack;
exports.RemoteAudioTrack = RemoteAudioTrack;
exports.RemoteUser = RemoteUser;
exports.RemoteVideoPlayer = RemoteVideoPlayer;
exports.RemoteVideoTrack = RemoteVideoTrack;
exports.TrackBoundary = TrackBoundary;
exports.applyRef = applyRef;
exports.isPromise = isPromise;
exports.listen = listen;
exports.useAsyncEffect = useAsyncEffect;
exports.useAutoJoin = useAutoJoin;
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
exports.useLocalAudioTrack = useLocalAudioTrack;
exports.useLocalCameraTrack = useLocalCameraTrack;
exports.useNetworkQuality = useNetworkQuality;
exports.useOptionalRTCClient = useOptionalRTCClient;
exports.usePublish = usePublish;
exports.usePublishedRemoteUsers = usePublishedRemoteUsers;
exports.useRTCClient = useRTCClient;
exports.useRTCScreenShareClient = useRTCScreenShareClient;
exports.useRemoteAudioTracks = useRemoteAudioTracks;
exports.useRemoteUserTrack = useRemoteUserTrack;
exports.useRemoteUsers = useRemoteUsers;
exports.useRemoteVideoTracks = useRemoteVideoTracks;
exports.useSafePromise = useSafePromise;
exports.useTrackEvent = useTrackEvent;
exports.useVolumeLevel = useVolumeLevel;
