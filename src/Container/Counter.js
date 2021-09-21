import React, {useEffect, useState} from 'react';

function Counter(props) {
    const [counter, setCounter] = useState(0)
    const [counter1, setCounter1] = useState(0)
    useEffect(
        () => {
            console.log("ComponentDidMount")

            return () => {
                console.log("ComponentWillUnMount");
            }
        },
    [counter])
    return (
        <div>
            <h2>{counter}</h2>     
            <button onClick={() => setCounter(counter1+1)}>+</button>   
            <button onClick={() => setCounter(counter-1)}>-</button>   
        </div>
    );
}

export default Counter;