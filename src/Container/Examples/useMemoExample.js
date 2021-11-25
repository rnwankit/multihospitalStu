import React, { useMemo, useState } from 'react'

export default function useMemoExample() {
    const [number, setNumber] = useState()
    const [inc, setInc] = useState(0);

    const findFactorial = (n) => {
        console.log("Factorial is called")
        if (n > 1) {
            return n * findFactorial(n - 1);
        } else {
            return n
        }
    }

    //Without useMemo
    //const result = findFactorial(number)

    //With useMemo
    const result = useMemo(() => {
        // do something expensive that depends on counter
        console.log('Factorial', number);
        return findFactorial(number);
    }, [number]);

    return (
        <div>
            <section id="about" className="about">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center px-lg-5 abouttop">
                            <h2>Find Factorial</h2>
                            <input type="number" name="factNo" placeholder="Please enter any number" onChange={(e) => setNumber(e.target.value)} />
                            <br /><br />
                            <input type="button" onClick={() => setInc(inc + 1)} value="Click" />
                            My number of click is: {inc} <br />
                            Factorial of {number} is: {result}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}