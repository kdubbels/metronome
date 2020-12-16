import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import './App.css';

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

// function LeftTickLight({side, setCurrentNote, isTicking, bpm}) {
//   const TickLight = styled.span(({bpm, isTicking, i}) => ({
//     animation: isTicking ? `${lightUpAnimation} ${calculateBPM(bpm)}s linear infinite` : 'none',
//     animationDelay: '0s'
//   }));
//   return(
//     <TickLight className='forward holder' bpm={bpm} side={side} isTicking={isTicking} onAnimationIteration={() => snare.play()}>
//       <div className='note'>
//         <div className='ripple'></div>
//       </div>
//     </TickLight>
//   );
// }

// function RightTickLight({side, setCurrentNote, isTicking, bpm}) {
//   const TickLight = styled.span(({bpm, isTicking, i}) => ({
//     animation: isTicking ? `${lightUpAnimation} ${calculateBPM(bpm)}s linear infinite` : 'none',
//     animationDelay: `${calculateBPM(bpm)/2}s`
//   }));
//   return(
//     <TickLight className='forward holder' bpm={bpm} side={side} isTicking={isTicking} onAnimationIteration={() => snare.play()}>
//       <div className='note'>
//         <div className='ripple'></div>
//       </div>
//     </TickLight>
//   );
// }

function TickLight({side, setCurrentNote, isTicking, bpm}) {
  const TickLight = styled.span(({bpm, isTicking, i}) => ({
    animation: isTicking ? `${lightUpAnimation} ${calculateBPM(bpm)}s linear infinite` : 'none',
    animationDelay: side === "left" ? "0s" : `${calculateBPM(bpm)/2}s`
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
  const [bpm, setBpm] = useState(120);

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
      <div><button onClick={() => setIsTicking(!isTicking)}>Start/Stop</button></div>
      <div>
          <input type="range" id="bpm-dial" name="bpm-dial" min="40" max="250" onChange={(e) => setBpm(e.target.value)} />
      </div>
    </div>
  );
}

export default App;
