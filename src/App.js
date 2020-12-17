import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import './App.css';



const PlayIcon = function() {
   return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path fillRule="evenodd" d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
    </svg>
   )
};

const PauseIcon = function() {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pause-circle" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path fillRule="evenodd" d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/>
    </svg>
  )
}

const snare = new Howl({
  src: './sounds/snare.wav'
});

// Example metronome
// 
// https://www.youtube.com/watch?v=ZK1omlZPCnY

const lightUpAnimation = keyframes`
  0% {
    background: #FCD7D6;
  }
  30% {
    background: #F36E6B;
  }
`

// here the duration shoudl be set dynamically as the speed for the metronome
//
// user inputs number. Divide that number (bpm) by 60, and voila!

const calculateBPM = (bpm) => (60/bpm) * 2;

function TickLight({side, setCurrentNote, isTicking, bpm}) {
  const TickLight = styled.span(({bpm, isTicking, i}) => ({
    animation: isTicking ? `${lightUpAnimation} ${calculateBPM(bpm)}s linear infinite` : 'none',
    animationDelay: side === "left" ? "0s" : `-${calculateBPM(bpm)/2}s`
  }));
  return(
    <TickLight className='forward holder' bpm={bpm} side={side} isTicking={isTicking} onAnimationIteration={() => snare.play()}>
      <div className='note'>
        <div className='ripple'></div>
      </div>
    </TickLight>
  );
}

function App() {
  const [isTicking, setIsTicking] = useState(false);
  const [bpm, setBpm] = useState('');

  useEffect(() => {
    console.log(isTicking)
  }, [isTicking])

  return (
    <div className="App">
      <div className="forward">
        <TickLight side="left" isTicking={isTicking} bpm={bpm}/>
        <TickLight side="right" isTicking={isTicking} bpm={bpm}/>
      </div>
  <div><pre>BPM: {bpm}</pre></div>
  <div><button onClick={() => setIsTicking(!isTicking)}>{isTicking ? <PauseIcon /> : <PlayIcon/> }</button></div>
      <div>
          <input type="range" id="bpm-dial" name="bpm-dial" min="0" max="210" step="1" onChange={(e) => setBpm(Number(e.target.value) + 40)} />
      </div>
    </div>
  );
}

export default App;
