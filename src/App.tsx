import React, { useState, useReducer } from 'react';
import './App.css';
import Operator from './Components/Operator';
import Result from './Components/Result';
import InputField from './Components/InputField';
import Digits from './Components/Digits';

const initialState = {count:0}

const App:React.FC = () => {
  // First entry
  const[firstNumEntered, setFirstNumEntered] = useState<string>("")
  const [secondNumEntered, setSecondNumEntered] = useState<any>("")
  const [symbol, setSymbol] = useState("")
  const [operators]= useState([
    {
      symbol: "+"
    },
    {
      symbol: "-"
    },
    {
      symbol: "x"
    },
    {
      symbol: "/"
    },
    // {
    //   symbol: "=",
    // },
    {
      symbol: "AC"
    }

  ])
  let num:any
  const [totalNumb, setTotalNumb] = useState(0);

  const returnValue = (index:number) => {
      // Check firstNumEntered includes operator
      if (firstNumEntered.includes(" + ")){
          // If includes operator set secondNumberEntered
          setSecondNumEntered((prev:any) => {
            const update = secondNumEntered? prev + index.toString() : index.toString()
            setTotalNumb(Math.round((parseInt(firstNumEntered.split(" ")[0]) + parseInt(update)) *1000)/1000)
            return update
          })
      } else if (firstNumEntered.includes(" - ")){
          // If includes operator set secondNumberEntered
          setSecondNumEntered((prev:any) => {
            const update = secondNumEntered? prev + index.toString() : index.toString()
            setTotalNumb(Math.round((parseInt(firstNumEntered.split(" ")[0]) - parseInt(update)) *1000)/1000)
            return update
          })
      } else if (firstNumEntered.includes(" x ")){
          // If includes operator set secondNumberEntered
          setSecondNumEntered((prev:any) => {
            const update = secondNumEntered? prev + index.toString() : index.toString()
            setTotalNumb(Math.round((parseInt(firstNumEntered.split(" ")[0]) * parseInt(update)) *1000)/1000)
            return update
          })
      } else if (firstNumEntered.includes(" / ")){
          // If includes operator set secondNumberEntered
          setSecondNumEntered((prev:any) => {
            const update = secondNumEntered? prev + index.toString() : index.toString()
            setTotalNumb(Math.round((parseInt(firstNumEntered.split(" ")[0]) / parseInt(update)) *1000)/1000)
            return update
          })
      }
      setFirstNumEntered(firstNumEntered? prev => prev + index.toString() : index.toString())
      return
  }

  const total = (state:any, action:any) => {
        num = parseInt(firstNumEntered)
        setSymbol(action.type)
        switch (action.type) {
            case "+":
                if (firstNumEntered){
                  if (!secondNumEntered && !symbol){
                    setFirstNumEntered(prev => prev + " + ")
                    setSymbol("+")
                  }
                  else{
                    if(symbol !== "="){
                    setFirstNumEntered(totalNumb.toString() + " + ")
                    setSecondNumEntered("")
                    }else{
                      setFirstNumEntered(prev => prev + " + ")
                    }
                  }
                  return
                }
                return
            case "-":
                if(firstNumEntered){
                  if (!secondNumEntered && !symbol){
                    setFirstNumEntered(prev => prev + " - ")
                    setSymbol("-")
                  }
                  else{
                    if(symbol !== "="){
                    setFirstNumEntered(totalNumb.toString() + " - ")
                    setSecondNumEntered("")
                    }else{
                      setFirstNumEntered(prev => prev + " - ")
                    }
                  }
                  return{count: num - parseInt(secondNumEntered)}
                  }
                return
            case "x":
                if(firstNumEntered){
                  if (!secondNumEntered && !symbol){
                    setFirstNumEntered(prev => prev + " x ")
                    setSymbol("x")
                  }
                  else{
                    if(symbol !== "="){
                    setFirstNumEntered(totalNumb.toString() + " x ")
                    setSecondNumEntered("")
                    }else{
                      setFirstNumEntered(prev => prev + " x ")
                    }
                  }
                  return
                  }
                return
            case "/":
                if(firstNumEntered){
                  if (!secondNumEntered && !symbol){
                    setFirstNumEntered(prev => prev + " / ")
                    setSymbol("/")
                  }
                  else{
                    if(symbol !== "="){
                    setFirstNumEntered(totalNumb.toString() + " / ")
                    setSecondNumEntered("")
                    }else{
                      setFirstNumEntered(prev => prev + " / ")
                    }
                  }
                  return
                }
                return
            case "=":
                  if (!secondNumEntered){
                    setFirstNumEntered("")
                    setSymbol("=")
                  }
                  else{
                    setFirstNumEntered("")
                    setSecondNumEntered("")
                  }
                  return
            case "AC":
                  setSecondNumEntered("")
                  setSymbol("")
                  setFirstNumEntered("")
                  setTotalNumb(0)
        }

    }


  const [state, dispatch] = useReducer(total, initialState)

  return (
    <div className="App h-screen" style={{height: "100dvh",}}>
      <div className='h-full items-center flex flex-col p-2 bg-zinc-200'>
        <div className='text-left font-black'>DumbNumbs</div>
      <div className='flex flex-col justify-between h-1/5 items-center w-full px-5 text-4xl font-extrabold text-zinc-800 bg-gradient-to-bl  from-stone-400 to-stone-600 shadow-inner shadow-black rounded m-2 mx-2'>
        <div className='text-start mt-3 overflow-x-scroll overflow-y-hidden w-full font-medium'>{firstNumEntered}</div>
        {/* <div>Second: {secondNumEntered}</div> */}
        <div className='text-6xl my-1 font-black w-full overflow-x-scroll overflow-y-hidden text-end'>
            {symbol === "+" ? Math.round((parseInt(firstNumEntered) + parseInt(secondNumEntered)) * 1000)/1000 
            : (symbol === "-"?  Math.round((parseInt(firstNumEntered) - parseInt(secondNumEntered)) * 1000)/1000 
            : (symbol === "x"? Math.round((parseInt(firstNumEntered) * parseInt(secondNumEntered)) * 1000)/1000 
            : (symbol === "/" ? Math.round((parseInt(firstNumEntered) / parseInt(secondNumEntered)) * 1000)/1000 
            : (symbol === "="? totalNumb
            : (symbol === "AC"? "0": "0")))))}
        </div>
      </div>
      {/* <InputField/> */}
      <div className='w-full h-full grid grid-cols-3 m-auto pointer'>
      <Digits
        numbers={[...Array(10)]}
        returnVal={returnValue}
      />
      {
          operators.map(op => 
            
          <div className= {op === operators[4]?  'bg-green-700 font-extrabold text-zinc-100 p-2 m-2 items-center flex justify-around rounded-xl hover:shadow-inner hover:scale-95 shadow-lg shadow-zinc-600 border-4 border-r-zinc-600 border-b-zinc-600 transition-all ease-in-out'
          : 'bg-zinc-800 font-extrabold text-zinc-100 p-2 m-2 items-center flex justify-around rounded-xl hover:shadow-inner hover:scale-95 shadow-lg shadow-zinc-600 border-4 border-r-zinc-600 border-b-zinc-600 transition-all ease-in-out' }>
            <Operator symbol={op.symbol} operation={() => dispatch({type: op.symbol})}/>
          </div>
          )
        }
      </div>
      {/* <Result/> */}
      <div className='text-center font-bold text-sm text-zinc-500 my-1'>withLove_Victor</div>
      </div>
    </div>
  );
}

export default App;
