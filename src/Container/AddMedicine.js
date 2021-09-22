import React, { useEffect, useState } from 'react';
import { Button, Input } from 'reactstrap';

function AddMedicine(props) {
    const [inputFields, setInputFields] = useState([
        { name: '', price: 0, quantity: 0, expiry: 0 }
    ])

    const  [updateData, setUpdateData] = useState({})

    useEffect(
        () => {
            setUpdateData(props.update)
        },
    [props.update])

    const localData = JSON.parse(localStorage.getItem("medicineData"))

    const handleChange = (e, index) => {
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

    

    const handleSubmit = () => {
        //let localData = JSON.parse(localStorage.getItem("medicineData"))
        const values = [...localData]
        
        let n = values[values.length-1].id + 1;
        let newData = inputFields.map((i) => ({...i, "id": n++ }))

        newData.map((n1) => values.push(n1))

        localStorage.removeItem("medicineData")
        localStorage.setItem("medicineData", JSON.stringify(values)) 
        
        alert("Medicine added successfully.")
        setInputFields([
            { name: '', price: 0, quantity: 0, expiry: 0 }
        ])
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

    const handleUpdate = () => {
        const values = [...localData]

        //
        let afterUpdate = values.map((v) => {
            if (v.id === updateData.id) {
                return updateData
            } else {
                return v
            }
        })
        

        localStorage.removeItem("medicineData")
        localStorage.setItem("medicineData", JSON.stringify(afterUpdate)) 
        alert("Update medicine successfully")
        props.rerender({})
        setUpdateData({})
    }

    const handleUpdateChange = (e) => {
        
        setUpdateData((value) =>({...value, [e.target.name]: e.target.name === "name" ? e.target.value : parseInt(e.target.value)}))

        
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
                                            <Input 
                                                value={updateData.name && index === 0 ? updateData.name : i.name} 
                                                onChange={(e) => updateData.name && index===0 ? handleUpdateChange(e) : handleChange(e, index)} 
                                                name="name" 
                                                placeholder="Name" 
                                                />
                                        </div>
                                        <div className="col-md-2">
                                            <Input 
                                                value={updateData.price && index === 0 ? updateData.price : i.price} 
                                                onChange={(e) => updateData.price && index===0 ? handleUpdateChange(e) : handleChange(e, index)} 
                                                name="price" 
                                                placeholder="Price" 
                                                />
                                        </div>
                                        <div className="col-md-2">
                                            <Input 
                                                value={updateData.quantity && index === 0 ? updateData.quantity : i.quantity} 
                                                onChange={(e) => updateData.quantity && index===0 ? handleUpdateChange(e) : handleChange(e, index)} 
                                                name="quantity" 
                                                placeholder="quantity" />
                                        </div>
                                        <div className="col-md-2">
                                            <Input value={updateData.expiry  && index===0 ? updateData.expiry : i.expiry}  onChange={(e) => updateData.expiry && index===0 ? handleUpdateChange(e) : handleChange(e, index)}  type="select" name="expiry">
                                                <option>2021</option>
                                                <option>2022</option>
                                                <option>2023</option>
                                                <option>2024</option>
                                                <option>2025</option>
                                            </Input>
                                        </div>
                                        {
                                            Object.keys(props.update).length !== 0 ? 
                                                null
                                            :
                                                <div className="col-md-2">
                                                    <Button onClick={() => handleAdd(index)} style={{ marginRight: '8px' }} color="primary">+</Button>
                                                    <Button onClick={() => handleRemove(index)} color="danger">-</Button>
                                                </div>
                                        }
                                    </div>
                                    <br />
                                </>
                            )
                        })
                    }

                    <div className="row">
                        <div className="col-md-2">
                        {
                            Object.keys(props.update).length !== 0 ? 
                                <Button onClick={() => handleUpdate()}>Update</Button>
                            :
                                <Button onClick={() => handleSubmit()}>Add</Button>
                        }
                            
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AddMedicine;