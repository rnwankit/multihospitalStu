import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../redux/actions/doctors.action';

function Doctors(props) {
    const dispatch = useDispatch();
    const doctors = useSelector(state => state.doctorsReducer);

    useEffect(() => {
        dispatch(fetchDoctors())
    }, [])

    console.log(doctors)

    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="section-title">
                    <h2>Doctors</h2>
                    <p>Duis sagittis rutrum neque, quis tincidunt arcu pretium ac. Suspendisse sem risus, molestie vitae arcu et,
                        tincidunt viverra erat. Quisque in lectus id nulla viverra sodales in a risus. Aliquam ut sem ex. Duis viverra
                        ipsum lacus, ut pharetra arcu sagittis nec. Phasellus a eleifend elit.</p>
                    {/* <p>{Counter.counter}</p> */}
                </div>
                <div className="row">
                    {
                        doctors.doctors.map((d) => {
                            return (
                                <div className="col-lg-6 mt-4">
                                    <div className="member d-flex align-items-start">
                                        <div className="pic">
                                            <img src={d.avatar} className="img-doctor" width="100%" />
                                        </div>
                                        <div className="member-info">
                                            <h4>{d.first_name} {d.last_name}</h4>
                                            <span>{d.email}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>

    );
}

export default Doctors;