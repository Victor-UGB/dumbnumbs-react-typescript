import React, { useReducer, useState } from 'react'
import Units from './Units'
import Operator from './Operator'

interface Props{
    numbers : number[]
    returnVal: (index:number) => unknown
}

const initialState = {count:0}

const total = (state:any, action:any) => {
        switch (action.type) {
            case "+":
                return{count: state.count + 1}
            case "-":
                return{count: state.count - 1}
        }

    }


const Digits:React.FC<Props> = ({numbers, returnVal}) => {

    return (
        <>
            {numbers.map((num:number, index:number) => 
                <div className=' bg-gradient-to-br from-zinc-700 to-zinc-900 p-2 m-2 items-center flex justify-around rounded-3xl hover:shadow-inner hover:scale-90 transition-all ease-in-out'>
                    <Units
                        key={index}
                        unit={index}
                        index = {index}
                        returnValue={returnVal}
                    />
                </div>
            )}
        </>
    )
}

export default Digits