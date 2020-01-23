// 1. declare frequency max
let freqMax = 20000;
let init = false;
let voice;

// 3. declare ping pong delay
let pingPongDelay = new Pizzicato.Effects.PingPongDelay({
  feedback: 0.6,
  time: 0.4,
  mix: 0.5
});

// 4. declare low pass filter
let lowPassFilter = new Pizzicato.Effects.LowPassFilter({
  frequency: 1000,
  peak: 10,
});

// 5. declare high pass filter
let highPassFilter = new Pizzicato.Effects.HighPassFilter({
  frequency: 10,
  peak: 10,
});


var instrumentConnected = document.querySelector('input[id="connectSource"]');
instrumentConnected.onchange = function() {
  if (instrumentConnected.checked) {
    instru = new Pizzicato.Sound({ source : 'input'}, function() {
      instru.play();
      instru.addEffect(pingPongDelay);
      instru.addEffect(lowPassFilter);
      instru.addEffect(highPassFilter);
    })
  } else {
    instru.stop();
  }
}

document.body.addEventListener('mousemove', function(event) {
  // 9. vary ping pong delay on X axis
  pingPongDelay.time = event.pageX / document.body.clientWidth;

  // 10. vary low pass filter on Y axis
  lowPassFilter.frequency = event.pageY / document.body.clientHeight * freqMax;

  // 11. vary high pass filter on Y axis
  highPassFilter.frequency = event.pageY / document.body.clientHeight * freqMax;
});
