import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import List from '../Component/List';

function ListAppointment(props) {
  const [data, setData] = useState([])

  useEffect(
    () => {
        loadData()
    },
[])

const loadData = () => {
    let localData = localStorage.getItem("appointment")

    if (localData !== null) {
      setData(JSON.parse(localData))
    }
}

console.log("ListApt")
  return (
    <main id="main">
      <section id="appointment" className="appointment">
        <div className="container">
          <div className="section-title">
            <h2>Manage an Appointment</h2>
          </div>
          <div className="row aptNav">
            <div className="col-md-6 text-center">
              <NavLink
                to={{
                  pathname: '/add_appointment'
                }}
                className=""
              >Add Appointment</NavLink>
            </div>
            <div className="col-md-6 text-center">
              <NavLink
                to={{
                  pathname: '/list_appointment'
                }}
              >List Appointment</NavLink>
            </div>
          </div>
          <div className="row">
                {
                    data !== undefined && data.length > 0 ?
                        data.map((d, index) => {
                            return (
                                <List
                                    id={d.id}
                                    name={d.name}
                                    email={d.email}
                                    phone={d.phone}
                                    date={d.date}
                                    dept={d.department}
                                    message={d.message}
                                    onDelete={"fromListAptDelete"}
                                    onEdit={"fromListAptEdit"}                                 
                                     />
                            )
                        })
                        : <p>Not have any appointment.</p>
                }
            </div>


        </div>
      </section>
    </main>
  );
}

export default ListAppointment;