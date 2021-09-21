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
    const [search, setSearch] = useState('')
    const [, rerender] = useState({})
    const [updateData, setUpdateData] = useState({});

    const localData = localStorage.getItem("medicineData");

    let localMData;

    //localStorage.removeItem("medicineData")

    if (localData == null) {
        localStorage.setItem("medicineData", JSON.stringify(data))
        localMData = data
    } else {
        localMData = JSON.parse(localData)
    }

    let filterData = localMData.filter((m) => 
        (m.name.toLowerCase().includes(search.toLowerCase()) || 
        m.quantity.toString().includes(search) || 
        m.price.toString().includes(search) ))

    if (search == '') {
        filterData = localMData
    }

    const rerenderParent = () => {
        rerender({})
    }

    const handleUpdate = (id) => {
        let updateData = localMData.filter((l) => l.id == id)
        setUpdateData(updateData[0])
    }

    const handleDelete = (id) => {
        const afterDelete = localMData.filter((d) => d.id != id)

        localStorage.removeItem("medicineData")
        localStorage.setItem("medicineData", JSON.stringify(afterDelete))
        alert("Deleted Successfully")
        rerender({})
    }

    return (
        <>
            <main>
                <section>
                    <div className="container">
                        <div className="section-title pb-0">
                            <h2>Medicine List</h2>
                            <AddMedicine updateData={updateData} rerender={() => rerenderParent()} />
                        </div>
                        <Input type="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                        <div className="row">
                            {
                                filterData.map((m, index) => <List onEdit={() => handleUpdate(m.id)} onDelete={() => handleDelete(m.id)} id={m.id} name={m.name} quantity={m.quantity} expiry={m.expiry} price={m.price} className="green" />)
                            }
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Medicine;