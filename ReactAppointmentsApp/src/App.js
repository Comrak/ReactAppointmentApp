import React, {Fragment, useState, useEffect} from 'react';
import Form from './components/Form'
import Appointments from './components/Appointments'

function App() {
  //saving on local storage
  let initialApp = JSON.parse(localStorage.getItem('appointments'))
  if(!initialApp){
    initialApp = []
  }

  //appointment array
  const [appointments, setAppointments] = useState (initialApp)

  //use effect to check change of state
  useEffect( () => {
    let initialApp = JSON.parse(localStorage.getItem('appointments'))
    if(initialApp){
      localStorage.setItem('appointments', JSON.stringify(appointments))
    }else{
      localStorage.setItem('appointments', JSON.stringify([]))
    }
  },[appointments])

  //function that takes actualis appointments and make a new one 
  const makeApp = (appointment) =>{
    setAppointments([
      ...appointments,
      appointment
    ])
  }

  //function to delete appointments
  const deleteAppointment = (id) =>{
    const newApp = appointments.filter(appointment => appointment.id !== id)
    setAppointments(newApp)
  }

  //conditional message 
  const title = appointments.length === 0 ?'No Appointments' :'Current Appointments'

  return (
    <Fragment>
      
    <h1>Medical Appointments Administrator</h1>

    <div className="container">
      <div className="row">
        <div className="one-half column">
          <Form
            makeApp={makeApp}
          />
        </div>
        <div className="one-half column">
          <h2>{title}</h2>
          {appointments.map(appointment => (
            <Appointments
              key={appointment.id}
              appointment={appointment}
              deleteAppointment={deleteAppointment}
            />
          ))}
        </div>
      </div>
    </div> 
    </Fragment>
  );
}

export default App;
