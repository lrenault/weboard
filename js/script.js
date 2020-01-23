import resumeContext from './resumeContext.js';

async function init() {
  const audioContext = new AudioContext();
  // resume audio context
  await resumeContext(audioContext);

  //const stream = await navigator.mediaDevices.getUserMedia({audio: true});
  // Suppress sound optimization of the browser
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      autoGainControl: false,
      noiseSuppression: false,
      latency: 0
    }
  });

  // Permission status
  const micStatus = await navigator.permissions.query({name: 'microphone'});
  console.log(micStatus); // state "prompt"
  // Reset permission to inital state.
  await navigator.permissions.revoke({name: 'microphone'});

  const lineInSource = context.createMediaStreamSource(stream);
  lineInSource.connect(context.destination);

  // Gain control
  const gainNode = new GainNode(context, {gain: 0.5});
  // disconnect source before constructing a new graph
  lineInSource.disconnect();
  // connect nodes
  lineInSource.connect(gainNode).connect(context.destination);

  // Increase volume
  gainNode.gain.value = 2;

}
