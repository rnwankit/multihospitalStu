import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';

function AddMedicine(props) {
    const [values, setValues] = useState({})
    const [inputFields, setInputFields] = useState([
        { name: '', price: 0, quantity: 0, expiry: 0 }
    ])

    const handleChange = (e, index) => {
        console.log(e.target.name)
        console.log(e.target.value)
        const data = [...inputFields]

        if (e.target.name == "name") {
            data[index].name = e.target.value
        } else if (e.target.name == "price") {
            data[index].price = parseInt(e.target.value)
        } else if (e.target.name == "quantity") {
            data[index].quantity = parseInt(e.target.value)
        } else if (e.target.name == "expiry") {
            data[index].expiry = parseInt(e.target.value)
        }

        setInputFields(data)
    }

    console.log(inputFields)

    const handleSubmit = () => {
        let localData = JSON.parse(localStorage.getItem("medicineData"))
        console.log(localData)
        console.log(localData[localData.length-1].id + 1) //localData[4]

        let n = localData[localData.length-1].id + 1;
        let newData = inputFields.map((i) => ({...i, "id": n++ }))

        console.log(newData)

        newData.map((n1) => localData.push(n1))

        localStorage.removeItem("medicineData")
        localStorage.setItem("medicineData", JSON.stringify(localData)) 

        let localData1 = JSON.parse(localStorage.getItem("medicineData"))
        console.log(localData1)
        alert("Medicine added successfully.")
        props.rerender()
    }

    const handleAdd = (index) => {
        const oldData = [...inputFields]
        oldData.splice(index+1, 0, { name: '', price: 0, quantity: 0, expiry: 0 })
        setInputFields(oldData)
    }

    const handleRemove = (index) => {
        const oldData = [...inputFields]
        oldData.splice(index, 1)
        setInputFields(oldData)
    }

    return (
        <main id="main">
            <section id="appointment" className="appointment">
                <div className="container">
                    <div className="section-title">
                        <h2>Add Medicine</h2>
                    </div>
                    {
                        inputFields.map((i, index) => {
                            return (
                                <>
                                    <div key={index} className="row">
                                        <div className="col-md-2">
                                            <Input value={i.name} onChange={(e) => handleChange(e, index)} name="name" placeholder="Name" />
                                        </div>
                                        <div className="col-md-2">
                                            <Input value={i.price} onChange={(e) => handleChange(e, index)} name="price" placeholder="Price" />
                                        </div>
                                        <div className="col-md-2">
                                            <Input value={i.quantity} onChange={(e) => handleChange(e, index)} name="quantity" placeholder="quantity" />
                                        </div>
                                        <div className="col-md-2">
                                            <Input value={i.expiry} onChange={(e) => handleChange(e, index)} type="select" name="expiry">
                                                <option>2021</option>
                                                <option>2022</option>
                                                <option>2023</option>
                                                <option>2024</option>
                                                <option>2025</option>
                                            </Input>
                                        </div>
                                        <div className="col-md-2">
                                            <Button onClick={() => handleAdd(index)} style={{ marginRight: '8px' }} color="primary">+</Button>
                                            <Button onClick={() => handleRemove(index)} color="danger">-</Button>
                                        </div>
                                    </div>
                                    <br />
                                </>
                            )
                        })
                    }

                    <div className="row">
                        <div className="col-md-2">
                            <Button onClick={() => handleSubmit()}>Submit</Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AddMedicine;