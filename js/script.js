// 1. declare frequency max
let freqMax = 20000;
let init = false;
let instru;

// Compressor
var comp_enable = document.querySelector('input[value="compressor"]');
var comp_thresh = document.getElementById("comp-threshold");
var comp_ratio  = document.getElementById("comp-ratio");
let compressor = new Pizzicato.Effects.Compressor({
  threshold: comp_thresh.valueAsNumber,
  ratio: comp_ratio.valueAsNumber,
});

comp_enable.onchange = function() {
  if (comp_enable.checked) {
    instru.addEffect(compressor);
  } else {
    instru.removeEffect(compressor);
  }
}

comp_thresh.oninput = function() {
  compressor.threshold = this.valueAsNumber;
  document.getElementById("comp-thresh-display").innerHTML = this.value;
}

comp_ratio.oninput = function() {
  compressor.ratio = this.valueAsNumber;
  document.getElementById("comp-ratio-display").innerHTML = this.value;
}


// disto
var disto_enable = document.querySelector('input[value="disto"]');
var disto_gain   = document.getElementById("disto-gain");
let disto = new Pizzicato.Effects.Distortion({ gain: disto_gain.valueAsNumber, });

disto_enable.onchange = function() {
  if (disto_enable.checked) {
    instru.addEffect(disto);
  } else {
    instru.removeEffect(disto);
  }
}

disto_gain.oninput = function() {
  disto.gain = this.valueAsNumber;
  document.getElementById("disto-gain-display").innerHTML = this.value;
}


// HighPassFilter
var high_pass_enable = document.querySelector('input[value="highPassFilter"]');
var high_pass_freq = document.getElementById("high-pass-freq");
var high_pass_peak = document.getElementById("high-pass-peak");
let highPassFilter = new Pizzicato.Effects.HighPassFilter({
  frequency: high_pass_freq.valueAsNumber,
  peak: high_pass_peak.valueAsNumber,
});

high_pass_enable.onchange = function() {
  if (high_pass_enable.checked) {
    instru.addEffect(highPassFilter);
  } else {
    instru.removeEffect(highPassFilter);
  }
}

high_pass_freq.oninput = function() {
  highPassFilter.frequency = this.valueAsNumber;
  document.getElementById("high-pass-freq-display").innerHTML = this.value;
}
high_pass_peak.oninput = function() {
  highPassFilter.peak = this.valueAsNumber;
  document.getElementById("high-pass-peak-display").innerHTML = this.value;
}


// Volume
var volume_ = document.getElementById("volume");
volume_.oninput = function() {
  instru.volume = this.valueAsNumber;
  document.getElementById("volume-log").innerHTML = this.value;
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
      instru.addEffect(disto);
      //instru.addEffect(highPassFilter);
      //instru.volume = volume_;
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
  var rect = event.target.getBoundingClientRect();
  var xValue = (event.clientX - rect.left) / rect.width;
  var yValue = (event.clientY - rect.top) / rect.height;

  // Disto
  if (document.getElementById('disto-gain-x').checked) {
    disto.gain = xValue;
    disto_gain.value = xValue;
    document.getElementById("disto-gain-display").innerHTML = Math.trunc(xValue * 100) / 100;
  } else if (document.getElementById('disto-gain-y').checked) {
    disto.gain = yValue;
    disto_gain.value = yValue;
    document.getElementById("disto-gain-display").innerHTML = Math.trunc(yValue * 100) / 100;
  }
  // High-Pass
  if (document.getElementById('high-pass-freq-x').checked) {
    highPassFilter.frequency = xValue * freqMax;
    high_pass_freq.value = xValue * freqMax;
    document.getElementById("high-pass-freq-display").innerHTML = Math.trunc(xValue * freqMax);
  } else if (document.getElementById('high-pass-freq-y').checked) {
    highPassFilter.frequency = yValue * freqMax;
    high_pass_freq.value = yValue * freqMax;
    document.getElementById("high-pass-freq-display").innerHTML = Math.trunc(yValue * freqMax);
  }

  //pingPongDelay.time = event.pageX / document.body.clientWidth;
  //instru.volume = event.pageX / document.body.clientWidth;
  //lowPassFilter.frequency = event.pageY / document.body.clientHeight * freqMax;

});
