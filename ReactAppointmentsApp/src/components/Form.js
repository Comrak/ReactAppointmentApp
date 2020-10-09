import React, {Fragment, useState} from 'react'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'

const Form = ({makeApp}) => {
    //create form state
    const [appointment, updateAppointment] = useState({
        pet: '',
        owner: '',
        date: '',
        time: '',
        synthoms: '',
    })
    //adding another state for error handling
    const [ error, errorUpdate] = useState(false)

    //making function for input events
    const handleChange = e =>{
        updateAppointment({
            ...appointment,
            [e.target.name] : e.target.value
        })
    }

    //extrac values
    const {pet,owner,date,time,synthoms} = appointment;

    //function for submit button
    const submitAppoinment = (e) => {
        e.preventDefault()

        //validate
        if(pet.trim() === '' || 
           owner.trim() === ''||
           date.trim() === '' ||
           time.trim() === ''|| 
           synthoms.trim() === ''){
            errorUpdate(true)
            return
        }

        //delete validation message
        errorUpdate(false);

        //assign ID
        appointment.id = uuidv4()

        //create appointment
        makeApp(appointment)

        //reset form
        updateAppointment({
            pet: '',
            owner: '',
            date: '',
            time: '',
            synthoms: '',
        })
    }

    return ( 
        <Fragment>
            <h2>Make Appointment</h2>

            { error ? <p className="alerta-error">All fields are mandatory</p> : null}

            <form
                onSubmit={submitAppoinment}
            >
                <label>Pet Name</label>
                <input
                    type="text"
                    name="pet"
                    className="u-full-width"
                    placeholder="Pet name..."
                    onChange={handleChange}
                    value={pet}
                />
                <label>Owner Name</label>
                <input
                    type="text"
                    name="owner"
                    className="u-full-width"
                    placeholder="Pet's Owner name..."
                    onChange={handleChange}
                    value={owner}
                />
                <label>Appointment Date</label>
                <input
                    type="date"
                    name="date"
                    className="u-full-width"
                    onChange={handleChange}
                    value={date}
                />
                <label>Appointment Time</label>
                <input
                    type="time"
                    name="time"
                    className="u-full-width"
                    onChange={handleChange}
                    value={time}
                />
                <label>General Synthoms</label>
                <textarea
                    className="u-full-width"
                    name="synthoms"
                    onChange={handleChange}
                    value={synthoms}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Make Appointment</button>
            </form>
        </Fragment>
     );
}
 
Form.propTypes ={
    makeApp: PropTypes.func.isRequired
}

export default Form;