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
    const [data, setData] = useState([{}])
    const [filterData, setFilterData] = useState()
    const [sortData, setSortData] = useState()
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    //localStorage.removeItem("medicineData")

    useEffect(
        () => {
            //handleSearch()
            loadData()
        },
        [search, sort])

    const loadData = () => {
        let localData = localStorage.getItem("medicineData")

        let localMData

        if (localData === null) {
            localStorage.setItem("medicineData", JSON.stringify(orgData))
            localMData = data
        } else {
            localMData = JSON.parse(localData)
        }

        setData(localMData)
    }

    const handleReRender = () => {
        loadData()
        setReRender({})
        setUpdate({})
    }

    const handleDelete = (id) => {
        let afterDelete = data.filter((l) => l.id !== id)

        localStorage.removeItem("medicineData")
        localStorage.setItem("medicineData", JSON.stringify(afterDelete))

        alert("Delete medicine successfully")
        setReRender({})
        loadData()
    }

    const handleEdit = (id) => {
        const updateData = data.filter((l) => l.id === id)
        setUpdate(updateData[0])
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        if (e.target.value !== '') {
            let filterDataL = data.filter((m) =>
                (m.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    m.quantity.toString().includes(e.target.value) ||
                    m.expiry.toString().includes(e.target.value) ||
                    m.price.toString().includes(e.target.value)))
            setFilterData(filterDataL)
        } else {
            setFilterData()
            handleSort('', "yes")
            setSearch('')
            //setSort("0")
            loadData()
        }
    }

    const handleSort = (e ='', empty='') => {
        let finalData = filterData && empty ==='' ? filterData : data;
        let val = e != '' ? e.target.value : sort
        
        setSort(val)

        if (val !== "0") {
            let sortData = finalData.sort((a, b) => {
                if (val === 'pl') {
                    return a.price - b.price
                } else if (val === 'ph') {
                    return b.price - a.price
                } else if (val === "name") {
                    return a.name.localeCompare(b.name)
                } else if (val === "expiry") {
                    return a.expiry - b.expiry
                } else if (val === "quantity") {
                    return a.quantity - b.quantity
                }
            })
            setSortData(sortData)
        } else {
            setSortData()
            loadData()
        }
        setReRender({})
    }

    let finalData = filterData ? filterData : sortData ? sortData : data;

    return (
        <div className="container ">
            <AddMedicine update={update} rerender={() => handleReRender()} />
            <div className="row">
                <div className="col-md-5">
                    <Input type="search" onChange={(e) => handleSearch(e)} placeholder="Search" />
                </div>
                <div className="col-md-5">
                    <Input type="select" name="sort" value={sort} onChange={(e) => handleSort(e)}>
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
                    finalData !== undefined && finalData.length > 0 ?
                        finalData.map((d, index) => {
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
                        : search !== '' ? <div className='text-center'> <h4>Not found</h4> </div> 
                    : <p>Loading</p>
                }
            </div>
        </div>
    );
}

export default Medicine;