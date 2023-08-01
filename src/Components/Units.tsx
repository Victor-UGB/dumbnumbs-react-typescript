import React from 'react'
import { UnitsModel } from '../models/models'

interface Props {
    unit : number
    index: number
    returnValue: (index:number) => void;
}

const Units: React.FC<Props> = ({unit, index, returnValue}) => {
    const handleClick = () => [
        returnValue(index)
    ]

    return (
        <div onClick={handleClick} className='w-full h-full contents'>
            <div className='text-zinc-300 text-3xl font-extrabold w-full h-full contents'>{unit}</div>
        </div>
    )
}

export default Units