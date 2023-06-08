import { IAgoraRTCClient, ConnectionState, ConnectionDisconnectedReason, IAgoraRTCRemoteUser, UID, RemoteStreamType, ChannelMediaRelayState, ChannelMediaRelayError, ChannelMediaRelayEvent, NetworkQuality as NetworkQuality$1, ILocalTrack, IBufferSourceAudioTrack, AudioSourceState, ILocalVideoTrack, IRemoteTrack, IRemoteVideoTrack, IRemoteAudioTrack, ILocalAudioTrack, ICameraVideoTrack, MicrophoneAudioTrackInitConfig, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import { useLayoutEffect, RefObject, Ref, ReactNode, HTMLProps, PropsWithChildren } from 'react';

type Disposer = () => void;
type Fn = (...args: any[]) => any;
type Nullable<T> = T | null | undefined;
type MaybePromise<T> = T | PromiseLike<T>;
type MaybePromiseOrNull<T> = MaybePromise<Nullable<T>>;

declare class AgoraRTCError extends Error {
    readonly code: `${AgoraRTCErrorCode}`;
    readonly message: string;
    readonly data?: any;
    readonly name: string;
    constructor(code: `${AgoraRTCErrorCode}`, message?: string, data?: any);
    toString(): string;
    print(level?: "error" | "warning"): AgoraRTCError;
    throw(): never;
}
declare enum AgoraRTCErrorCode {
    UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
    UNEXPECTED_RESPONSE = "UNEXPECTED_RESPONSE",
    TIMEOUT = "TIMEOUT",
    INVALID_PARAMS = "INVALID_PARAMS",
    NOT_READABLE = "NOT_READABLE",
    NOT_SUPPORTED = "NOT_SUPPORTED",
    INVALID_OPERATION = "INVALID_OPERATION",
    OPERATION_ABORTED = "OPERATION_ABORTED",
    WEB_SECURITY_RESTRICT = "WEB_SECURITY_RESTRICT",
    EXCHANGE_SDP_FAILED = "EXCHANGE_SDP_FAILED",
    NETWORK_ERROR = "NETWORK_ERROR",
    NETWORK_TIMEOUT = "NETWORK_TIMEOUT",
    NETWORK_RESPONSE_ERROR = "NETWORK_RESPONSE_ERROR",
    API_INVOKE_TIMEOUT = "API_INVOKE_TIMEOUT",
    ENUMERATE_DEVICES_FAILED = "ENUMERATE_DEVICES_FAILED",
    DEVICE_NOT_FOUND = "DEVICE_NOT_FOUND",
    ELECTRON_IS_NULL = "ELECTRON_IS_NULL",
    ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR = "ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR",
    CHROME_PLUGIN_NO_RESPONSE = "CHROME_PLUGIN_NO_RESPONSE",
    CHROME_PLUGIN_NOT_INSTALL = "CHROME_PLUGIN_NOT_INSTALL",
    MEDIA_OPTION_INVALID = "MEDIA_OPTION_INVALID",
    PERMISSION_DENIED = "PERMISSION_DENIED",
    CONSTRAINT_NOT_SATISFIED = "CONSTRAINT_NOT_SATISFIED",
    TRACK_IS_DISABLED = "TRACK_IS_DISABLED",
    GET_VIDEO_ELEMENT_VISIBLE_ERROR = "GET_VIDEO_ELEMENT_VISIBLE_ERROR",
    SHARE_AUDIO_NOT_ALLOWED = "SHARE_AUDIO_NOT_ALLOWED",
    LOW_STREAM_ENCODING_ERROR = "LOW_STREAM_ENCODING_ERROR",
    SET_ENCODING_PARAMETER_ERROR = "SET_ENCODING_PARAMETER_ERROR",
    TRACK_STATE_UNREACHABLE = "TRACK_STATE_UNREACHABLE",
    INVALID_UINT_UID_FROM_STRING_UID = "INVALID_UINT_UID_FROM_STRING_UID",
    CAN_NOT_GET_PROXY_SERVER = "CAN_NOT_GET_PROXY_SERVER",
    CAN_NOT_GET_GATEWAY_SERVER = "CAN_NOT_GET_GATEWAY_SERVER",
    VOID_GATEWAY_ADDRESS = "VOID_GATEWAY_ADDRESS",
    UID_CONFLICT = "UID_CONFLICT",
    MULTI_UNILBS_RESPONSE_ERROR = "MULTI_UNILBS_RESPONSE_ERROR",
    UPDATE_TICKET_FAILED = "UPDATE_TICKET_FAILED",
    INVALID_LOCAL_TRACK = "INVALID_LOCAL_TRACK",
    INVALID_TRACK = "INVALID_TRACK",
    SENDER_NOT_FOUND = "SENDER_NOT_FOUND",
    CREATE_OFFER_FAILED = "CREATE_OFFER_FAILED",
    SET_ANSWER_FAILED = "SET_ANSWER_FAILED",
    ICE_FAILED = "ICE_FAILED",
    PC_CLOSED = "PC_CLOSED",
    SENDER_REPLACE_FAILED = "SENDER_REPLACE_FAILED",
    GET_LOCAL_CAPABILITIES_FAILED = "GET_LOCAL_CAPABILITIES_FAILED",
    GET_LOCAL_CONNECTION_PARAMS_FAILED = "GET_LOCAL_CONNECTION_PARAMS_FAILED",
    SUBSCRIBE_FAILED = "SUBSCRIBE_FAILED",
    UNSUBSCRIBE_FAILED = "UNSUBSCRIBE_FAILED",
    GATEWAY_P2P_LOST = "GATEWAY_P2P_LOST",
    NO_ICE_CANDIDATE = "NO_ICE_CANDIDATE",
    CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS = "CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS",
    EXIST_DISABLED_VIDEO_TRACK = "EXIST_DISABLED_VIDEO_TRACK",
    INVALID_REMOTE_USER = "INVALID_REMOTE_USER",
    REMOTE_USER_IS_NOT_PUBLISHED = "REMOTE_USER_IS_NOT_PUBLISHED",
    CUSTOM_REPORT_SEND_FAILED = "CUSTOM_REPORT_SEND_FAILED",
    CUSTOM_REPORT_FREQUENCY_TOO_HIGH = "CUSTOM_REPORT_FREQUENCY_TOO_HIGH",
    FETCH_AUDIO_FILE_FAILED = "FETCH_AUDIO_FILE_FAILED",
    READ_LOCAL_AUDIO_FILE_ERROR = "READ_LOCAL_AUDIO_FILE_ERROR",
    DECODE_AUDIO_FILE_FAILED = "DECODE_AUDIO_FILE_FAILED",
    WS_ABORT = "WS_ABORT",
    WS_DISCONNECT = "WS_DISCONNECT",
    WS_ERR = "WS_ERR",
    LIVE_STREAMING_TASK_CONFLICT = "LIVE_STREAMING_TASK_CONFLICT",
    LIVE_STREAMING_INVALID_ARGUMENT = "LIVE_STREAMING_INVALID_ARGUMENT",
    LIVE_STREAMING_INTERNAL_SERVER_ERROR = "LIVE_STREAMING_INTERNAL_SERVER_ERROR",
    LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED = "LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED",
    LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED = "LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED",
    LIVE_STREAMING_CDN_ERROR = "LIVE_STREAMING_CDN_ERROR",
    LIVE_STREAMING_INVALID_RAW_STREAM = "LIVE_STREAMING_INVALID_RAW_STREAM",
    LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT = "LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT",
    LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE = "LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE",
    LIVE_STREAMING_WARN_FREQUENT_REQUEST = "LIVE_STREAMING_WARN_FREQUENT_REQUEST",
    WEBGL_INTERNAL_ERROR = "WEBGL_INTERNAL_ERROR",
    BEAUTY_PROCESSOR_INTERNAL_ERROR = "BEAUTY_PROCESSOR_INTERNAL_ERROR",
    CROSS_CHANNEL_WAIT_STATUS_ERROR = "CROSS_CHANNEL_WAIT_STATUS_ERROR",
    CROSS_CHANNEL_FAILED_JOIN_SRC = "CROSS_CHANNEL_FAILED_JOIN_SEC",
    CROSS_CHANNEL_FAILED_JOIN_DEST = "CROSS_CHANNEL_FAILED_JOIN_DEST",
    CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST = "CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST",
    CROSS_CHANNEL_SERVER_ERROR_RESPONSE = "CROSS_CHANNEL_SERVER_ERROR_RESPONSE",
    METADATA_OUT_OF_RANGE = "METADATA_OUT_OF_RANGE",
    LOCAL_AEC_ERROR = "LOCAL_AEC_ERROR",
    INVALID_PLUGIN = "INVALID_PLUGIN",
    DISCONNECT_P2P = "DISCONNECT_P2P",
    INIT_WEBSOCKET_TIMEOUT = "INIT_WEBSOCKET_TIMEOUT",
    CONVERTING_IMAGEDATA_TO_BLOB_FAILED = "CONVERTING_IMAGEDATA_TO_BLOB_FAILED",
    CONVERTING_VIDEO_FRAME_TO_BLOB_FAILED = "CONVERTING_VIDEO_FRAME_TO_BLOB_FAILED",
    INIT_DATACHANNEL_TIMEOUT = "INIT_DATACHANNEL_TIMEOUT",
    DATACHANNEL_CONNECTION_TIMEOUT = "DATACHANNEL_CONNECTION_TIMEOUT"
}
declare enum InspectState {
    CONNECTING = "CONNECTING",
    RECONNECTING = "RECONNECTING",
    CONNECTED = "CONNECTED",
    CLOSED = "CLOSED"
}
declare type CheckVideoVisibleResult = {
    visible: true;
} | {
    visible: false;
    reason: `${VisibleHiddenReason}`;
};
declare enum VisibleHiddenReason {
    COVERED = "COVERED",
    POSITION = "POSITION",
    SIZE = "SIZE",
    STYLE = "STYLE"
}
interface Listenable {
    on: (event: any, listener: Fn) => void;
    off: (event: any, listener: Fn) => void;
}
/**
 * Occurs when the state of the connection between the SDK and the server changes.
 */
declare function listen(client: IAgoraRTCClient, event: "connection-state-change", listener: (
/** The current connection state. */
curState: ConnectionState, 
/** The previous connection state. */
revState: ConnectionState, 
/** The reason of disconnection if `curState` is `"DISCONNECTED"`. */
reason?: ConnectionDisconnectedReason) => void): Disposer;
/**
 * Occurs when a remote user or host joins the channel.
 *
 * - In a communication channel, this callback indicates that another user joins the channel and reports the ID of that user. The SDK also triggers this callback to report the existing users in the channel when a user joins the channel.
 * - In a live-broadcast channel, this callback indicates that a host joins the channel. The SDK also triggers this callback to report the existing hosts in the channel when a user joins the channel. Ensure that you have no more than 17 hosts in a channel.
 *
 * The SDK triggers this callback when one of the following situations occurs:
 * - A remote user or host joins the channel by calling {@link IAgoraRTCClient.join}.
 * - A remote audience switches the user role to host by calling {@link IAgoraRTCClient.setClientRole} after joining the channel.
 * - A remote user or host rejoins the channel after a network interruption.
 */
declare function listen(client: IAgoraRTCClient, event: "user-joined", listener: (
/** Information of the remote user. */
user: IAgoraRTCRemoteUser) => void): Disposer;
/**
 * Occurs when a remote user becomes offline.
 *
 * The SDK triggers this callback when one of the following situations occurs:
 * - A remote user calls {@link leave} and leaves the channel.
 * - A remote user has dropped offline. If no data packet of the user or host is received for 20 seconds, the SDK assumes that the user has dropped offline. A poor network connection may cause a false positive.
 * - A remote user switches the client role from host to audience.
 *
 * > In live-broadcast channels, the SDK triggers this callback only when a host goes offline.
 */
declare function listen(client: IAgoraRTCClient, event: "user-left", listener: (
/** Information of the user who is offline. */
user: IAgoraRTCRemoteUser, 
/**
 * Reason why the user has gone offline.
 * - `"Quit"`: The user calls {@link leave} and leaves the channel.
 * - `"ServerTimeOut"`: The user has dropped offline.
 * - `"BecomeAudience"`: The client role is switched from host to audience.
 */
reason: "Quit" | "ServerTimeOut" | "BecomeAudience") => void): Disposer;
/**
 * Occurs when a remote user publishes an audio or video track.
 *
 * You can subscribe to and play the audio or video track in this callback. See {@link subscribe} and [RemoteTrack.play]{@link IRemoteTrack.play}.
 *
 * > The SDK also triggers this callback to report the existing tracks in the channel when a user joins the channel.
 *
 * ```javascript
 * client.on("user-published", async (user, mediaType) => {
 *   await client.subscribe(user, mediaType);
 *   if (mediaType === "video") {
 *     console.log("subscribe video success");
 *     user.videoTrack.play("xxx");
 *   }
 *   if (mediaType === "audio") {
 *     console.log("subscribe audio success");
 *     user.audioTrack.play();
 *   }
 * })
 * ```
 */
declare function listen(client: IAgoraRTCClient, event: "user-published", listener: (
/** Information of the remote user. */
user: IAgoraRTCRemoteUser, 
/**
 * Type of the track.
 * - `"audio"`: The remote user publishes an audio track.
 * - `"video"`: The remote user publishes a video track.
 */
mediaType: "audio" | "video") => void): Disposer;
/**
 * Occurs when a remote user unpublishes an audio or video track.
 */
declare function listen(client: IAgoraRTCClient, event: "user-unpublished", listener: (
/** Information of the remote user. */
user: IAgoraRTCRemoteUser, 
/**
 * Type of the track.
 * - `"audio"`: The remote user unpublishes an audio track.
 * - `"video"`: The remote user unpublishes a video track.
 */
mediaType: "audio" | "video") => void): Disposer;
/**
 * Reports the state change of users.
 *
 * In most cases, you only need to listen for [user-published]{@link IAgoraRTCClient.event_user_published} and [user-unpublished]{@link IAgoraRTCClient.event_user_unpublished} events for operations including subscribing, unsubscribing, and displaying whether the remote user turns on the camera and microphone. You do not need to pay special attention to user states since the SDK automatically handles user states.
 *
 * > This event indicating the media stream of a remote user is active does not necessarily mean that the local user can subscribe to this remote user. The local user can subscribe to a remote user only when receiving the [user-published]{@link IAgoraRTCClient.event_user_published} event.
 */
declare function listen(client: IAgoraRTCClient, event: "user-info-updated", listener: (
/** The ID of the remote user. */
uid: UID, 
/** The current user state. Note that the `"enable-local-video"` and `"disable-local-video"` states are only for synchronizing states with the clients that integrate the RTC Native SDK. */
msg: `${"mute" | "unmute"}-${"audio" | "video"}` | `${"enable" | "disable"}-local-video`) => void): Disposer;
/**
 * Occurs when the SDK starts to reestablish the media connection for publishing and subscribing.
 */
declare function listen(client: IAgoraRTCClient, event: "media-reconnect-start", listener: (
/** The ID of the user who reestablishes the connection.  If it is the local `uid`, the connection is for publishing; if it is a remote `uid`, the connection is for subscribing. */
uid: UID) => void): Disposer;
/**
 * Occurs when the SDK ends reestablishing the media connection for publishing and subscribing.
 */
declare function listen(client: IAgoraRTCClient, event: "media-reconnect-end", listener: (
/** The ID of the user who reestablishes the connection. If it is the local `uid`, the connection is for publishing; if it is a remote `uid`, the connection is for subscribing. */
uid: UID) => void): Disposer;
/**
 * Occurs when the type of a remote video stream changes.
 *
 * The SDK triggers this callback when a high-quality video stream changes to a low-quality video stream, or vice versa.
 */
declare function listen(client: IAgoraRTCClient, event: "stream-type-changed", listener: (
/** The ID of the remote user. */
uid: UID, 
/**
 * The new stream type:
 * - 0: High-bitrate, high-resolution video stream.
 * - 1: Low-bitrate, low-resolution video stream.
 */
streamType: RemoteStreamType) => void): Disposer;
/**
 * Occurs when a remote video stream falls back to an audio stream due to unreliable network conditions or switches back to video after the network conditions improve.
 */
declare function listen(client: IAgoraRTCClient, event: "stream-fallback", listener: (
/** The ID of the remote user. */
uid: UID, 
/**
 * Whether the remote media stream falls back or recovers:
 * - `"fallback"`: The remote media stream falls back to audio-only due to unreliable network conditions.
 * - `"recover"`: The remote media stream switches back to the video stream after the network conditions improve.
 */
isFallbackOrRecover: "fallback" | "recover") => void): Disposer;
/**
 * Occurs when the state of the media stream relay changes.
 *
 * The SDK reports the state and error code of the current media relay with this callback.
 *
 * If the media relay is in an abnormal state, you can find the error code in {@link ChannelMediaRelayError} (for example if the token has expired, or repeated reconnection attempts fail.)
 */
declare function listen(client: IAgoraRTCClient, event: "channel-media-relay-state", listener: (
/** The state of the media relay. */
state: ChannelMediaRelayState, 
/** The error code. */
code: ChannelMediaRelayError) => void): Disposer;
/**
 * Reports events during a media stream relay.
 */
declare function listen(client: IAgoraRTCClient, event: "channel-media-relay-event", listener: (
/** The event code for a media stream relay. */
event: ChannelMediaRelayEvent) => void): Disposer;
/**
 * Reports all the speaking remote users and their volumes.
 *
 * It is disabled by default. You can enable this callback by calling {@link enableAudioVolumeIndicator}.
 * If enabled, it reports the users' volumes every two seconds regardless of whether there are users speaking.
 *
 * The volume is an integer ranging from 0 to 100. Usually a user with volume above 60 is a speaking user.
 *
 * ``` javascript
 * client.on("volume-indicator", function(result){
 *     result.forEach(function(volume, index){
 *     console.log(`${index} UID ${volume.uid} Level ${volume.level}`);
 *   });
 * });
 * ```
 */
declare function listen(client: IAgoraRTCClient, event: "volume-indicator", listener: (
/**
 * An object consisting of the following properties:
 * - level: The volume of the speaking user, ranging from 0 to 100.
 * - uid: The ID of the speaking user.
 *
 */
result: {
    uid: UID;
    level: number;
}[]) => void): Disposer;
/**
 * Occurs when decryption fails.
 *
 * The SDK triggers this callback when the decryption fails during the process of subscribing to a stream. The failure is usually caused by incorrect encryption settings. See {@link setEncryptionConfig} for details.
 */
declare function listen(client: IAgoraRTCClient, event: "crypt-error", listener: () => void): Disposer;
/**
 * Occurs 30 seconds before a token expires.
 *
 * You must request a new token from your server and call {@link renewToken} to pass a new token as soon as possible.
 *
 * ``` javascript
 * client.on("token-privilege-will-expire", async function(){
 *   // After requesting a new token
 *   await client.renewToken(token);
 * });
 * ```
 */
declare function listen(client: IAgoraRTCClient, event: "token-privilege-will-expire", listener: () => void): Disposer;
/**
 * Occurs when the token expires.
 *
 * You must request a new token from your server and call {@link join} to use the new token to join the channel.
 *
 * ``` javascript
 * client.on("token-privilege-did-expire", async () => {
 *   // After requesting a new token
 *   await client.join(<APPID>, <CHANNEL NAME>, <NEW TOKEN>);
 * });
 * ```
 */
declare function listen(client: IAgoraRTCClient, event: "token-privilege-did-expire", listener: () => void): Disposer;
/**
 * Reports the network quality of the local user.
 *
 * After the local user joins the channel, the SDK triggers this callback to report the uplink and downlink network conditions of the local user once every two second.
 *
 * > Agora recommends listening for this event and displaying the network quality.
 */
declare function listen(client: IAgoraRTCClient, event: "network-quality", listener: (
/** The network quality of the local user. */
stats: NetworkQuality$1) => void): Disposer;
/**
 * Occurs when an error occurs in CDN live streaming.
 *
 * After the method call of {@link startLiveStreaming} succeeds, the SDK triggers this callback when errors occur during CDN live streaming.
 *
 * You can visit `err.code` to get the error code. The errors that you may encounter include:
 * - `LIVE_STREAMING_INVALID_ARGUMENT`: Invalid argument.
 * - `LIVE_STREAMING_INTERNAL_SERVER_ERROR`: An error occurs in Agora's streaming server.
 * - `LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED`: The URL is occupied.
 * - `LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED`: Sets the transcoding parameters when the transcoding is not enabled.
 * - `LIVE_STREAMING_CDN_ERROR`: An error occurs in the CDN.
 * - `LIVE_STREAMING_INVALID_RAW_STREAM`: Timeout for the CDN live streaming. Please check your media stream.
 */
declare function listen(client: IAgoraRTCClient, event: "live-streaming-error", listener: (
/** The URL of the CDN live streaming that has errors. */
url: string, 
/** The error details. */
err: AgoraRTCError) => void): Disposer;
/**
 * Occurs when a warning occurs in CDN live streaming.
 *
 * After the method call of {@link startLiveStreaming} succeeds, the SDK triggers this callback when warnings occur during CDN live streaming.
 *
 * You can visit `err.code` to get the warning code. The warnings that you may encounter include:
 * - `LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT`: Pushes stremas to more than 10 URLs.
 * - `LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE`: Fails to load the background image or watermark image.
 * - `LIVE_STREAMING_WARN_FREQUENT_REQUEST`: Pushes stremas to the CDN too frequently.
 */
declare function listen(client: IAgoraRTCClient, event: "live-streaming-warning", listener: (
/** The URL of the CDN live streaming that has warnings. */
url: string, 
/** The warning details. */
err: AgoraRTCError) => void): Disposer;
/**
 * Reports exceptions in the channel.
 *
 * Exceptions are not errors, but usually reflect quality issues.
 *
 * This callback also reports recovery from an exception.
 *
 * Each exception corresponds to a recovery event.
 *
 * **Exception**
 *
 * | Code | Message                   | Exception            |
 * | :----- | :------------------------- | :--------------- |
 * | 1001   | FRAMERATE_INPUT_TOO_LOW    | Captured video frame rate is too low |
 * | 1002   | FRAMERATE_SENT_TOO_LOW     | Sent video frame rate is too low |
 * | 1003   | SEND_VIDEO_BITRATE_TOO_LOW | Sent video bitrate is too low |
 * | 1005   | RECV_VIDEO_DECODE_FAILED   | Decoding received video fails |
 * | 2001   | AUDIO_INPUT_LEVEL_TOO_LOW  | Sent audio volume is too low     |
 * | 2002   | AUDIO_OUTPUT_LEVEL_TOO_LOW | Received audio volume is too low     |
 * | 2003   | SEND_AUDIO_BITRATE_TOO_LOW | Sent audio bitrate is too low |
 * | 2005   | RECV_AUDIO_DECODE_FAILED   | Decoding received audio fails |
 *
 * **Recoveries**
 *
 * | Code | Message                   | Recovery             |
 * | :----- | :------------------------- | :--------------- |
 * |3001   | FRAMERATE_INPUT_TOO_LOW_RECOVER    | Captured video frame rate recovers |
 * |3002   | FRAMERATE_SENT_TOO_LOW_RECOVER     | Sent video frame rate recovers |
 * |3003   | SEND_VIDEO_BITRATE_TOO_LOW_RECOVER | Sent video bitrate recovers |
 * |3005   | RECV_VIDEO_DECODE_FAILED_RECOVER   | Decoding received video recovers |
 * |4001   | AUDIO_INPUT_LEVEL_TOO_LOW_RECOVER  | Sent audio volume recovers     |
 * |4002   | AUDIO_OUTPUT_LEVEL_TOO_LOW_RECOVER | Received audio volume recovers     |
 * |4003   | SEND_AUDIO_BITRATE_TOO_LOW_RECOVER | Sent audio bitrate recovers |
 * |4005   | RECV_AUDIO_DECODE_FAILED_RECOVER   | Decoding received audio recovers |
 */
declare function listen(client: IAgoraRTCClient, event: "exception", listener: (event: {
    code: number;
    msg: string;
    uid: UID;
}) => void): Disposer;
/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.4.0*
 *
 * The SDK triggers this callback to indicate whether the media stream is forwarded by the Agora cloud proxy service.
 * - Earlier than v4.10.0: The callback is triggered after the method call of [[publish]] succeeds.
 * - v4.10.0 and later: The callback is triggered after the method call of [[join]] succeeds.
 */
declare function listen(client: IAgoraRTCClient, event: "is-using-cloud-proxy", listener: (
/**
 * Whether the media stream is forwarded by the Agora cloud proxy service.
 * - `true`: Forwarded by the Agora cloud proxy service.
 * - `false`: Not forwarded by the Agora cloud proxy service.
 */
isUsingProxy: boolean) => void): Disposer;
/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.9.0*
 *
 * Occurs when the SDK automatically switches to TCP/TLS 443.
 *
 * As of v4.11.0, if the SDK fails in the attempt to directly connect to Agora SD-RTN™ after you call [[join]],
 * the SDK automatically switches to TCP/TLS 443 in order to ensure connectivity.
 */
declare function listen(client: IAgoraRTCClient, event: "join-fallback-to-proxy", listener: (
/** The server address used after the switch. */
proxyServer: string) => void): Disposer;
/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.11.0*
 *
 * If you enable support for 128 hosts in a channel, this callback is triggered when [[join]] is called.
 * The callback reports remote users who publish audio and/or video tracks in the channel.
 *
 * > Note:
 * > - For the `published-user-list` to be triggered, every user in the channel must use a number as their user ID (`uid`).
 * > - `published-user-list` has the following impacts on [AgoraRTCClient.on("user-joined")]{@link event_user_joined} and [AgoraRTCClient.on("user-published")]{@link event_user_published}:
 * >   - If you listen for the `published-user-list` event, users reported by the `published-user-list` callback are not reported by `user-joined` and `user-published`.
 * >   - If you do not listen for the `published-user-list` event, the `user-joined` and `user-published` callbacks are not affected.
 */
declare function listen(client: IAgoraRTCClient, event: "published-user-list", listener: (
/** The remote user. */
user: IAgoraRTCRemoteUser) => void): Disposer;
/**
 * Occurs when the state of the connection between the SDK and the server changes.
 */
declare function listen(client: IAgoraRTCClient, event: "content-inspect-connection-state-change", listener: (
/** The current connection state. */
preState: `${InspectState}`, 
/** The previous connection state. */
newState: `${InspectState}`) => void): Disposer;
/**
 * Occurs when the state of the connection between the SDK errors.
 */
declare function listen(client: IAgoraRTCClient, event: "content-inspect-error", listener: (
/** The current connection state. */
error?: AgoraRTCError) => void): Disposer;
/**
 * Occurs when a audio or video track ends.
 *
 * Reasons may include:
 * - Camera is unplugged.
 * - Microphone is unplugged.
 * - The local user stops screen sharing.
 * - The local user closes the underlying `MediaStreamTrack`.
 * - A local media device malfunctions.
 * - The device permission is revoked.
 */
declare function listen(client: ILocalTrack, event: "track-ended", listener: () => void): Disposer;
/**
 * Occurs when the state of processing the audio buffer in [BufferSourceAudioTrack]{@link IBufferSourceAudioTrack} changes.
 */
declare function listen(client: IBufferSourceAudioTrack, event: "source-state-change", listener: (
/**
 *  The state of processing the audio buffer:
 * - `"stopped"`: The SDK stops processing the audio buffer. Reasons may include:
 *  - The SDK finishes processing the audio buffer.
 *  - The user manually stops the processing of the audio buffer.
 * - `"paused"`: The SDK pauses the processing of the audio buffer.
 * - `"playing"`: The SDK is processing the audio buffer.
 *
 */
currentState: AudioSourceState) => void): Disposer;
/**
 * Occurs when the device is overloaded after you call [setBeautyEffect]{@link ILocalVideoTrack.setBeautyEffect} to enable image enhancement.
 *
 * You can listen for this event to notify users of the device overload and disable image enhancement.
 *
 * ```javascript
 * localVideoTrack.on("beauty-effect-overload", () => {
 *   console.log("beauty effect overload, disable beauty effect");
 *   localVideoTrack.setBeautyEffect(false);
 * });
 * ```
 */
declare function listen(client: ILocalVideoTrack, event: "beauty-effect-overload", listener: () => void): Disposer;
/**
 * Occurs when a audio or video track ends.
 *
 * Reasons may include:
 * - Camera is unplugged.
 * - Microphone is unplugged.
 * - The local user stops screen sharing.
 * - The local user closes the underlying `MediaStreamTrack`.
 * - A local media device malfunctions.
 * - The device permission is revoked.
 */
declare function listen(client: ILocalVideoTrack, event: "track-ended", listener: () => void): Disposer;
/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.8.0*
 *
 * Indicates the visibility of the `<video>` HTML tag.
 *
 * The SDK triggers this event every 30 seconds.
 *
 * After you call `localVideoTrack.play`, the SDK creates an [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) tag for playing video tracks. When `localVideoTrack.isPlaying` is `true` but you cannot see any video, this event helps you check whether the `<video>` tag is visible or not and learn the reason when the `<video>` tag is invisible.
 */
declare function listen(client: ILocalVideoTrack, event: "video-element-visible-status", listener: () => void): Disposer;
/**
 * Occurs when the first remote audio or video frame is decoded.
 */
declare function listen(client: IRemoteTrack, event: "first-frame-decoded", listener: () => void): Disposer;
/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.8.0*
 *
 * Indicates the visibility of the `<video>` HTML tag.
 *
 * The SDK triggers this event every 30 seconds.
 *
 * After you call `localVideoTrack.play`, the SDK creates an [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) tag for playing video tracks. When `localVideoTrack.isPlaying` is `true` but you cannot see any video, this event helps you check whether the `<video>` tag is visible or not and learn the reason when the `<video>` tag is invisible.
 */
declare function listen(client: IRemoteVideoTrack, event: "video-element-visible-status", listener: (
/** The visibility of the `<video>` tag. */
data?: CheckVideoVisibleResult) => void): Disposer;
declare function listen(listenable: Listenable, event: string, listener: Fn): Disposer;

declare const useIsomorphicLayoutEffect: typeof useLayoutEffect;
declare function isPromise<T>(value: MaybePromise<T>): value is PromiseLike<T>;
declare function useForceUpdate(): () => void;
declare function useIsUnmounted(): RefObject<boolean>;
/**
 * Leave promise unresolved when the component is unmounted.
 *
 * ```js
 * const sp = useSafePromise()
 * setLoading(true)
 * try {
 *   const result1 = await sp(fetchData1())
 *   const result2 = await sp(fetchData2(result1))
 *   setData(result2)
 * } catch(e) {
 *   setHasError(true)
 * }
 * setLoading(false)
 * ```
 */
declare function useSafePromise(): <T, E = unknown>(promise: PromiseLike<T>, onUnmountedError?: ((error: E) => void) | undefined) => Promise<T>;
declare function applyRef<T>(ref: Ref<T>, value: T): void;
/**
 * Sugar to merge forwarded ref and produce a local ref (state).
 *
 * ```jsx
 * const Button = forwardRef((props, ref) => {
 *   const [div, setDiv] = useForwardRef(ref)
 *   // use 'div' here
 *   return <div ref={setDiv} />
 * })
 * ```
 */
declare function useForwardRef<T>(ref: Ref<T>): [T | null, (value: T | null) => void];
/**
 * Await a promise or return the value directly.
 */
declare function useAwaited<T>(promise: MaybePromise<T>): T | undefined;
/**
 * Accepts a function that contains imperative, possibly asynchronous effect-ful code.
 * During the side-effect running/removing, if multiple effects are triggered, only the last one will be executed.
 */
declare function useAsyncEffect(effect: () => MaybePromise<void | (() => MaybePromise<void>)>, deps?: ReadonlyArray<unknown>): void;

/**
 * Occurs when the state of the connection between the SDK and the server changes.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "connection-state-change", listener: Nullable<(curState: ConnectionState, revState: ConnectionState, reason?: ConnectionDisconnectedReason) => void>): void;
/**
 * Occurs when a remote user or host joins the channel.
 *
 * - In a communication channel, this callback indicates that another user joins the channel and reports the ID of that user. The SDK also triggers this callback to report the existing users in the channel when a user joins the channel.
 * - In a live-broadcast channel, this callback indicates that a host joins the channel. The SDK also triggers this callback to report the existing hosts in the channel when a user joins the channel. Ensure that you have no more than 17 hosts in a channel.
 *
 * The SDK triggers this callback when one of the following situations occurs:
 * - A remote user or host joins the channel by calling {@link join}.
 * - A remote audience switches the user role to host by calling {@link setClientRole} after joining the channel.
 * - A remote user or host rejoins the channel after a network interruption.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "user-joined", listener: Nullable<(user: IAgoraRTCRemoteUser) => void>): void;
/**
 * Occurs when a remote user becomes offline.
 *
 * The SDK triggers this callback when one of the following situations occurs:
 * - A remote user calls {@link leave} and leaves the channel.
 * - A remote user has dropped offline. If no data packet of the user or host is received for 20 seconds, the SDK assumes that the user has dropped offline. A poor network connection may cause a false positive.
 * - A remote user switches the client role from host to audience.
 *
 * > In live-broadcast channels, the SDK triggers this callback only when a host goes offline.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "user-left", listener: Nullable<(user: IAgoraRTCRemoteUser, reason: "Quit" | "ServerTimeOut" | "BecomeAudience") => void>): void;
/**
 * Occurs when a remote user publishes an audio or video track.
 *
 * You can subscribe to and play the audio or video track in this callback. See {@link subscribe} and [RemoteTrack.play]{@link IRemoteTrack.play}.
 *
 * > The SDK also triggers this callback to report the existing tracks in the channel when a user joins the channel.
 *
 * ```javascript
 * client.on("user-published", async (user, mediaType) => {
 *   await client.subscribe(user, mediaType);
 *   if (mediaType === "video") {
 *     console.log("subscribe video success");
 *     user.videoTrack.play("xxx");
 *   }
 *   if (mediaType === "audio") {
 *     console.log("subscribe audio success");
 *     user.audioTrack.play();
 *   }
 * })
 * ```
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "user-published", listener: Nullable<(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => void>): void;
/**
 * Occurs when a remote user unpublishes an audio or video track.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "user-unpublished", listener: Nullable<(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => void>): void;
/**
 * Reports the state change of users.
 *
 * In most cases, you only need to listen for [user-published]{@link IAgoraRTCClient.event_user_published} and [user-unpublished]{@link IAgoraRTCClient.event_user_unpublished} events for operations including subscribing, unsubscribing, and displaying whether the remote user turns on the camera and microphone. You do not need to pay special attention to user states since the SDK automatically handles user states.
 *
 * > This event indicating the media stream of a remote user is active does not necessarily mean that the local user can subscribe to this remote user. The local user can subscribe to a remote user only when receiving the [user-published]{@link IAgoraRTCClient.event_user_published} event.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "user-info-updated", listener: Nullable<(uid: UID, msg: `${"mute" | "unmute"}-${"audio" | "video"}` | `${"enable" | "disable"}-local-video`) => void>): void;
/**
 * Occurs when the SDK starts to reestablish the media connection for publishing and subscribing.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "media-reconnect-start", listener: Nullable<(uid: UID) => void>): void;
/**
 * Occurs when the SDK ends reestablishing the media connection for publishing and subscribing.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "media-reconnect-end", listener: Nullable<(uid: UID) => void>): void;
/**
 * Occurs when the type of a remote video stream changes.
 *
 * The SDK triggers this callback when a high-quality video stream changes to a low-quality video stream, or vice versa.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "stream-type-changed", listener: Nullable<(uid: UID, streamType: RemoteStreamType) => void>): void;
/**
 * Occurs when a remote video stream falls back to an audio stream due to unreliable network conditions or switches back to video after the network conditions improve.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "stream-fallback", listener: Nullable<(uid: UID, isFallbackOrRecover: "fallback" | "recover") => void>): void;
/**
 * Occurs when the state of the media stream relay changes.
 *
 * The SDK reports the state and error code of the current media relay with this callback.
 *
 * If the media relay is in an abnormal state, you can find the error code in {@link ChannelMediaRelayError} (for example if the token has expired, or repeated reconnection attempts fail.)
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "channel-media-relay-state", listener: Nullable<(state: ChannelMediaRelayState, code: ChannelMediaRelayError) => void>): void;
/**
 * Reports events during a media stream relay.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "channel-media-relay-event", listener: Nullable<(event: ChannelMediaRelayEvent) => void>): void;
/**
 * Reports all the speaking remote users and their volumes.
 *
 * It is disabled by default. You can enable this callback by calling {@link enableAudioVolumeIndicator}.
 * If enabled, it reports the users' volumes every two seconds regardless of whether there are users speaking.
 *
 * The volume is an integer ranging from 0 to 100. Usually a user with volume above 60 is a speaking user.
 *
 * ``` javascript
 * client.on("volume-indicator", function(result){
 *     result.forEach(function(volume, index){
 *     console.log(`${index} UID ${volume.uid} Level ${volume.level}`);
 *   });
 * });
 * ```
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "volume-indicator", listener: Nullable<(result: {
    uid: UID;
    level: number;
}[]) => void>): void;
/**
 * Occurs when decryption fails.
 *
 * The SDK triggers this callback when the decryption fails during the process of subscribing to a stream. The failure is usually caused by incorrect encryption settings. See {@link setEncryptionConfig} for details.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "crypt-error", listener: Nullable<() => void>): void;
/**
 * Occurs 30 seconds before a token expires.
 *
 * You must request a new token from your server and call {@link renewToken} to pass a new token as soon as possible.
 *
 * ``` javascript
 * client.on("token-privilege-will-expire", async function(){
 *   // After requesting a new token
 *   await client.renewToken(token);
 * });
 * ```
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "token-privilege-will-expire", listener: Nullable<() => void>): void;
/**
 * Occurs when the token expires.
 *
 * You must request a new token from your server and call {@link join} to use the new token to join the channel.
 *
 * ``` javascript
 * client.on("token-privilege-did-expire", async () => {
 *   // After requesting a new token
 *   await client.join(<APPID>, <CHANNEL NAME>, <NEW TOKEN>);
 * });
 * ```
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "token-privilege-did-expire", listener: Nullable<() => void>): void;
/**
 * Reports the network quality of the local user.
 *
 * After the local user joins the channel, the SDK triggers this callback to report the uplink and downlink network conditions of the local user once every two second.
 *
 * > Agora recommends listening for this event and displaying the network quality.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "network-quality", listener: Nullable<(stats: NetworkQuality$1) => void>): void;
/**
 * Occurs when an error occurs in CDN live streaming.
 *
 * After the method call of {@link startLiveStreaming} succeeds, the SDK triggers this callback when errors occur during CDN live streaming.
 *
 * You can visit `err.code` to get the error code. The errors that you may encounter include:
 * - `LIVE_STREAMING_INVALID_ARGUMENT`: Invalid argument.
 * - `LIVE_STREAMING_INTERNAL_SERVER_ERROR`: An error occurs in Agora's streaming server.
 * - `LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED`: The URL is occupied.
 * - `LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED`: Sets the transcoding parameters when the transcoding is not enabled.
 * - `LIVE_STREAMING_CDN_ERROR`: An error occurs in the CDN.
 * - `LIVE_STREAMING_INVALID_RAW_STREAM`: Timeout for the CDN live streaming. Please check your media stream.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "live-streaming-error", listener: Nullable<(url: string, err: AgoraRTCError) => void>): void;
/**
 * Occurs when a warning occurs in CDN live streaming.
 *
 * After the method call of {@link startLiveStreaming} succeeds, the SDK triggers this callback when warnings occur during CDN live streaming.
 *
 * You can visit `err.code` to get the warning code. The warnings that you may encounter include:
 * - `LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT`: Pushes stremas to more than 10 URLs.
 * - `LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE`: Fails to load the background image or watermark image.
 * - `LIVE_STREAMING_WARN_FREQUENT_REQUEST`: Pushes stremas to the CDN too frequently.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "live-streaming-warning", listener: Nullable<(url: string, err: AgoraRTCError) => void>): void;
/**
 * Reports exceptions in the channel.
 *
 * Exceptions are not errors, but usually reflect quality issues.
 *
 * This callback also reports recovery from an exception.
 *
 * Each exception corresponds to a recovery event.
 *
 * **Exception**
 *
 * | Code | Message                   | Exception            |
 * | :----- | :------------------------- | :--------------- |
 * | 1001   | FRAMERATE_INPUT_TOO_LOW    | Captured video frame rate is too low |
 * | 1002   | FRAMERATE_SENT_TOO_LOW     | Sent video frame rate is too low |
 * | 1003   | SEND_VIDEO_BITRATE_TOO_LOW | Sent video bitrate is too low |
 * | 1005   | RECV_VIDEO_DECODE_FAILED   | Decoding received video fails |
 * | 2001   | AUDIO_INPUT_LEVEL_TOO_LOW  | Sent audio volume is too low     |
 * | 2002   | AUDIO_OUTPUT_LEVEL_TOO_LOW | Received audio volume is too low     |
 * | 2003   | SEND_AUDIO_BITRATE_TOO_LOW | Sent audio bitrate is too low |
 * | 2005   | RECV_AUDIO_DECODE_FAILED   | Decoding received audio fails |
 *
 * **Recoveries**
 *
 * | Code | Message                   | Recovery             |
 * | :----- | :------------------------- | :--------------- |
 * |3001   | FRAMERATE_INPUT_TOO_LOW_RECOVER    | Captured video frame rate recovers |
 * |3002   | FRAMERATE_SENT_TOO_LOW_RECOVER     | Sent video frame rate recovers |
 * |3003   | SEND_VIDEO_BITRATE_TOO_LOW_RECOVER | Sent video bitrate recovers |
 * |3005   | RECV_VIDEO_DECODE_FAILED_RECOVER   | Decoding received video recovers |
 * |4001   | AUDIO_INPUT_LEVEL_TOO_LOW_RECOVER  | Sent audio volume recovers     |
 * |4002   | AUDIO_OUTPUT_LEVEL_TOO_LOW_RECOVER | Received audio volume recovers     |
 * |4003   | SEND_AUDIO_BITRATE_TOO_LOW_RECOVER | Sent audio bitrate recovers |
 * |4005   | RECV_AUDIO_DECODE_FAILED_RECOVER   | Decoding received audio recovers |
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "exception", listener: Nullable<(event: {
    code: number;
    msg: string;
    uid: UID;
}) => void>): void;
/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.4.0*
 *
 * The SDK triggers this callback to indicate whether the media stream is forwarded by the Agora cloud proxy service.
 * - Earlier than v4.10.0: The callback is triggered after the method call of [[publish]] succeeds.
 * - v4.10.0 and later: The callback is triggered after the method call of [[join]] succeeds.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "is-using-cloud-proxy", listener: Nullable<(isUsingProxy: boolean) => void>): void;
/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.9.0*
 *
 * Occurs when the SDK automatically switches to TCP/TLS 443.
 *
 * As of v4.11.0, if the SDK fails in the attempt to directly connect to Agora SD-RTN™ after you call [[join]],
 * the SDK automatically switches to TCP/TLS 443 in order to ensure connectivity.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "join-fallback-to-proxy", listener: Nullable<(proxyServer: string) => void>): void;
/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.11.0*
 *
 * If you enable support for 128 hosts in a channel, this callback is triggered when [[join]] is called.
 * The callback reports remote users who publish audio and/or video tracks in the channel.
 *
 * > Note:
 * > - For the `published-user-list` to be triggered, every user in the channel must use a number as their user ID (`uid`).
 * > - `published-user-list` has the following impacts on [AgoraRTCClient.on("user-joined")]{@link event_user_joined} and [AgoraRTCClient.on("user-published")]{@link event_user_published}:
 * >   - If you listen for the `published-user-list` event, users reported by the `published-user-list` callback are not reported by `user-joined` and `user-published`.
 * >   - If you do not listen for the `published-user-list` event, the `user-joined` and `user-published` callbacks are not affected.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "published-user-list", listener: Nullable<(user: IAgoraRTCRemoteUser) => void>): void;
/**
 * Occurs when the state of the connection between the SDK and the server changes.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "content-inspect-connection-state-change", listener: Nullable<(preState: `${InspectState}`, newState: `${InspectState}`) => void>): void;
/**
 * Occurs when the state of the connection between the SDK and the server changes.
 */
declare function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "content-inspect-error", listener: Nullable<(error?: AgoraRTCError) => void>): void;
/**
 * Occurs when a audio or video track ends.
 *
 * Reasons may include:
 * - Camera is unplugged.
 * - Microphone is unplugged.
 * - The local user stops screen sharing.
 * - The local user closes the underlying `MediaStreamTrack`.
 * - A local media device malfunctions.
 * - The device permission is revoked.
 */
declare function useTrackEvent(track: Nullable<ILocalTrack>, event: "track-ended", listener: Nullable<() => void>): void;
/**
 * Occurs when the state of processing the audio buffer in [BufferSourceAudioTrack]{@link IBufferSourceAudioTrack} changes.
 */
declare function useTrackEvent(track: Nullable<IBufferSourceAudioTrack>, event: "source-state-change", listener: Nullable<(currentState: AudioSourceState) => void>): void;
/**
 * Occurs when the device is overloaded after you call [setBeautyEffect]{@link ILocalVideoTrack.setBeautyEffect} to enable image enhancement.
 *
 * You can listen for this event to notify users of the device overload and disable image enhancement.
 *
 * ```javascript
 * localVideoTrack.on("beauty-effect-overload", () => {
 *   console.log("beauty effect overload, disable beauty effect");
 *   localVideoTrack.setBeautyEffect(false);
 * });
 * ```
 */
declare function useTrackEvent(track: Nullable<ILocalVideoTrack>, event: "beauty-effect-overload", listener: Nullable<() => void>): void;
/**
 * Occurs when a audio or video track ends.
 *
 * Reasons may include:
 * - Camera is unplugged.
 * - Microphone is unplugged.
 * - The local user stops screen sharing.
 * - The local user closes the underlying `MediaStreamTrack`.
 * - A local media device malfunctions.
 * - The device permission is revoked.
 */
declare function useTrackEvent(track: Nullable<ILocalVideoTrack>, event: "track-ended", listener: Nullable<() => void>): void;
/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.8.0*
 *
 * Indicates the visibility of the `<video>` HTML tag.
 *
 * The SDK triggers this event every 30 seconds.
 *
 * After you call `localVideoTrack.play`, the SDK creates an [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) tag for playing video tracks. When `localVideoTrack.isPlaying` is `true` but you cannot see any video, this event helps you check whether the `<video>` tag is visible or not and learn the reason when the `<video>` tag is invisible.
 */
declare function useTrackEvent(track: Nullable<ILocalVideoTrack>, event: "video-element-visible-status", listener: Nullable<() => void>): void;
/**
 * Occurs when the first remote audio or video frame is decoded.
 */
declare function useTrackEvent(track: Nullable<IRemoteTrack>, event: "first-frame-decoded", listener: Nullable<() => void>): void;
/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.8.0*
 *
 * Indicates the visibility of the `<video>` HTML tag.
 *
 * The SDK triggers this event every 30 seconds.
 *
 * After you call `localVideoTrack.play`, the SDK creates an [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) tag for playing video tracks. When `localVideoTrack.isPlaying` is `true` but you cannot see any video, this event helps you check whether the `<video>` tag is visible or not and learn the reason when the `<video>` tag is invisible.
 */
declare function useTrackEvent(track: Nullable<IRemoteVideoTrack>, event: "video-element-visible-status", listener: Nullable<(data?: CheckVideoVisibleResult) => void>): void;

/**
 * Auto-subscribe and get remote user video track.
 * Unsubscribe track on unmount.
 */
declare function useRemoteUserTrack(user: IAgoraRTCRemoteUser | undefined, mediaType: "video", client?: IAgoraRTCClient | null): IRemoteVideoTrack | undefined;
/**
 * Auto-subscribe and get remote user audio track.
 * Unsubscribe track on unmount.
 */
declare function useRemoteUserTrack(user: IAgoraRTCRemoteUser | undefined, mediaType: "audio", client?: IAgoraRTCClient | null): IRemoteAudioTrack | undefined;
/**
 * Reports volume of a videoTrack every second.
 *
 * @param audioTrack Local/Remote audio track. `volumeLevel` is 0 if undefined.
 * @returns The volume of the track, ranging from 0 to 1
 */
declare function useVolumeLevel(audioTrack?: IRemoteAudioTrack | ILocalAudioTrack): number;
/**
 * Auto-subscribe and get remote user audio track.
 * Unsubscribe track on unmount.
 */
declare function useRemoteAudioTracks(users: IAgoraRTCRemoteUser[] | undefined, client?: IAgoraRTCClient | null): IRemoteAudioTrack[];
/**
 * Auto-subscribe and get remote user video track.
 * Unsubscribe track on unmount.
 */
declare function useRemoteVideoTracks(users: IAgoraRTCRemoteUser[] | undefined, client?: IAgoraRTCClient | null): IRemoteVideoTrack[];
/**
 * a hook can create a local video track, this track will only be created once until Component is destroyed.
 * when you ready to create track, set ready to true.
 * unpublish track on unmount.
 */
declare function useLocalCameraTrack(ready?: boolean, client?: IAgoraRTCClient): ICameraVideoTrack | null;
/**
 * a hook can create a local audio track, this track will only be created once until Component is destroyed.
 * when you ready to create track, set ready to true.
 * close track on unmount.
 */
declare function useLocalAudioTrack(ready?: boolean, audioTrackConfig?: MicrophoneAudioTrackInitConfig, client?: IAgoraRTCClient): IMicrophoneAudioTrack | null;
/**
 * publish tacks when readyToPublish is true
 * unpublish on unmount.
 */
declare function usePublish(tracks: (ILocalTrack | null)[], readyToPublish?: boolean, client?: IAgoraRTCClient): void;

declare function useConnectionState(client?: IAgoraRTCClient | null): ConnectionState;
declare function useIsConnected(client?: IAgoraRTCClient | null): boolean;
/**
 * @returns The UID of the local user if connected to a channel, `undefined` otherwise.
 */
declare function useCurrentUID(client?: IAgoraRTCClient | null): UID | undefined;
interface NetworkQuality {
    /**
     * The uplink network quality.
     *
     * It is calculated based on the uplink transmission bitrate, uplink packet loss rate, RTT (round-trip time) and jitter.
     *
     * - 0: The quality is unknown.
     * - 1: The quality is excellent.
     * - 2: The quality is good, but the bitrate is less than optimal.
     * - 3: Users experience slightly impaired communication.
     * - 4: Users can communicate with each other, but not very smoothly.
     * - 5: The quality is so poor that users can barely communicate.
     * - 6: The network is disconnected and users cannot communicate.
     */
    uplink: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * The downlink network quality.
     *
     * It is calculated based on the uplink transmission bitrate, uplink packet loss rate, RTT (round-trip time) and jitter.
     *
     * - 0: The quality is unknown.
     * - 1: The quality is excellent.
     * - 2: The quality is good, but the bitrate is less than optimal.
     * - 3: Users experience slightly impaired communication.
     * - 4: Users can communicate with each other, but not very smoothly.
     * - 5: The quality is so poor that users can barely communicate.
     * - 6: The network is disconnected and users cannot communicate.
     */
    downlink: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * RTT (Round-Trip Time) between the SDK and Agora's edge server, in ms.
     */
    delay: number;
}
/**
 * Reports the network quality of the local user.
 *
 * After the local user joins the channel, the SDK triggers this callback to report the uplink and downlink network conditions of the local user once every two second.
 */
declare function useNetworkQuality(client?: IAgoraRTCClient | null): NetworkQuality;
declare function useAutoJoin(appid: string, channel: string, token: string | null, uid?: UID | null, client?: IAgoraRTCClient | null): void;
interface joinOptions {
    appid: string;
    channel: string;
    token: string | null;
    uid?: UID | null;
}
type FetchArgs = (() => Promise<joinOptions>) | joinOptions;
/**
 * a hook to join rtc channel
 * unmount will leave channel and close all tracks
 * @param fetchArgs
 * @param ready
 * @param client
 */
declare function useJoin(fetchArgs: FetchArgs, ready?: boolean, client?: IAgoraRTCClient | null): void;

/**
 * Occurs when a remote user becomes online or offline. (client `user-join` and `user-left` events)
 *
 * Updated when one of the following situations occurs:
 * - In a communication channel:
 *   - A remote user joins or leaves the channel.
 *   - A remote user has dropped offline or rejoins the channel after a network interruption.
 * - In a live-broadcast channel:
 *   - A remote host joins or leaves the channel.
 *   - A remote host has dropped offline or rejoins the channel after a network interruption.
 *   - A remote host/user switches the client role between host and audience.
 *
 * ```jsx
 * const remoteUsers = useRemoteUsers(client)
 * return remoteUsers.map(user => (
 *   <li key={user.uid}>{getUserName(user.uid)}</li>
 * ))
 * ```
 */
declare function useRemoteUsers(client?: IAgoraRTCClient | null): IAgoraRTCRemoteUser[];
/**
 * Updated when a remote user publishes or unpublishes an audio or video track. (client `user-published` and `user-unpublished` events)
 *
 * ```jsx
 * const publishedUsers = usePublishedUsers(client)
 * return publishedUsers.map(user => (
 *   <RemoteUser key={user.uid} user={user} />
 * ))
 * ```
 */
declare function usePublishedRemoteUsers(client?: IAgoraRTCClient | null): IAgoraRTCRemoteUser[];

interface AgoraRTCProviderProps {
    readonly client: IAgoraRTCClient;
    readonly children?: ReactNode;
}
declare function AgoraRTCProvider({ client, children }: AgoraRTCProviderProps): JSX.Element;
/**
 * Get a Agora RTC client from context.
 * @param client If a client is provided, it will be used instead.
 */
declare function useOptionalRTCClient(client?: IAgoraRTCClient | null): IAgoraRTCClient | null;
/**
 * Get a Agora RTC client from context. Throws error if client not found.
 * @param client If a client is provided, it will be used instead.
 */
declare function useRTCClient(client?: IAgoraRTCClient | null): IAgoraRTCClient;
interface AgoraRTCScreenShareProviderProps {
    readonly client: IAgoraRTCClient;
    readonly children?: ReactNode;
}
declare function AgoraRTCScreenShareProvider({ client, children, }: AgoraRTCScreenShareProviderProps): JSX.Element;
/**
 * Get a screen share client from context.
 * @param client If a client is provided, it will be used instead.
 */
declare function useRTCScreenShareClient(client?: IAgoraRTCClient | null): IAgoraRTCClient | null;

interface LocalAudioTrackProps {
    /**
     * A local audio track which can be created by `createMicrophoneAudioTrack()`.
     */
    readonly track?: MaybePromiseOrNull<ILocalAudioTrack>;
    /**
     * Whether to play the track.
     */
    readonly play?: boolean;
    /**
     * The volume. The value ranges from 0 (mute) to 100 (maximum). A value of 100 is the current volume.
     */
    readonly volume?: number;
    /**
     * Enable or disable the track.
     *
     * If a track is disabled, the SDK stops playing and publishing the track.
     */
    readonly disabled?: boolean;
    /**
     * Sends or stops sending the media data of the track.
     *
     * - Setting `muted` does not stop capturing audio and takes shorter time to take effect than `disabled`. For details, see [What are the differences between setEnabled and setMuted?](https://docs.agora.io/en/Interactive%20Broadcast/faq/differences_between_setenabled_and_setmuted).
     * - Do not use `disabled` and `muted` together.
     */
    readonly muted?: boolean;
    readonly children?: ReactNode;
}
/**
 * A component which plays a local audio track.
 */
declare function LocalAudioTrack({ track: maybeTrack, play, volume, disabled, muted, children, }: LocalAudioTrackProps): JSX.Element | null;

interface LocalVideoTrackProps extends HTMLProps<HTMLDivElement> {
    /**
     * A local video track which can be created by `createCameraVideoTrack()` or `createScreenVideoTrack()`.
     */
    readonly track?: MaybePromiseOrNull<ILocalVideoTrack>;
    /**
     * Whether to play the track.
     */
    readonly play?: boolean;
    /**
     * Enable or disable the track.
     *
     * If a track is disabled, the SDK stops playing and publishing the track.
     */
    readonly disabled?: boolean;
    /**
     * Sends or stops sending the media data of the track.
     *
     * - Setting `muted` does not stop capturing video and takes shorter time to take effect than `disabled`. For details, see [What are the differences between setEnabled and setMuted?](https://docs.agora.io/en/Interactive%20Broadcast/faq/differences_between_setenabled_and_setmuted).
     * - Do not use `disabled` and `muted` together.
     */
    readonly muted?: boolean;
}
/**
 * A component which renders a local video track.
 */
declare function LocalVideoTrack({ track: maybeTrack, play, disabled, muted, style, ...props }: LocalVideoTrackProps): JSX.Element;

interface MicrophoneAudioTrackProps extends LocalAudioTrackProps {
    /**
     * A microphone audio track which can be created by `createMicrophoneAudioTrack()`.
     */
    readonly track?: MaybePromiseOrNull<IMicrophoneAudioTrack>;
    /**
     * Device ID, which can be retrieved by calling `getDevices()`.
     */
    readonly deviceId?: string;
    readonly children?: ReactNode;
}
/**
 * A component which renders a microphone audio track, with device options.
 *
 * ```jsx
 * const track = useMemo(() => AgoraRTC.createMicrophoneAudioTrack(), [])
 * return <MicrophoneAudioTrack track={track} play />
 * ```
 */
declare function MicrophoneAudioTrack({ track: maybeTrack, deviceId, ...props }: MicrophoneAudioTrackProps): JSX.Element;

interface CameraVideoTrackProps extends LocalVideoTrackProps {
    /**
     * A camera video track which can be created by `createCameraVideoTrack()`.
     */
    readonly track?: MaybePromiseOrNull<ICameraVideoTrack>;
    /**
     * Device ID, which can be retrieved by calling `getDevices()`.
     */
    readonly deviceId?: string;
}
/**
 * A component which renders a camera video track, with device options.
 *
 * ```jsx
 * const track = useMemo(() => AgoraRTC.createCameraVideoTrack(), [])
 * return <CameraVideoTrack track={track} play />
 * ```
 */
declare function CameraVideoTrack({ track: maybeTrack, deviceId, ...props }: CameraVideoTrackProps): JSX.Element;

interface LocalMicrophoneAndCameraUserProps extends HTMLProps<HTMLDivElement> {
    /**
     * Whether to turn on the local user's microphone. Default false.
     */
    readonly micOn?: boolean;
    /**
     * Whether to turn on the local user's camera. Default false.
     */
    readonly cameraOn?: boolean;
    /**
     * A microphone audio track which can be created by `createMicrophoneAudioTrack()`.
     */
    readonly audioTrack?: MaybePromiseOrNull<IMicrophoneAudioTrack>;
    /**
     * A camera video track which can be created by `createCameraVideoTrack()`.
     */
    readonly videoTrack?: MaybePromiseOrNull<ICameraVideoTrack>;
    /**
     * Whether to play the local user's audio track. Default follows `micOn`.
     */
    readonly playAudio?: boolean;
    /**
     * Whether to play the local user's video track. Default follows `cameraOn`.
     */
    readonly playVideo?: boolean;
    /**
     * Device ID, which can be retrieved by calling `getDevices()`.
     */
    readonly micDeviceId?: string;
    /**
     * Device ID, which can be retrieved by calling `getDevices()`.
     */
    readonly cameraDeviceId?: string;
    /**
     * The volume. The value ranges from 0 (mute) to 1000 (maximum). A value of 100 is the current volume.
     */
    readonly volume?: number;
    /**
     * Render cover image if playVideo is off.
     */
    readonly cover?: string;
    /**
     * Children is rendered on top of the video canvas.
     */
    readonly children?: ReactNode;
}
/**
 * Play/Stop local user camera and microphone track.
 */
declare function LocalMicrophoneAndCameraUser({ micOn, cameraOn, audioTrack, videoTrack, playAudio, playVideo, micDeviceId, cameraDeviceId, volume, cover, children, style, ...props }: LocalMicrophoneAndCameraUserProps): JSX.Element;

interface LocalUserProps extends HTMLProps<HTMLDivElement> {
    /**
     * Whether to turn on the local user's microphone. Default false.
     */
    readonly micOn?: boolean;
    /**
     * Whether to turn on the local user's camera. Default false.
     */
    readonly cameraOn?: boolean;
    /**
     * A microphone audio track which can be created by `createMicrophoneAudioTrack()`.
     */
    readonly audioTrack?: MaybePromiseOrNull<ILocalAudioTrack>;
    /**
     * A camera video track which can be created by `createCameraVideoTrack()`.
     */
    readonly videoTrack?: MaybePromiseOrNull<ILocalVideoTrack>;
    /**
     * Whether to play the local user's audio track. Default follows `micOn`.
     */
    readonly playAudio?: boolean;
    /**
     * Whether to play the local user's video track. Default follows `cameraOn`.
     */
    readonly playVideo?: boolean;
    /**
     * The volume. The value ranges from 0 (mute) to 1000 (maximum). A value of 100 is the current volume.
     */
    readonly volume?: number;
    /**
     * Render cover image if playVideo is off.
     */
    readonly cover?: string;
    /**
     * Children is rendered on top of the video canvas.
     */
    readonly children?: ReactNode;
}
/**
 * Play/Stop local user camera and microphone track.
 */
declare function LocalUser({ micOn, cameraOn, audioTrack, videoTrack, playAudio, playVideo, volume, cover, children, style, ...props }: LocalUserProps): JSX.Element;

interface RemoteAudioTrackProps {
    /**
     * A remote audio track.
     */
    readonly track?: Nullable<IRemoteAudioTrack>;
    /**
     * Whether to play the track.
     */
    readonly play?: boolean;
    /**
     * Device ID, which can be retrieved by calling `getPlaybackDevices`.
     *
     * Changes of the ID will invoke `setPlaybackDevice` which sets the audio playback device, for example, the speaker.
     *
     * > `setPlaybackDevice` supports Chrome on desktop devices only. Other browsers throw a `NOT_SUPPORTED` error when calling the method.
     */
    readonly playbackDeviceId?: string;
    /**
     * The volume. The value ranges from 0 (mute) to 100 (maximum). A value of 100 is the current volume.
     */
    readonly volume?: number;
    readonly children?: ReactNode;
}
/**
 * A component which plays a remote audio track.
 */
declare function RemoteAudioTrack({ track, play, playbackDeviceId, volume, children, }: RemoteAudioTrackProps): JSX.Element | null;

interface RemoteVideoTrackProps extends HTMLProps<HTMLDivElement> {
    /**
     * A remote video track.
     */
    readonly track?: Nullable<IRemoteVideoTrack>;
    /**
     * Whether to play the track.
     */
    readonly play?: boolean;
}
/**
 * A component which renders a remote video track.
 */
declare function RemoteVideoTrack({ track, play, style, ...props }: RemoteVideoTrackProps): JSX.Element;

interface RemoteUserProps extends HTMLProps<HTMLDivElement> {
    /**
     * A remote user
     */
    readonly user?: IAgoraRTCRemoteUser;
    /**
     * Whether to play the remote user's video track. Default follows `user.hasVideo`.
     */
    readonly playVideo?: boolean;
    /**
     * Whether to play the remote user's audio track. Default follows `user.hasAudio`.
     */
    readonly playAudio?: boolean;
    /**
     * Device ID, which can be retrieved by calling `getPlaybackDevices`.
     *
     * Changes of the ID will invoke `setPlaybackDevice` which sets the audio playback device, for example, the speaker.
     *
     * > `setPlaybackDevice` supports Chrome on desktop devices only. Other browsers throw a `NOT_SUPPORTED` error when calling the method.
     */
    readonly playbackDeviceId?: string;
    /**
     * The volume. The value ranges from 0 (mute) to 100 (maximum). A value of 100 is the current volume.
     */
    readonly volume?: number;
    /**
     * Render cover image if playVideo is off.
     */
    readonly cover?: string | (() => ReactNode);
    /**
     * Children is rendered on top of the video canvas.
     */
    readonly children?: ReactNode;
}
/**
 * Subscribe and play remote user video and audio track.
 * An `IAgoraRTCRemoteUser` can only be own by one `RemoteUser`.
 */
declare function RemoteUser({ user, playVideo, playAudio, playbackDeviceId, volume, cover, style, children, ...props }: RemoteUserProps): JSX.Element;

/**
 * Delegates track stop of descendant Track Players.
 * This prevents track stops on Track Players unmounts due to re-layout.
 *
 * @example
 * ```jsx
 * <TrackBoundary>
 *   <RemoteUser user={user1} />
 *   <RemoteUser user={user2} />
 * </TrackBoundary>
 * ```
 *
 * @example
 * ```jsx
 * <TrackBoundary>
 *   <RemoteVideoTrack track={track1} />
 *   <RemoteVideoTrack track={track2} />
 * </TrackBoundary>
 * ```
 */
declare function TrackBoundary({ children }: PropsWithChildren): JSX.Element;
/**
 * Stops local or remote video track when the component unmounts.
 * If `<TrackBoundary />` exists in ancestor it will not stop track on unmount but delegates to TrackBoundary.
 */
declare function useAutoPlayVideoTrack(track: Nullable<IRemoteVideoTrack | ILocalVideoTrack>, play?: boolean, div?: HTMLElement | null): void;
/**
 * Stops local or remote audio track when the component unmounts.
 * If `<TrackBoundary />` exists in ancestor it will not stop track on unmount but delegates to TrackBoundary.
 */
declare function useAutoPlayAudioTrack(track: Nullable<IRemoteAudioTrack | ILocalAudioTrack>, play?: boolean): void;

interface RemoteVideoPlayerProps extends HTMLProps<HTMLDivElement> {
    /**
     * A remote track
     */
    readonly track?: IRemoteVideoTrack;
    /**
     * Whether to play the remote user's video track. Default follows `user.hasVideo`.
     */
    readonly playVideo?: boolean;
    /**
     * Render cover image if playVideo is off.
     */
    readonly cover?: string | (() => ReactNode);
    /**
     * Children is rendered on top of the video canvas.
     */
    readonly children?: ReactNode;
    /**
     * client instance
     */
    readonly client?: IAgoraRTCClient | null;
}
/**
 * Subscribe and play remote user video track.
 * An `IRemoteVideoTrack` can only be own by one `RemoteVideoPlayer`.
 */
declare function RemoteVideoPlayer({ track, playVideo, cover, client, style, children, ...props }: RemoteVideoPlayerProps): JSX.Element;

export { AgoraRTCError, AgoraRTCErrorCode, AgoraRTCProvider, AgoraRTCProviderProps, AgoraRTCScreenShareProvider, AgoraRTCScreenShareProviderProps, CameraVideoTrack, CameraVideoTrackProps, CheckVideoVisibleResult, FetchArgs, InspectState, Listenable, LocalAudioTrack, LocalAudioTrackProps, LocalMicrophoneAndCameraUser, LocalMicrophoneAndCameraUserProps, LocalUser, LocalUserProps, LocalVideoTrack, LocalVideoTrackProps, MicrophoneAudioTrack, MicrophoneAudioTrackProps, NetworkQuality, RemoteAudioTrack, RemoteAudioTrackProps, RemoteUser, RemoteUserProps, RemoteVideoPlayer, RemoteVideoPlayerProps, RemoteVideoTrack, RemoteVideoTrackProps, TrackBoundary, VisibleHiddenReason, applyRef, isPromise, joinOptions, listen, useAsyncEffect, useAutoJoin, useAutoPlayAudioTrack, useAutoPlayVideoTrack, useAwaited, useClientEvent, useConnectionState, useCurrentUID, useForceUpdate, useForwardRef, useIsConnected, useIsUnmounted, useIsomorphicLayoutEffect, useJoin, useLocalAudioTrack, useLocalCameraTrack, useNetworkQuality, useOptionalRTCClient, usePublish, usePublishedRemoteUsers, useRTCClient, useRTCScreenShareClient, useRemoteAudioTracks, useRemoteUserTrack, useRemoteUsers, useRemoteVideoTracks, useSafePromise, useTrackEvent, useVolumeLevel };
