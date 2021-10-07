import React from 'react';

function Delete(props) {
    const {id} = props.location.state

    console.log(props)
    console.log(id)

    const newData = JSON.parse(localStorage.getItem("appointment"))

    const afterDelete = newData.filter((d, index) => {
        return d.id !== id
    })

    console.log(afterDelete);

    localStorage.setItem('appointment', JSON.stringify(afterDelete))
    props.history.push("/list_appointment");

    return (
        <div>
            
        </div>
    );
}

export default Delete;