
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Time from './Time';
import randomWords from 'random-words'

const NUMB_OF_WORDS = 500;
const SECOUNDS = 300;
function App() {

  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(300);
  const [currInput, setCurrInput] = useState("");
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState("wait");
  const [min,setMin]=useState(0);
  const [sec,setSec]=useState(0);
  const txtInput = useRef(null);


  useEffect(() => {
    setWords(generatewords())
  }, []);

  useEffect(() => {
    if (status === 'started') {
      txtInput.current.focus();
    }
  })

  function generatewords() {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords())
  }

  const start = () => {
    if (status === 'finished') {
      setWords(generatewords())
      setCurrWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar("");

    }
    if (status != 'started') {
      setStatus('started');


      let interval = setInterval(() => {
        setCountDown((prevcountDown) => {
          // // let time = 135
        var  min1 = Math.floor( prevcountDown/ 60);
         var sec1 = prevcountDown % 60;
          setMin(min1);
          setSec(sec1);
console.log(min1 ,': ' , sec1);
          // console.log(Hours)
          // console.log(minutes)
          if (prevcountDown === 0) {
            clearInterval(interval);
            setStatus('finished');
            setCurrInput('');
            return SECOUNDS;
          }
          else {

            return prevcountDown - 1
          }
        })
      }, 1000)

    }
  }

  const reset = () => {
    setWords(generatewords())
    setCurrWordIndex(0);
    setCorrect(0);
    setIncorrect(0);
    setCurrCharIndex(-1);
    setCurrChar("");
    setCountDown(300);
  }

  function handelKeyDown({ keyCode, key }) {
    // console.log(event.target.value);
    if (keyCode === 32) {
      checkMatch();
      setCurrInput("");
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
    } else if (key === 8) {
      setCurrWordIndex(currWordIndex - 1);
      setCurrChar("");
    }
    else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key)
    }


  }

  const checkMatch = () => {
    const wordToComapre = words[currWordIndex];
    const doesMatch = wordToComapre === currInput.trim();
    // console.log(doesMatch)

    if (doesMatch) {
      setCorrect(correct + 1);
    }
    else {
      setIncorrect(incorrect + 1);
    }
    console.log(correct, incorrect);
  }

  const getcharclass = (wordIdx, charIdx, char) => {
    if (wordIdx === currWordIndex && charIdx === currCharIndex && currChar && status !== 'finished') {
      if (char === currChar) {
        return 'color_green'
      }
      else {
        return 'color_red';
      }
    } else if (wordIdx === currWordIndex && currCharIndex >= words[currWordIndex].length) {
      return 'color_red';
    } else {
      return '';
    }

  }

  return (
    <div className="App">

      {/* <Time/> */}

      <div>
        <h1>{min} : {sec} </h1>
      </div>

      <div className='input_txt'>
        <input placeholder='click on start 👇 & Type here ✍️' ref={txtInput} disabled={status !== 'started'} type='textarea' onKeyDown={handelKeyDown} value={currInput} onChange={(e) => setCurrInput(e.target.value)} />
      </div>
      <div>
        {status !== 'started' && (<button onClick={start}>Start</button>)}
        {status === 'started' && (<button className='bg' onClick={reset}>Reset</button>)}
      </div>

      <div className='container'>
        {status === 'started' && (
          <div className='type_txt'>

            {words.map((word, i) => (
              <>
                <span key={i}>
                  {word.split("").map((char, idx) => (
                    <span className={getcharclass(i, idx, char)} key={idx}>{char}</span>
                  ))}
                </span>
                <span> </span>
              </>

            ))}

          </div>)}
        {status === 'finished' && (
          <div className='section'>
            <div className='columns'>
              <div className='col'>⌨️ Words in 5 Minutes 😃
                <p>{correct}</p>
              </div>

              <div className='col'>Accuracy ☑️ </div>
              <p>{Math.round((correct / (correct + incorrect)) * 100)}%</p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;
