import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from 'reactstrap';
import List from '../Component/List';
import AddMedicine from './AddMedicine';

const data = [
    {
        id: 101,
        name: 'Abacavir',
        quantity: 25,
        price: 150,
        expiry: 2022
    },
    {
        id: 102,
        name: 'Eltrombopag',
        quantity: 90,
        price: 550,
        expiry: 2021
    },
    {
        id: 103,
        name: 'Meloxicam',
        quantity: 85,
        price: 450,
        expiry: 2025
    },
    {
        id: 104,
        name: 'Allopurinol',
        quantity: 50,
        price: 600,
        expiry: 2023
    },
    {
        id: 105,
        name: 'Phenytoin',
        quantity: 63,
        price: 250,
        expiry: 2021
    },
]

function Medicine(props) {
    const [, setReRender] = useState({})

    //localStorage.removeItem("medicineData")

    let localData = localStorage.getItem("medicineData")

    let localMdata;

    if (localData === null) {
        localStorage.setItem("medicineData", JSON.stringify(data)) 
        localMdata = data
    } else {
        localMdata = JSON.parse(localData)
    }

    const handleReRender = () => {
        setReRender({})
    }

    const handleDelete = (id) => {
        console.log(id) //107
        console.log(localMdata)

        let afterDelete = localMdata.filter((l) => l.id !== id)

        localStorage.removeItem("medicineData")
        localStorage.setItem("medicineData", JSON.stringify(afterDelete)) 

        alert("Delete medicine successfully")
        setReRender({})
        console.log(afterDelete)
    }

    return (
        <div className="container ">
            <AddMedicine rerender={() => handleReRender()} />
            <div className="row">
                {
                    localMdata.map((d) => {
                        return (
                            <List onDelete={() => handleDelete(d.id)} name={d.name} price={d.price} quantity={d.quantity} expiry={d.expiry} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Medicine;