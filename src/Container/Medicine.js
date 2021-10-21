import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'reactstrap';
import List from '../Component/List';
import Loading from '../Component/Loading';
import { deleteMedicine, fetchMedicines } from '../redux/actions/medicines.action';
import AddMedicine from './AddMedicine';

function Medicine(props) {
    const [update, setUpdate] = useState({})
    const [filterData, setFilterData] = useState()
    const [sortData, setSortData] = useState()
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')

    const dispatch = useDispatch()

    const medicines = useSelector(state => state.Medicines)

    useEffect(
        () => {
            dispatch(fetchMedicines())
        },
        [])

    const handleDelete = (id) => {
        dispatch(deleteMedicine(id))
    }

    const handleEdit = (id) => {
        const updateData = medicines.medicines.filter((l) => l.id === id)
        setUpdate(updateData[0])
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        if (e.target.value !== '') {
            let filterDataL = medicines.medicines.filter((m) =>
            (m.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                m.quantity.toString().includes(e.target.value) ||
                m.expiry.toString().includes(e.target.value) ||
                m.price.toString().includes(e.target.value)))
            setFilterData(filterDataL)
        } else {
            setFilterData()
            handleSort('', "yes")
            setSearch('')
        }
    }

    const handleSort = (e = '', empty = '') => {
        let finalData = filterData && empty === '' ? filterData : medicines.medicines;
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
        }
    }

    let finalData = filterData ? filterData : sortData ? sortData : medicines.medicines;

    return (
        <div className="container ">
            <AddMedicine update={update} />
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
                    !medicines.isLoading ?
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
                        : <div className='text-center'><p className="errMsg">{medicines.errMsg}</p></div>
                        : search !== '' ? <div className='text-center'> <h4>Not found</h4> </div>
                    : <Loading />
                }
            </div>
        </div>
    );
}

export default Medicine;