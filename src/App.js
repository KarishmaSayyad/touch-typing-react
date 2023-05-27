
import { useEffect,useState } from 'react';
import './App.css';
import Time from './Time';
import randomWords from 'random-words'

const NUMB_OF_WORDS=200;
const SECOUNDS=60;
function App() {

  const [words,setWords]=useState([]);
  const [countDown,setCountDown]=useState(10);
  useEffect(()=>{
    setWords(generatewords())
  },[]);

  function generatewords(){
    return new Array(NUMB_OF_WORDS).fill(null).map(()=>randomWords())
  }

  const start=()=>{
    let interval=setInterval(()=>{
      setCountDown((prevcountDown)=>{
      if(prevcountDown===0){
        clearInterval(interval);
      }
      else{
     return prevcountDown-1
      }
    })
    },1000)
  
  }
  return (
    <div className="App">
      
    {/* <Time/> */}

    <div> 
        <h1>{countDown}</h1>
      </div>

      <div className='input_txt'>
        <input type='textarea'/>
      </div>
      <div>
      <button onClick={start}>Start</button>
      </div>

      <div className='type_txt'>
      
        {words.map((word,i)=>(
            <>
          <span key={i}>
              {word.split("").map((char,idx)=>(
                <span key={idx}>{char}</span>
              ))}
          </span>
       <span> </span>
       </>
       
        ))}
      
      </div>
    </div>
  );
}

export default App;
