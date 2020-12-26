import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import './App.css';

const PlusIcon = function() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>
  )
}

const MinusIcon = function() {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  )
}

const PlayIcon = function() {
   return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path fillRule="evenodd" d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
    </svg>
   )
};

const PauseIcon = function() {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-pause-circle" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path fillRule="evenodd" d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/>
    </svg>
  )
}

const tick = new Howl({
  src: './sounds/tink.wav'
});

// Example metronome
// 
// https://www.youtube.com/watch?v=ZK1omlZPCnY

const lightUpAnimation = keyframes`
  // 5% {
  //   filter: hue-rotate(360deg);
  //   background: radial-gradient(circle,  #0ff 0%, #e0e5ec 60%);
  // }

  0% {
    box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
    -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
    background: rgba(116, 125, 136, .2)
  }
  10% {
    box-shadow:
    -7px -7px 20px 0px #fff9,
    -4px -4px 5px 0px #fff9,
    7px 7px 20px 0px #0002,
    4px 4px 5px 0px #0001;
  }
  80% {
    background: inherit;
  }
`

// here the duration shoudl be set dynamically as the speed for the metronome
//
// user inputs number. Divide that number (bpm) by 60, and voila!



function TickLight({side, setCurrentNote, isTicking, bpm, i, timeSignature}) {
  const calculateBPM = (bpm) => (60/bpm) * (timeSignature.length);

  let animationDelay;
  // if (i === 0) {
    // animationDelay = `-${calculateBPM(bpm)/(timeSignature.length)}s`;
  // } else 
  if (i === 0) {
    animationDelay = `0s`;
  } else {
    animationDelay = `-${(calculateBPM(bpm)/(timeSignature.length)) * i}s`;
  }

  console.log(animationDelay)
  const animLength = (60/bpm) * (timeSignature.length)

  console.log(animLength);


  const TickLight = styled.span(({bpm, isTicking}) => ({
    animation: isTicking ? `${lightUpAnimation} ${animLength}s linear infinite` : 'none',
    animationDelay
  }));
  return (
    <TickLight className='forward holder' bpm={bpm} isTicking={isTicking} onAnimationIteration={() => tick.play()}>
      <div className='note'>
        <div className='ripple'></div>
      </div>
    </TickLight>
  );
}

function App() {
  const [isTicking, setIsTicking] = useState(false);
  const [bpm, setBpm] = useState(100);
  const [timeSignature, setTimeSignature] = useState(['','','',''])

  useEffect(() => {
    console.log(isTicking)
  }, [isTicking])

  return (
    <div className="App">
      <div className="container">
          <div className="button-group row space-between">
            {timeSignature.map((x, i) => {
              return <TickLight side="left" i={i} isTicking={isTicking} bpm={bpm} timeSignature={timeSignature}/>
            }).reverse()}
          </div>

          <div className="button-group row space-between">
            
            <div className={`bpm-container button ${isTicking ? 'pressed' : ''}`}>
              <span className='bpm-span'>{bpm}</span>
              <span className='bpm-span'>BPM</span>
            </div>

            <div className={`bpm-container button ${isTicking ? 'pressed' : ''}`}>
              <span className='bpm-span'>{timeSignature.length}</span>
              <span className='bpm-span'>Pulses</span>
            </div>

            <button className={`button ${isTicking ? 'pressed' : ''}`} onClick={() => setIsTicking(!isTicking)}>{isTicking ? <PauseIcon /> : <PlayIcon/> }</button>

          </div>
          <div className="button-group row space-between">
              <button className="button" onClick={() => bpm > 40 ? setBpm(Number(bpm-1)) : null}><MinusIcon/></button>
              <div>
                <input type="range" id="bpm-dial" name="bpm-dial" min="40" max="250" step="1" onChange={(e) => setBpm(Number(e.target.value))} value={bpm} />
              </div>
              <button className="button" onClick={() => bpm < 250 ? setBpm(Number(bpm+1)) : null }><PlusIcon /></button>
          </div>

          <div className="button-group row space-between">
              <button className="button" onClick={() => timeSignature.length > 2 ? setTimeSignature(new Array(timeSignature.length-1).fill('')) : null}><MinusIcon/></button>
              <div>  
                <input type="range" id="time-signature-dial" name="time-signature-dial" min="2" max="6" step="1" onChange={(e) => setTimeSignature(new Array(Number(e.target.value)).fill(''))} value={timeSignature.length} />
              </div>
              <button className="button" onClick={() => timeSignature.length < 6 ? setTimeSignature(new Array(timeSignature.length+1).fill('')) : null }><PlusIcon /></button>
          </div>

      </div>
      <div className="container-waves-1"></div>
      <div className="container-waves-2"></div>
    </div>
  );
}

export default App;
