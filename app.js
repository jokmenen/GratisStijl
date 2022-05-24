import Timer from "./timer.js";


const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector(".decrease-tempo")
const increaseTempoBtn = document.querySelector(".increase-tempo")
const startStopBtn = document.querySelector(".start-stop")
const tempoSlider = document.querySelector(".slider")

const clickHigh = new Audio('clickHigh.mp3')
const clickLow = new Audio('clickLow.mp3')

let bpm = 140;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;

decreaseTempoBtn.addEventListener('click', () => {
  bpm--;
  updateTempoDisplay()
  clickHigh.play()
})
increaseTempoBtn.addEventListener('click', () => {
  bpm++;
  updateTempoDisplay()
})

tempoSlider.addEventListener('input', () => {
    bpm = tempoSlider.value;
    updateTempoDisplay()
});

startStopBtn.addEventListener('click', ()=>{
    count = 0;
    if (!isRunning){
        metronome.start();
        isRunning = true;
        startStopBtn.textContent = 'STOP';
    }else{
        metronome.stop();
        isRunning = false;
        startStopBtn.textContent = 'START';
    }
})

function updateTempoDisplay(){
  if (bpm < 40){
      bpm = 40
  }
  if (bpm > 300){
      bpm = 300
  }
  tempoDisplay.textContent = bpm
  tempoSlider.value = bpm
  metronome.timeInterval = 60000 / bpm
}

function playClick() {
    if (count === beatsPerMeasure){
        count = 0;
    }
    if (count === 0 ){
        clickHigh.play()
        clickHigh.currentTime = 0;
    }
    else {
        clickLow.play()
        clickLow.currentTime = 0;
    }
    console.log(count)
    count++
}
const metronome = new Timer(playClick, 60000 / bpm, { immediate: true});