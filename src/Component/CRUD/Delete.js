import React, { useEffect } from 'react';

function Delete(props) {
    
    useEffect(
        () => {
            const {id} = props.location.state

            const newData = JSON.parse(localStorage.getItem("appointment"))

            const afterDelete = newData.filter((d, index) => {
                return d.id !== id
            })
        
            alert("Delete appointment successfully")
        
            localStorage.setItem('appointment', JSON.stringify(afterDelete))
            
            props.history.push("/list_appointment");
        
        },
    [props.location.state])

    return (
        <div>
            
        </div>
    );
}

export default Delete;