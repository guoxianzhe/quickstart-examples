
/**
 * @license agora-rtc-react
 * @version 0.0.1
 *
 * Copyright (c) Agora, Inc.
 *
 * This source code is licensed under the MIT license.
 */

"use strict";var AgoraRTCReact=(()=>{var Oe=Object.create;var Y=Object.defineProperty;var Fe=Object.getOwnPropertyDescriptor;var _e=Object.getOwnPropertyNames;var Be=Object.getPrototypeOf,He=Object.prototype.hasOwnProperty;var Z=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports),je=(e,r)=>{for(var o in r)Y(e,o,{get:r[o],enumerable:!0})},Re=(e,r,o,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let n of _e(r))!He.call(e,n)&&n!==o&&Y(e,n,{get:()=>r[n],enumerable:!(t=Fe(r,n))||t.enumerable});return e};var f=(e,r,o)=>(o=e!=null?Oe(Be(e)):{},Re(r||!e||!e.__esModule?Y(o,"default",{value:e,enumerable:!0}):o,e)),Qe=e=>Re(Y({},"__esModule",{value:!0}),e);var A=Z((Er,ge)=>{ge.exports=React});var ce=Z((Dr,Ae)=>{Ae.exports=AgoraRTC});var Ee=Z(K=>{"use strict";var Ye=A(),Ze=Symbol.for("react.element"),ze=Symbol.for("react.fragment"),Ke=Object.prototype.hasOwnProperty,Xe=Ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,er={key:!0,ref:!0,__self:!0,__source:!0};function xe(e,r,o){var t,n={},s=null,l=null;o!==void 0&&(s=""+o),r.key!==void 0&&(s=""+r.key),r.ref!==void 0&&(l=r.ref);for(t in r)Ke.call(r,t)&&!er.hasOwnProperty(t)&&(n[t]=r[t]);if(e&&e.defaultProps)for(t in r=e.defaultProps,r)n[t]===void 0&&(n[t]=r[t]);return{$$typeof:Ze,type:e,key:s,ref:l,props:n,_owner:Xe.current}}K.Fragment=ze;K.jsx=xe;K.jsxs=xe});var g=Z((Vr,Ne)=>{"use strict";Ne.exports=Ee()});var br={};je(br,{AgoraRTCProvider:()=>rr,AgoraRTCReactError:()=>y,AgoraRTCScreenShareProvider:()=>tr,LocalAudioTrack:()=>pe,LocalUser:()=>yr,LocalVideoTrack:()=>fe,RemoteAudioTrack:()=>me,RemoteUser:()=>Ir,RemoteVideoTrack:()=>Ce,TrackBoundary:()=>vr,VERSION:()=>kr,applyRef:()=>be,compareVersion:()=>se,isPromise:()=>Ie,listen:()=>v,useAsyncEffect:()=>U,useAutoPlayAudioTrack:()=>J,useAutoPlayVideoTrack:()=>q,useAwaited:()=>W,useClientEvent:()=>Je,useConnectionState:()=>ir,useCurrentUID:()=>lr,useForceUpdate:()=>We,useForwardRef:()=>qe,useIsConnected:()=>D,useIsUnmounted:()=>h,useIsomorphicLayoutEffect:()=>F,useJoin:()=>sr,useLocalCameraTrack:()=>pr,useLocalMicrophoneTrack:()=>fr,useNetworkQuality:()=>ar,usePublish:()=>Tr,useRTCClient:()=>x,useRTCScreenShareClient:()=>nr,useRemoteAudioTracks:()=>ur,useRemoteUserTrack:()=>ee,useRemoteUsers:()=>mr,useRemoteVideoTracks:()=>dr,useSafePromise:()=>ke,useTrackEvent:()=>Ge,useVolumeLevel:()=>cr});function v(e,r,o){return e.on(r,o),()=>e.off(r,o)}var k=f(A());function $e(e){try{return e()}catch(r){console.error(r)}}function P(e){return()=>e.forEach($e)}function ye(e,r){let o=setInterval(e,r);return()=>clearInterval(o)}function H(e,r){let o=setTimeout(e,r);return()=>clearTimeout(o)}function z(){let e,r,o;function t(){if(r){let d=r;r=void 0,d()}}async function n(){if(o){let d=o;o=void 0;try{await d()}catch(u){console.error(u)}}}async function s(d){e=!0,await n();try{o=await d()}catch(u){console.error(u)}e=!1,t()}async function l(){e=!0,await n(),e=!1,t()}function T(d){e?r=()=>s(d):s(d)}function p(){e?r=l:l()}return{run:T,dispose:p}}var F=typeof document<"u"?k.useLayoutEffect:k.useEffect;function Ie(e){return e!=null&&typeof e.then=="function"}function We(){let[e,r]=(0,k.useState)(0);return(0,k.useCallback)(()=>r(o=>o+1|0),[])}function h(){let e=(0,k.useRef)(!1);return(0,k.useEffect)(()=>(e.current=!1,()=>{e.current=!0}),[]),e}function ke(){let e=h();function r(o,t){return new Promise(async(n,s)=>{try{let l=await o;e.current||n(l)}catch(l){e.current?t&&t(l):s(l)}})}return(0,k.useCallback)(r,[e])}function be(e,r){typeof e=="function"?e(r):typeof e=="object"&&e&&(e.current=r)}function qe(e){let[r,o]=(0,k.useState)(null),t=(0,k.useCallback)(n=>{o(n),be(e,n)},[e,o]);return[r,t]}function W(e){let r=ke(),[o,t]=(0,k.useState)();return F(()=>{Ie(e)?r(e).then(t):t(e)},[e,r]),o}function U(e,r){let o=(0,k.useRef)();(0,k.useEffect)(()=>{let{run:t,dispose:n}=o.current||=z();return t(e),n},r)}function se(e,r){let o=e.split("."),t=r.split("."),n=Math.max(o.length,t.length);for(let s=0;s<n;s++){let l=parseInt(o[s]||"0"),T=parseInt(t[s]||"0");if(l>T)return 1;if(l<T)return-1}return 0}var j=f(A());function Je(e,r,o){let t=(0,j.useRef)(o);F(()=>{t.current=o},[o]),(0,j.useEffect)(()=>{if(e)return v(e,r,(...n)=>{t.current&&t.current(...n)})},[r,e])}function Ge(e,r,o){let t=(0,j.useRef)(o);F(()=>{t.current=o},[o]),(0,j.useEffect)(()=>{if(e)return v(e,r,(...n)=>{t.current&&t.current(...n)})},[r,e])}var X=f(ce()),m=f(A());var y=class extends Error{rtcMethod;rtcError;name="AgoraRTCReactException";constructor(r,o){typeof o=="string"?super(o):super(o.message),this.rtcMethod=r,this.rtcError=o}log(r){console[r](this)}};var N=f(A());var Q=f(A()),ue=f(g()),he=(0,Q.createContext)(null);function rr({client:e,children:r}){return(0,ue.jsx)(he.Provider,{value:e,children:r})}function or(e){let r=(0,Q.useContext)(he);return e||r}function x(e){let r=or(e);if(!r)throw new Error("Agora RTC client not found. Should be wrapped in <AgoraRTCProvider value={client} />");return r}var Se=(0,Q.createContext)(null);function tr({client:e,children:r}){return(0,ue.jsx)(Se.Provider,{value:e,children:r})}function nr(e){let r=(0,Q.useContext)(Se);return e||r}function ir(e){let r=x(e),[o,t]=(0,N.useState)(r?r.connectionState:"DISCONNECTED");return(0,N.useEffect)(()=>{if(r){t(r.connectionState);let n;return P([v(r,"connection-state-change",s=>{n?.(),s==="CONNECTED"?n=H(()=>t(s),0):t(s)}),()=>n?.()])}else t("DISCONNECTED")},[r]),o}function D(e){let r=x(e),[o,t]=(0,N.useState)(r?r.connectionState==="CONNECTED":!1);return(0,N.useEffect)(()=>{if(r){t(r.connectionState==="CONNECTED");let n;return P([v(r,"connection-state-change",s=>{n?.(),n=H(()=>t(s==="CONNECTED"),0)}),()=>n?.()])}else t(!1)},[r]),o}function lr(e){let r=x(e),[o,t]=(0,N.useState)(r?.uid);return(0,N.useEffect)(()=>{if(r)return v(r,"connection-state-change",n=>{if(n==="CONNECTED")return H(()=>t(r.uid),0);n==="DISCONNECTED"&&t(void 0)})},[r]),o}var Le=()=>({uplink:0,downlink:0,delay:0});function ar(e){let r=x(e),[o,t]=(0,N.useState)(Le);return(0,N.useEffect)(()=>{if(r)return v(r,"network-quality",n=>t({uplink:n.uplinkNetworkQuality,downlink:n.downlinkNetworkQuality,delay:r.getRTCStats().RTT??0}));t(Le())},[r]),o}function sr(e,r=!0,o){let t=x(o),n=D(o),[s,l]=(0,N.useState)(!1),[T,p]=(0,N.useState)(0),[d,u]=(0,N.useState)(null),c=h();return U(async()=>{if(c.current||(u(null),p(0),l(!1)),r&&t){try{c.current||l(!0);let{appid:R,channel:I,token:E,uid:i}=typeof e=="function"?await e():e,a=await t.join(R,I,E,i);c.current||p(a)}catch(R){console.error(R),c.current||u(new y("IAgoraRTCClient.join",R))}return c.current||l(!1),()=>{for(let R of t.localTracks)R.isPlaying&&R.stop(),R.close();return t.leave()}}},[r,o]),{data:T,isLoading:s,isConnected:n,error:d}}function ee(e,r,o){let t=x(o),n=r==="audio"?"audioTrack":"videoTrack",[s,l]=(0,m.useState)(e&&e[n]),T=D(),p=(0,m.useRef)(),[d,u]=(0,m.useState)(!1),[c,R]=(0,m.useState)(null);return(0,m.useEffect)(()=>{if(!e||!T)return;let I=!1;I||R(null);let E=r==="audio"?"hasAudio":"hasVideo",i=e.uid,a=async(b,O)=>{if(b[n]&&t.remoteUsers.some(({uid:L})=>b.uid===L))try{I||u(!0),await t.unsubscribe(b,O)}catch(L){I||R(new y("IAgoraRTCClient.unsubscribe",L)),console.error(L)}I||(l(void 0),u(!1))},C=async(b,O)=>{try{!b[n]&&t.remoteUsers.some(({uid:L})=>b.uid===L)&&(I||u(!0),await t.subscribe(b,O)),I||l(b[n])}catch(L){I||R(new y("IAgoraRTCClient.subscribe",L)),console.error(L)}I||u(!1)},w=p.current||=z();return!e[n]&&e[E]?w.run(()=>C(e,r)):l(e[n]),P([()=>{I=!0,w.dispose()},v(t,"user-published",(b,O)=>{b.uid===i&&O===r&&w.run(()=>C(b,r))}),v(t,"user-unpublished",(b,O)=>{b.uid===i&&O===r&&w.run(()=>a(b,r))})])},[T,t,e,r,n]),{track:s,isLoading:d,error:c}}function cr(e){let[r,o]=(0,m.useState)(0);return(0,m.useEffect)(()=>{if(e)return ye(()=>{o(e.getVolumeLevel())},1e3)},[e]),r}function ur(e,r){let o=x(r),[t,n]=(0,m.useState)([]),s=D(),l=(0,m.useRef)([]),[T,p]=(0,m.useState)(!1),[d,u]=(0,m.useState)(null),c=h();return U(async()=>{if(c.current||u(null),!Array.isArray(e)||!s)return;let R=async i=>{if(!i.audioTrack&&e.some(({uid:a})=>i.uid===a)){try{c.current||p(!0),await o.subscribe(i,"audio")}catch(a){console.error(a),c.current||u(new y("IAgoraRTCClient.subscribe",a))}i.audioTrack&&!l.current.some(a=>a.getUserId()===i.uid)&&l.current.push(i.audioTrack),l.current=l.current.map(a=>i.audioTrack&&a.getUserId()===i.uid&&a.getTrackId()!==i.audioTrack.getTrackId()?i.audioTrack:a),c.current||(n(l.current),p(!1))}},I=async i=>{if(e.some(({uid:a})=>i.uid===a)){c.current||(l.current=l.current.filter(a=>a.getUserId()!==i.uid),n(l.current));try{c.current||p(!0),await o.unsubscribe(i,"audio")}catch(a){console.error(a),c.current||u(new y("IAgoraRTCClient.unsubscribe",a))}c.current||p(!1)}};e.map(i=>{!i.audioTrack&&i.hasAudio&&R(i)});let E=[];for(let i=0;i<l.current.length;i++){let a=l.current[i];if(!e.some(C=>C.uid===a.getUserId())){let C=o.remoteUsers.find(w=>w.uid===a.getUserId());C&&(E.push({user:C,mediaType:"audio"}),l.current.splice(i,1),i--)}}if(E.length>0){try{c.current||p(!0),await o.massUnsubscribe(E)}catch(i){console.error(i),c.current||u(new y("IAgoraRTCClient.massUnsubscribe",i))}c.current||(n(l.current.slice()),p(!1))}return P([v(o,"user-published",(i,a)=>{e.find(C=>C.uid===i.uid)&&a==="audio"&&R(i)}),v(o,"user-unpublished",(i,a)=>{e.find(C=>C.uid===i.uid)&&a==="audio"&&I(i)})])},[s,o,e]),{audioTracks:t,isLoading:T,error:d}}function dr(e,r){let o=x(r),[t,n]=(0,m.useState)([]),s=D(),l=(0,m.useRef)([]),[T,p]=(0,m.useState)(!1),[d,u]=(0,m.useState)(null),c=h();return U(async()=>{if(c.current||u(null),!Array.isArray(e)||!s)return;let R=async i=>{if(!i.videoTrack&&e.some(({uid:a})=>i.uid===a)){try{c.current||p(!0),await o.subscribe(i,"video")}catch(a){console.error(a),c.current||u(new y("IAgoraRTCClient.subscribe",a))}i.videoTrack&&!l.current.some(a=>a.getUserId()===i.uid)&&l.current.push(i.videoTrack),l.current=l.current.map(a=>i.videoTrack&&a.getUserId()===i.uid&&a.getTrackId()!==i.videoTrack.getTrackId()?i.videoTrack:a),c.current||(n(l.current),p(!1))}},I=async i=>{if(e.some(({uid:a})=>i.uid===a)){c.current||(l.current=l.current.filter(a=>a.getUserId()!==i.uid),n(l.current));try{c.current||p(!0),await o.unsubscribe(i,"video")}catch(a){console.error(a),c.current||u(new y("IAgoraRTCClient.unsubscribe",a))}c.current||p(!1)}};e.map(i=>{!i.videoTrack&&i.hasVideo&&R(i)});let E=[];for(let i=0;i<l.current.length;i++){let a=l.current[i];if(!e.some(C=>C.uid===a.getUserId())){let C=o.remoteUsers.find(w=>w.uid===a.getUserId());C&&(E.push({user:C,mediaType:"video"}),l.current.splice(i,1),i--)}}if(E.length>0){try{c.current||p(!0),await o.massUnsubscribe(E)}catch(i){console.error(i),c.current||u(new y("IAgoraRTCClient.massUnsubscribe",i))}c.current||(n(l.current.slice()),p(!1))}return P([v(o,"user-published",(i,a)=>{e.find(C=>C.uid===i.uid)&&a==="video"&&R(i)}),v(o,"user-unpublished",(i,a)=>{e.find(C=>C.uid===i.uid)&&a==="video"&&I(i)})])},[s,o,e]),{videoTracks:t,isLoading:T,error:d}}function pr(e=!0,r){let o=D(r),[t,n]=(0,m.useState)(null),[s,l]=(0,m.useState)(!1),[T,p]=(0,m.useState)(null),d=h();return U(async()=>{if(d.current||(l(!1),p(null)),o&&e&&!t){try{d.current||l(!0);let u=await X.default.createCameraVideoTrack();d.current||n(u)}catch(u){console.error(u),d.current||p(new y("IAgoraRTC.createCameraVideoTrack",u))}d.current||l(!1)}!o&&!d.current&&n(null)},[o,e]),{localCameraTrack:t,isLoading:s,error:T}}function fr(e=!0,r={ANS:!0,AEC:!0},o){let t=D(o),[n,s]=(0,m.useState)(null),[l,T]=(0,m.useState)(!1),[p,d]=(0,m.useState)(null),u=h();return U(async()=>{if(t&&e&&!n){try{u.current||T(!0);let c=await X.default.createMicrophoneAudioTrack(r);u.current||s(c)}catch(c){console.error(c),u.current||d(new y("IAgoraRTC.createMicrophoneAudioTrack",c))}u.current||T(!1)}!t&&!u.current&&s(null)},[t,e]),{localMicrophoneTrack:n,isLoading:l,error:p}}function Tr(e,r=!0,o){let t=x(o),n=D(o),s=(0,m.useRef)([]),[l,T]=(0,m.useState)(!1),[p,d]=(0,m.useState)(null),u=h();return U(async()=>{if(u.current||(T(!1),d(null)),!t||!n||!r)return;let c=e.filter(Boolean),R=i=>{let a=se(X.default.VERSION,"4.18.1")>=0;return a||new y("usePublish","please check your agora-rtc-sdk-ng version in package.json, it's recommend upgrade to >= 4.18.1").log("warn"),a?t.mode!=="live"||t.role!=="audience":!0},I=i=>s.current.some(a=>a&&a.getTrackId()===i.getTrackId()),E=i=>R(i)&&i.enabled&&r&&!I(i);for(let i=0;i<c.length;i++){let a=c[i];if(a&&E(a)){try{u.current||T(!0),await t.publish(a)}catch(C){console.error(C),u.current||d(new y("IAgoraRTCClient.publish",C))}u.current||T(!1)}}s.current=c},[n,r,t,e]),{isLoading:l,error:p}}var re=f(A());function mr(e){let r=x(e),[o,t]=(0,re.useState)(r?r.remoteUsers:[]);return(0,re.useEffect)(()=>{if(r){let n=()=>t(r.remoteUsers.slice());return P([v(r,"user-joined",n),v(r,"user-left",n),v(r,"user-published",n),v(r,"user-unpublished",n)])}},[r]),o}var oe=f(A());var S=f(A());var Pe=f(g());function Cr(){let e=new Map,r=1500;return{onMount:o=>{let t=e.get(o);t&&(t(),e.delete(o))},onUnmount:o=>{let t=e.get(o);t&&t(),e.set(o,H(()=>{o.isPlaying&&o.stop(),e.delete(o)},r))},dispose:()=>{for(let[o,t]of e)o.isPlaying&&o.stop(),t&&t();e.clear()}}}var de=(0,S.createContext)(void 0);function vr({children:e}){let[r]=(0,S.useState)(Cr);return(0,S.useEffect)(()=>r.dispose,[r]),(0,Pe.jsx)(de.Provider,{value:r,children:e})}function q(e,r,o){let t=(0,S.useContext)(de);(0,S.useEffect)(()=>{if(e)return o&&r?e.play(o):e.stop(),t?(t.onMount(e),()=>t.onUnmount(e)):()=>{e.isPlaying&&e.stop()}},[e,o,r,t])}function J(e,r){let o=(0,S.useContext)(de);F(()=>{if(e)return r?e.play():e.stop(),o?(o.onMount(e),()=>o.onUnmount(e)):()=>{e.isPlaying&&e.stop()}},[e,r,o])}var te=f(g());function pe({track:e,play:r=!1,volume:o,disabled:t,muted:n,children:s}){let l=W(e);return J(l,r),(0,oe.useEffect)(()=>{l&&o!=null&&l.setVolume(o)},[l,o]),(0,oe.useEffect)(()=>{l&&t!=null&&l.setEnabled(!t).catch(console.warn)},[t,l]),(0,oe.useEffect)(()=>{l&&n!=null&&l.setMuted(n).catch(console.warn)},[n,l]),s?(0,te.jsx)(te.Fragment,{children:s}):null}var G=f(A());var Ue=f(A()),ne={position:"relative",width:"100%",height:"100%",overflow:"hidden",background:"#000"},ie={width:"100%",height:"100%"},$={position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden",zIndex:2},M=(e,r)=>(0,Ue.useMemo)(()=>({...e,...r}),[e,r]);var De=f(g());function fe({track:e,play:r,disabled:o,muted:t,style:n,...s}){let l=M(ie,n),[T,p]=(0,G.useState)(null),d=W(e);return q(d,r,T),(0,G.useEffect)(()=>{d&&o!=null&&d.setEnabled(!o).catch(console.warn)},[o,d]),(0,G.useEffect)(()=>{d&&t!=null&&d.setMuted(t).catch(console.warn)},[t,d]),(0,De.jsx)("div",{...s,ref:p,style:l})}var V=f(g()),Rr={width:"100%",height:"100%",background:"#1a1e21 center/cover no-repeat",filter:"blur(16px) brightness(0.4)"},gr={position:"absolute",top:"50%",left:"50%",maxWidth:"50%",maxHeight:"50%",aspectRatio:"1",transform:"translate(-50%, -50%)",borderRadius:"50%",overflow:"hidden",objectFit:"cover"};function le({cover:e}){return(0,V.jsx)("div",{style:$,children:typeof e=="string"?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)("div",{style:{...Rr,backgroundImage:`url(${e})`}}),(0,V.jsx)("img",{src:e,style:gr})]}):e()})}var _=f(g());function yr({micOn:e,cameraOn:r,audioTrack:o,videoTrack:t,playAudio:n,playVideo:s,volume:l,cover:T,children:p,style:d,...u}){let c=M(ne,d);return s=s??!!r,n=n??!!e,(0,_.jsxs)("div",{...u,style:c,children:[(0,_.jsx)(fe,{disabled:!r,play:s,track:t}),(0,_.jsx)(pe,{disabled:!e,play:n,track:o,volume:l}),T&&!r&&(0,_.jsx)(le,{cover:T}),(0,_.jsx)("div",{style:$,children:p})]})}var Te=f(A());var ae=f(g());function me({track:e,play:r=!1,playbackDeviceId:o,volume:t,children:n}){return J(e,r),(0,Te.useEffect)(()=>{e&&o!=null&&e.setPlaybackDevice(o).catch(console.warn)},[e,o]),(0,Te.useEffect)(()=>{e&&t!=null&&e.setVolume(t)},[e,t]),n?(0,ae.jsx)(ae.Fragment,{children:n}):null}var we=f(A());var Me=f(g());function Ce({track:e,play:r,style:o,...t}){let n=M(ie,o),[s,l]=(0,we.useState)(null);return q(e,r,s),(0,Me.jsx)("div",{...t,ref:l,style:n})}var B=f(g());function Ir({user:e,playVideo:r,playAudio:o,playbackDeviceId:t,volume:n,cover:s,style:l,children:T,...p}){let d=M(ne,l),{track:u}=ee(e,"video"),{track:c}=ee(e,"audio");return r=r??e?.hasVideo,o=o??e?.hasAudio,(0,B.jsxs)("div",{...p,style:d,children:[(0,B.jsx)(Ce,{play:r,track:u}),(0,B.jsx)(me,{play:o,playbackDeviceId:t,track:c,volume:n}),s&&!r&&(0,B.jsx)(le,{cover:s}),(0,B.jsx)("div",{style:$,children:T})]})}var Ve=f(ce()),ve=class{appType=1001;constructor(){Ve.default.setAppType(this.appType)}};new ve;var kr="1.1.0";return Qe(br);})();
/*! Bundled license information:

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
