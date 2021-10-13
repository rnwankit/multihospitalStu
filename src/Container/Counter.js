import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../redux/actions/counter.action'


function Counter(props) {

    const dispatch = useDispatch();
    const Counter = useSelector (state => state.CounterReducer);

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
                    <h2>Doctors</h2>
                    <p>Duis sagittis rutrum neque, quis tincidunt arcu pretium ac. Suspendisse sem risus, molestie vitae arcu et,
                        tincidunt viverra erat. Quisque in lectus id nulla viverra sodales in a risus. Aliquam ut sem ex. Duis viverra
                        ipsum lacus, ut pharetra arcu sagittis nec. Phasellus a eleifend elit.</p>
                </div>
                <div className="row">
                    <div className="col-lg-6">
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