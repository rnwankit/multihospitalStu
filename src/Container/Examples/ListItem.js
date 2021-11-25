import React, {useState, useEffect} from 'react'

export default function ListItem({getItem}) {
    const [item, setItem] = useState([])

    useEffect(() => {
        console.log(getItem)
        setItem(getItem(5))
        console.log("ListItem")
    }, [getItem])
    return (
        item.map(i => <div key={i}>{i}</div>)
    )
}
