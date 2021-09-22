import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Input } from 'reactstrap';
import List from '../Component/List';
import AddMedicine from './AddMedicine';



function Medicine(props) {
    const orgData = [
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
    const [, setReRender] = useState({})
    const [update, setUpdate] = useState({})
    const [search, setSearch] = useState('')
    const [data, setData] = useState([{}])

    //localStorage.removeItem("medicineData")

    useEffect(
        () => {
            handleSearch()
        },
    [search])

    const handleReRender = () => {
        let udata = JSON.parse(localStorage.getItem("medicineData"))
        setData(udata)
        setReRender({})
        setUpdate({})
    }

    const handleDelete = (id) => {
        let afterDelete = data.filter((l) => l.id !== id)

        localStorage.removeItem("medicineData")
        localStorage.setItem("medicineData", JSON.stringify(afterDelete))

        alert("Delete medicine successfully")
        setReRender({})
        let udata = JSON.parse(localStorage.getItem("medicineData"))
        setData(udata)        
    }

    const handleEdit = (id) => {
        const updateData = data.filter((l) => l.id === id)
        setUpdate(updateData[0])
    }

    const handleSearch = () => {
        let filterData
        if (search != '') {
            filterData = data.filter((m) =>
            (m.name.toLowerCase().includes(search.toLowerCase()) ||
                m.quantity.toString().includes(search) ||
                m.expiry.toString().includes(search) ||
                m.price.toString().includes(search)))
        } else {
            let localData = localStorage.getItem("medicineData")
        
            if (localData === null) {
                localStorage.setItem("medicineData", JSON.stringify(orgData))
                filterData = data
            } else {
                filterData = JSON.parse(localData)
            }
        }

        setData(filterData)
    }

    const handleSort = (e) => {
        if (e.target.value !== "0") {
            let sortData = data.sort((a, b) => {
                if (e.target.value === 'pl') {
                    return a.price - b.price
                } else if (e.target.value === 'ph') {
                    return b.price - a.price
                } else if (e.target.value === "name") {
                    return a.name.localeCompare(b.name)
                } else if (e.target.value === "expiry") {
                    return a.expiry - b.expiry
                } else if (e.target.value === "quantity") {
                    return a.quantity - b.quantity
                }
            })
            setData(sortData)            
        } else {
            let d = JSON.parse(localStorage.getItem("medicineData"));
            setData(d)
        }
        setReRender({})
    }

    return (
        <div className="container ">
            <AddMedicine update={update} rerender={() => handleReRender()} />
            <div className="row">
                <div className="col-md-5">
                    <Input type="search" value={search} onChange={(e) => {setSearch(e.target.value); handleSearch()}} placeholder="Search" />
                </div>
                <div className="col-md-5">
                    <Input type="select" name="sort" onChange={(e) => handleSort(e)}>
                        <option value="0">Select</option>
                        <option value="pl">Price: Low to High</option>
                        <option value="ph">Price: High to Low</option>
                        <option value="name">Name</option>
                        <option value="quantity">Quantity</option>
                        <option value="expiry">Expiry</option>
                    </Input>
                </div>
            </div>
            <div className="row">
                {
                    data !== undefined && data.length > 0 && Object.keys(data).length > 0?
                    data.map((d, index) => {
                        return (
                            <List 
                                onDelete={() => handleDelete(d.id)} 
                                onEdit={() => handleEdit(d.id)} 
                                id={d.id}
                                name={d.name} 
                                price={d.price} 
                                quantity={d.quantity} 
                                expiry={d.expiry} />
                        )
                    })
                    : <p>Loading</p>
                } 
            </div>
        </div>
    );
}

export default Medicine;