import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {useHistory } from "react-router-dom";


function AddAppointment(props) {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [validate, setValidate] = useState(false)
    const [editData, setEditData] = useState({})
    const history = useHistory();


    const handleChanges = (e) => {
        console.log(e.target.name + " " + e.target.value)
        setValues(values => ({ ...values, [e.target.name]: e.target.value }))
    }

    const validation = () => {
        let nameErr = true
        let emailErr = true
        let phoneErr = true
        let dateErr = true
        let deptErr = true

        if (values.name != undefined) {
            if (values.name == "") {
                setErrors(errors => ({ ...errors, name: "Please enter name" }))
            } else {
                var regex = /^[a-zA-Z\s]+$/;
                if (regex.test(values.name) === false) {
                    setErrors(errors => ({ ...errors, name: "Please enter valid name" }))
                } else {
                    setErrors(errors => ({ ...errors, name: "" }))
                    nameErr = false;
                }
            }
        }

        if (values.email != undefined) {
            if (values.email == "") {
                setErrors(errors => ({ ...errors, email: "Please enter your email address" }))
            } else {
                // Regular expression for basic email validation
                var regex = /^\S+@\S+\.\S+$/;
                if (regex.test(values.email) === false) {
                    setErrors(errors => ({ ...errors, email: "Please enter a valid email address" }))
                } else {
                    setErrors(errors => ({ ...errors, email: "" }))
                    emailErr = false;
                }
            }
        }

        if (values.phone == "") {
            setErrors(errors => ({ ...errors, phone: "Please enter your mobile number" }));
        } else {
            
            if (values.phone !== undefined) {
                var regex = /^[1-9]\d{9}$/;
                if (regex.test(values.phone) === false) {
                    setErrors(errors => ({ ...errors, phone: "Please enter a valid 10 digit mobile number" }));
                } else {
                    setErrors(errors => ({ ...errors, phone: "" }));
                    phoneErr = false;
                }
            }
        }

        if (values.date === null) {
            setErrors(errors => ({ ...errors, date: "Please select date" }));
        } else {
            setErrors(errors => ({ ...errors, date: "" }));
            dateErr = false
        }



        // if (country == "Select") {
        //     printError("countryErr", "Please select your country");
        // } else {
        //     printError("countryErr", "");
        //     countryErr = false;
        // }

        // if (gender == "") {
        //     printError("genderErr", "Please select your gender");
        // } else {
        //     printError("genderErr", "");
        //     genderErr = false;
        // }


        if (values.department === "0") {
            setErrors(errors => ({ ...errors, department: "Please select department" }))
        } else {
            setErrors(errors => ({ ...errors, department: "" }))
            deptErr = false
        }

        if ((nameErr || emailErr || phoneErr || deptErr || dateErr) == true) {
            return false
        } else {
            return true
        }
    }

    console.log(props)
    useEffect(
        () => {
            validation()
            const localData = JSON.parse(localStorage.getItem("appointment"))

            if (localData && props.location.state !== undefined) {
                let dd = props.location.state.id !== undefined ? localData.filter((l) => l.id === props.location.state.id) : null

                props.location.state.id ? setEditData(dd[0]) : setEditData()
            }
            history.replace()
        },
        [])

    const submitData = () => {
        let isValid = true  // assume that form is validated

        isValid = validation()

        if (values.name == undefined) {
            setErrors(errors => ({ ...errors, name: "Please enter name" }))
            isValid = false
        }

        if (values.email == undefined) {
            setErrors(errors => ({ ...errors, email: "Please enter email" }))
            isValid = false
        }

        if (values.phone == undefined) {
            setErrors(errors => ({ ...errors, phone: "Please enter phone" }))
            isValid = false
        }

        if (values.date == undefined) {
            setErrors(errors => ({ ...errors, date: "Please enter date" }))
            isValid = false
        }

        if (values.department == undefined) {
            setErrors(errors => ({ ...errors, department: "Please select department" }))
            isValid = false
        }

        if (isValid) {
            setValidate(true)
            handleInsert()
        } else {
            setValidate(false)
        }
    }

    const handleInsert = () => {
        let localData = JSON.parse(localStorage.getItem("appointment"))
        

        if (localData === null || localData.length === 0) {
            let arrData = []
            
            values["id"] = 1
            arrData.push(values)
            localStorage.setItem("appointment", JSON.stringify(arrData))
        } else {
            let n = localData[localData.length-1].id + 1
            values["id"] = n
            localData.push(values)
            localStorage.removeItem("appointment")
            localStorage.setItem("appointment", JSON.stringify(localData))
        }

        history.push("/list_appointment")
    }

    const handleUpdateChange = (e) => {
        
        setEditData((value) =>({...value, [e.target.name]: e.target.value }))    
        
        
    }

    const handleUpdate = () => {
        
        const values = JSON.parse(localStorage.getItem("appointment"))

        let afterUpdate = values.map((v) => {
            if (v.id === editData.id) {
                return editData
            } else {
                return v
            }
        })
        

        localStorage.removeItem("appointment")
        localStorage.setItem("appointment", JSON.stringify(afterUpdate)) 
        alert("Update appointment successfully")
        setEditData({})
        props.history.push("/list_appointment");
    }

    

    //const dataFrom = editData ? localData.filter((l) => l.id === editData.id) : null

    //console.table(dataFrom)

    return (
        <main id="main">
            <section id="appointment" className="appointment">
                <div className="container">
                    <div className="section-title">
                        <h2>Manage an Appointment</h2>
                    </div>
                    <div className="row aptNav">
                        <div className="col-md-6 text-center">
                            <NavLink
                                to={{
                                    pathname: '/add_appointment'
                                }}
                            >Add Appointment</NavLink>
                        </div>
                        <div className="col-md-6 text-center">
                            <NavLink
                                to={{
                                    pathname: '/list_appointment'
                                }}
                            >List Appointment</NavLink>
                        </div>
                    </div>
                    <div className="php-email-form">
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <input
                                    value={editData ? editData.name : ''}
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    id="name"
                                    placeholder="Your Name"
                                    onChange={(e) => editData.name ? handleUpdateChange(e) : handleChanges(e)} 
                                />
                                <p className="errMsg">{errors.name != undefined ? errors.name : ''}</p>
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                                <input
                                    value={editData ? editData.email : ''}
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Your Email"
                                    onChange={(e) => editData.email ? handleUpdateChange(e) : handleChanges(e)} 
                                />
                                <p className="errMsg">{errors.email != undefined ? errors.email : ''}</p>
                            </div>
                            <div className="col-md-4 form-group mt-3 mt-md-0">
                                <input
                                    value={editData ? editData.phone : ''}
                                    type="tel"
                                    onChange={(e) => handleChanges(e)}
                                    className="form-control"
                                    name="phone"
                                    id="phone"
                                    placeholder="Your Phone"
                                    onChange={(e) => editData.phone ? handleUpdateChange(e) : handleChanges(e)} 
                                />
                                <p className="errMsg">{errors.phone != undefined ? errors.phone : ''}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 form-group mt-3">
                                <input
                                    value={editData ? editData.date : ''}
                                    type="date"
                                    onChange={(e) => handleChanges(e)}
                                    name="date"
                                    className="form-control datepicker"
                                    id="date"
                                    placeholder="Appointment Date"
                                    onChange={(e) => editData.date ? handleUpdateChange(e) : handleChanges(e)} 
                                />
                                <p className="errMsg">{errors.date != undefined ? errors.date : ''}</p>
                            </div>
                            <div className="col-md-4 form-group mt-3">
                                <select value={editData ? editData.department : ''} onChange={(e) => editData.department ? handleUpdateChange(e) : handleChanges(e)} name="department" id="department" className="form-select">
                                    <option value="0">Select Department</option>
                                    <option value="general">General</option>
                                    <option value="dental">Dental</option>
                                    <option value="ent">E.N.T</option>
                                </select>
                                <p className="errMsg">{errors.department != undefined ? errors.department : ''}</p>
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <textarea 
                                defaultValue={editData.message ? editData.message : ''} 
                                onChange={(e) => editData.message ? handleUpdateChange(e) : handleChanges(e)}  
                                className="form-control" 
                                name="message" 
                                rows={5} 
                                placeholder="Message (Optional)" 
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <div className="loading">Loading</div>
                            <div className="error-message" />
                            <div className="sent-message">Your appointment request has been sent successfully. Thank you!</div>
                        </div>
                        <div className="text-center">
                            {
                                Object.keys(editData).length !== 0 ? 
                                    <button onClick={() => handleUpdate()}>Update an Appointment</button>        
                                :
                                    <button onClick={() => submitData()}>Make an Appointment</button>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AddAppointment;