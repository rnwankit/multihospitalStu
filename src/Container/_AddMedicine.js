import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'reactstrap';

function AddMedicine(props) {
    const [inputFields, setInputFields] = useState([
        { name: '', price: '', quantity: '', expiry: '' }
    ])

    const [updateData, setUpdateData] = useState(props.updateData)

    const localData = JSON.parse(localStorage.getItem("medicineData"))

    useEffect(() => {
        setUpdateData(props.updateData);
    }, [props.updateData])

    const handleSubmit = (e) => {
        e.preventDefault()
        const localDataX = JSON.parse(localStorage.getItem("medicineData"))
        const values = [...inputFields]
        
        let last_element = localDataX[localDataX.length - 1];

        let n = last_element.id + 1;

        let data = values.map((v) => ({ ...v, "id": n++ }))
        
        

        console.log(localDataX)
        console.log(data)
        console.log(last_element.id)

        data.map((d) => localDataX.push(d))

        localStorage.removeItem("medicineData")
        localStorage.setItem("medicineData", JSON.stringify(localDataX))

        setInputFields([{ name: '', price: '', quantity: '', expiry: '' }])

        alert("Medicine added successfully.")
        props.rerender()
        return false
    }

    const handleChanges = (e, index) => {
        const values = [...inputFields]

        if (e.target.name == "name") {
            values[index].name = e.target.value
        } else if (e.target.name == "price") {
            values[index].price = parseInt(e.target.value)
        } else if (e.target.name == "quantity") {
            values[index].quantity = parseInt(e.target.value)
        } else if (e.target.name == "expiry") {
            values[index].expiry = parseInt(e.target.value)
        }

        setInputFields(values)
    }

    const addInputField = (index) => {
        const values = [...inputFields];

        values.splice(index + 1, 0, { name: '', price: '', quantity: '', expiry: '' })

        setInputFields(values)
    }

    const removeInputField = (index) => {
        const values = [...inputFields]

        values.splice(index, 1)

        setInputFields(values)
    }

    const handleUpdate = () => {
        const data = [...localData]
        let aftrUpdate = data.map((l) => {
            if (l.id == props.updateData.id) {
                let obj = updateData
                if (obj["name"] == undefined) {
                    obj["name"] = props.updateData.name
                }
                if (obj["price"] == undefined) {
                    obj["price"] = props.updateData.price
                }
                if (obj["quantity"] == undefined) {
                    obj["quantity"] = props.updateData.quantity
                }
                if (obj["expiry"] == undefined) {
                    obj["expiry"] = props.updateData.expiry
                }

                obj["id"] = props.updateData.id

                return obj
            } else {
                return l
            }
        })
        setUpdateData({})
        localStorage.removeItem("medicineData")
        localStorage.setItem("medicineData", JSON.stringify(aftrUpdate))
        props.rerender()
        alert("Update Successfully")
    }

    const handleUpdateChange = (e) => {
        setUpdateData((values) => ({ ...values, [e.target.name]: e.target.name == 'name' ? e.target.value : parseInt(e.target.value) }))
    }

    return (
        <main id="main">
            <section id="appointment" className="appointment">
                <div className="container">
                    <div className="section-title">
                        {!Object.keys(props.updateData).length ? <h2>Add Medicine</h2> : <h2>Update Medicine</h2>}
                    </div>
                    <Form method="post">
                        {
                            inputFields.map((inputField, index) => {
                                return (
                                    <div className="row">
                                        <div className="col-md-2">
                                            <Input
                                                type="text"
                                                name="name"
                                                value={updateData.name ? updateData.name : inputField.name}
                                                onChange={(e) => props.updateData.name && index == 0 ? handleUpdateChange(e) : handleChanges(e, index)}
                                                placeholder="Name"
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <Input
                                                type="text"
                                                name="price"
                                                value={updateData.price ? updateData.price : inputField.price}
                                                onChange={(e) => props.updateData.price && index == 0 ? handleUpdateChange(e) : handleChanges(e, index)}
                                                placeholder="Price"
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <Input
                                                type="text"
                                                name="quantity"
                                                value={updateData.quantity ? updateData.quantity : inputField.quantity}
                                                onChange={(e) => props.updateData.quantity && index == 0 ? handleUpdateChange(e) : handleChanges(e, index)}
                                                placeholder="Quantity"
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <Input
                                                type="text"
                                                name="expiry"
                                                value={updateData.expiry ? updateData.expiry : inputField.expiry}
                                                onChange={(e) => props.updateData.expiry && index == 0 ? handleUpdateChange(e) : handleChanges(e, index)}
                                                placeholder="Expiry"
                                            />
                                        </div>
                                        {
                                            !Object.keys(props.updateData).length ?
                                                <div className="col-md-2">
                                                    <Button
                                                        style={{ marginRight: '5px' }}
                                                        color="primary"
                                                        onClick={() => addInputField(index)}>
                                                        +
                                                    </Button>
                                                    <Button
                                                        color="danger"
                                                        onClick={() => removeInputField(index)}>
                                                        -
                                                    </Button>
                                                </div> :
                                                null
                                        }
                                    </div>
                                )
                            })
                        }
                        <div className="row">
                            {
                                Object.keys(props.updateData).length ?
                                    <Input className="col-md-4" type="button" value="Update" onClick={(e) => handleUpdate(e)} /> :
                                    <Input className="col-md-4" type="button" value="Add" onClick={(e) => handleSubmit(e)} />
                            }
                        </div>
                    </Form>

                </div>
            </section>
        </main>
    );
}

export default AddMedicine;