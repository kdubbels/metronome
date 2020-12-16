/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { jsx, css, keyframes } from '@emotion/react'

import './App.css';

// Example metronome
// 
// https://www.youtube.com/watch?v=ZK1omlZPCnY

const line = keyframes`
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

const forward = css`
  animation: ${line} .5s linear infinite;
    `

function Holder({i, setCurrentNote}) {
  return(
    <span className='holder' css={forward} data-note={i} onAnimationIteration={() => setCurrentNote(i)}>
      <div className='note'>
        <div className='ripple'></div>
      </div>
  </span>
  )
}

const notes = new Array(2).fill(null).map((x,i) => x = i);

const snare = new Howl({
  src: './sounds/snare.wav'
});

function App() {
  const [note, setNote] = useState(null);
  useEffect(() => {
    if (note === 0) {
      snare.play();
    }
    // if (note === 1) {
    //   snare.play();
    // }
    console.warn(note);
  }, [note])

  const setCurrentNote = (i) => {
    setNote(i)
  }

  return (
    <div className="App">
      <div className="forward">
        {notes.map((_, i) => {
          return <Holder i={i} setCurrentNote={setCurrentNote}/>;
        })}
      </div>
      <div>
      </div>
    </div>
  );
}

export default App;
