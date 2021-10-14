import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../redux/actions/counter.action'


function Counter(props) {

    const dispatch = useDispatch();
    const Counter = useSelector (state => state.Counter);

    console.log(Counter.counter)

    const handleIncrement = () => {
        dispatch(increment())
    }

    const handleDecrement = () => {
        dispatch(decrement())
    }

    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="section-title">
                    <h2>Counter</h2>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Button onClick={() => handleIncrement()}>+</Button>
                        <p>{Counter.counter}</p>
                        <Button onClick={() => handleDecrement()}>-</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Counter;