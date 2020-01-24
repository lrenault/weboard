// 1. declare frequency max
let freqMax = 20000;
let init = false;
let instru;

// Compressor
var comp_enable = document.querySelector('input[value="compressor"]');
var comp_thresh = document.getElementById("comp-threshold");
var comp_ratio  = document.getElementById("comp-ratio");

let compressor = new Pizzicato.Effects.Compressor({
  threshold: comp_thresh,
  ratio: comp_ratio,
});

comp_enable.onchange = function() {
  if (comp_enable.checked) {
    instru.addEffect(compressor);
  } else {
    instru.removeEffect(compressor);
  }
}

comp_thresh.oninput = function() {
  compressor.threshold = this;
  document.getElementById("comp-thresh-display").innerHTML = this.value;
}

// Fuzz
var fuzz_enable = document.querySelector('input[value="fuzz"]');
let fuzz = new Pizzicato.Effects.Quadrafuzz({
  lowGain: 0.6,
  midLowGain: 0.8,
  midHighGain: 0.5,
  highGain: 0.6,
  mix: 1.0
});

fuzz_enable.onchange = function() {
  if (fuzz_enable.checked) {
    instru.addEffect(fuzz);
  } else {
    instru.removeEffect(fuzz);
  }
}

// HighPassFilter
var high_pass_enable = document.querySelector('input[value="highPassFilter"]');
var high_pass_freq = document.getElementById("high-pass-freq");
var high_pass_peak = document.getElementById("high-pass-peak");

let highPassFilter = new Pizzicato.Effects.HighPassFilter({
  frequency: high_pass_freq,
  peak: high_pass_peak,
});

high_pass_enable.onchange = function() {
  if (high_pass_enable.checked) {
    instru.addEffect(highPassFilter);
  } else {
    instru.removeEffect(highPassFilter);
  }
}

high_pass_freq.addEventListener("input", function() {
  highPassFilter.frequency = high_pass_freq.value;
})

high_pass_freq.oninput = function() {
  highPassFilter.frequency = this.value;
  document.getElementById("high-pass-freq-display").innerHTML = this.value;
}
high_pass_peak.oninput = function() {
  highPassFilter.peak = this.value;
  document.getElementById("high-pass-peak-display").innerHTML = this.value;
}

// Instrument and volume
var volume_ = document.getElementById("volume");
volume_.oninput = function() {
  document.getElementById("volume-log").innerHTML = this.value;
  instru.volume = this;
}

// PingPongDelay
let pingPongDelay = new Pizzicato.Effects.PingPongDelay({
  feedback: 0.6,
  time: 0.4,
  mix: 0.5
});

// Reverb
let reverb = new Pizzicato.Effects.Reverb({
  time: 0.01,
  decay: 0.01,
  reverse: false,
  mix: 0.5
});

// Plug the instrument
var instrumentConnected = document.querySelector('input[value="connectSource"]');
instrumentConnected.onchange = function() {
  if (instrumentConnected.checked) {
    // resume context
    Pizzicato.context.resume();
    console.log(Pizzicato.context);

    instru = new Pizzicato.Sound({ source : 'input'}, function() {
      instru.addEffect(highPassFilter);
      instru.play();
      console.log("Connected");
    });
  } else {
    instru.stop();
    console.log("Unplugged");
  }
}

// Kaos-Pad
kaosPad = document.getElementById("kaos-pad");
kaosPad.addEventListener('mousemove', function(event) {
  //pingPongDelay.time = event.pageX / document.body.clientWidth;
  //instru.volume = event.pageX / document.body.clientWidth;
  //lowPassFilter.frequency = event.pageY / document.body.clientHeight * freqMax;
  //freq = Math.log((kaosPad.offsetWidth + kaosPad.offsetLeft) - event.clientX) * freqMax;
  highPassFilter.frequency = freq;
  console.log(freq);
});
