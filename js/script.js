// 1. declare frequency max
let freqMax = 20000;
let init = false;
let instru;

// Compressor
var comp_thresh = document.getElementById("comp-threshold");
var comp_ratio  = document.getElementById("comp-ratio");

var comp_thresh_log = document.getElementById("")

let compressor = new Pizzicato.Effects.Compressor({
  threshold: comp_thresh.value,
  ratio: comp_ratio.value
});

comp_thresh.oninput = function() {
  compressor.threshold = this.value;
  console.log(this.value);
}


// Distorsion
let distortion = new Pizzicato.Effects.Distortion({
  gain: 0.4
});

// Fuzz
let fuzz = new Pizzicato.Effects.Quadrafuzz({
  lowGain: 0.6,
  midLowGain: 0.8,
  midHighGain: 0.5,
  highGain: 0.6,
  mix: 1.0
});

let lowPassFilter = new Pizzicato.Effects.LowPassFilter({
  frequency: 1000,
  peak: 10,
});

// HighPassFilter
var high_pass_freq = document.getElementById("high-pass-freq");
var high_pass_peak = document.getElementById("high-pass-peak");
let highPassFilter = new Pizzicato.Effects.HighPassFilter({
  frequency: 10,
  peak: 10,
});
high_pass_freq.oninput = function() {
  highPassFilter.frequency = this.value;
  console.log(this.value);
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


// Instrument and volume
var volume_ = document.getElementById("volume");
var vol_log = document.getElementById("volume-log");
volume_.oninput = function() {
  vol_log.innerHTML = this.value;
}

var instrumentConnected = document.querySelector('input[value="connectSource"]');
instrumentConnected.onchange = function() {
  if (instrumentConnected.checked) {
    Pizzicato.context.resume();
    console.log(Pizzicato.context);

    instru = new Pizzicato.Sound({ source : 'input'}, function() {
      console.log("Connected");
      instru.addEffect(highPassFilter);

      instru.play();
    })
  } else {
    console.log("Unplugged");
    instru.stop();
  }
}

document.body.addEventListener('mousemove', function(event) {
  // 9. vary ping pong delay on X axis
  pingPongDelay.time = event.pageX / document.body.clientWidth;
  //instru.volume = event.pageX / document.body.clientWidth;
  // 10. vary low pass filter on Y axis
  lowPassFilter.frequency = event.pageY / document.body.clientHeight * freqMax;

  // 11. vary high pass filter on Y axis
  //highPassFilter.frequency = event.pageY / document.body.clientHeight * freqMax;
});
