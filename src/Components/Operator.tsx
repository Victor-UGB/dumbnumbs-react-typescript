import React from 'react'
interface Props {
    symbol: string
    operation: () => unknown
}

const Operator:React.FC<Props> = ({symbol, operation }) => {
    return (
        <div onClick={operation}>
            <div>{symbol}</div>
        </div>
    )
}

export default Operator