const tick = new Howl({
  src:
    "https://raw.githubusercontent.com/kdubbels/metronome/main/public/sounds/boom.wav"
});

const firstTick = new Howl({
  src:
    "https://raw.githubusercontent.com/kdubbels/metronome/main/public/sounds/tink.wav"
});

const PlusIcon = function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      className="bi bi-plus"
      viewBox="0 0 16 16"
    >
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
    </svg>
  );
};

const MinusIcon = function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-minus"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
};

const PlayIcon = function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      className="bi bi-play-circle"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
      />
      <path
        fillRule="evenodd"
        d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"
      />
    </svg>
  );
};

const PauseIcon = function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      className="bi bi-pause-circle"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
      />
      <path
        fillRule="evenodd"
        d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"
      />
    </svg>
  );
};

function TickLight({ side, setCurrentNote, isTicking, bpm, i, timeSignature }) {
  const calculateBPM = (bpm) => (60 / bpm) * timeSignature.length;

  let animationDelay =
    (calculateBPM(bpm) / timeSignature.length) * i === 0
      ? `0s`
      : `-${(calculateBPM(bpm) / timeSignature.length) * i}s`;

  // console.log(animationDelay);

  const animationIteration = () => {
    console.log(i);
    if (i === timeSignature.length - 1) {
      firstTick.play();
    } else {
      tick.play();
    }
  };

  const style = {
    animation: isTicking
      ? `lightUpAnimation ${calculateBPM(
          bpm
        )}s linear ${animationDelay} infinite`
      : "none"
  };

  return (
    <span
      className="forward holder"
      style={style}
      onAnimationIteration={animationIteration}
    >
      <div className="note">
        <div className="ripple"></div>
      </div>
    </span>
  );
}

function App() {
  const [isTicking, setIsTicking] = React.useState(false);
  const [bpm, setBpm] = React.useState(100);
  const [timeSignature, setTimeSignature] = React.useState(["", "", "", ""]);

  return (
    <div className="App">
      <div className="container">
        <div className="button-group row space-between">
          {timeSignature
            .map((x, i) => {
              return (
                <TickLight
                  side="left"
                  i={i}
                  isTicking={isTicking}
                  bpm={bpm}
                  timeSignature={timeSignature}
                />
              );
            })
            .reverse()}
        </div>

        <div className="button-group row space-between">
          <div className="display">
            <div className="display__inner">
              <div className="display__outer">
                <div className="display__value">
                  <span>
                    {bpm < 100 ? "0" : ""}
                    {bpm} BPM
                  </span>
                  {` `}
                  <span>{timeSignature.length}/4</span>
                </div>
              </div>
            </div>
          </div>

          <button
            className={`button ${isTicking ? "pressed" : ""}`}
            onClick={() => setIsTicking(!isTicking)}
          >
            {isTicking ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
        <div className="button-group row space-between">
          <button
            className="button"
            onClick={() => (bpm > 40 ? setBpm(Number(bpm - 1)) : null)}
          >
            <MinusIcon />
          </button>
          <div>
            <input
              type="range"
              id="bpm-dial"
              name="bpm-dial"
              min="40"
              max="250"
              step="1"
              onChange={(e) => setBpm(Number(e.target.value))}
              value={bpm}
            />
          </div>
          <button
            className="button"
            onClick={() => (bpm < 250 ? setBpm(Number(bpm + 1)) : null)}
          >
            <PlusIcon />
          </button>
        </div>

        <div className="button-group row space-between">
          <button
            className="button"
            onClick={() =>
              timeSignature.length > 2
                ? setTimeSignature(new Array(timeSignature.length - 1).fill(""))
                : null
            }
          >
            <MinusIcon />
          </button>
          <div>
            <input
              type="range"
              id="time-signature-dial"
              name="time-signature-dial"
              min="2"
              max="6"
              step="1"
              onChange={(e) =>
                setTimeSignature(new Array(Number(e.target.value)).fill(""))
              }
              value={timeSignature.length}
            />
          </div>
          <button
            className="button"
            onClick={() =>
              timeSignature.length < 6
                ? setTimeSignature(new Array(timeSignature.length + 1).fill(""))
                : null
            }
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
