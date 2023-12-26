// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

console.log(format)

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  isTogoleActive = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isStar: !each.isStar}
        }
        return each
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      isStar: false,
      date: formattedDate,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStar === true,
      )
    }
    return appointmentList
  }

  render() {
    const {isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    return (
      <div className="bg-container">
        <div className="appointment-card-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="appointment-form-and-image-container">
            <form className="form-container" onSubmit={this.onAddAppointment}>
              <label htmlFor="title" className="title-label">
                TITLE
              </label>

              <input
                className="title"
                type="text"
                onChange={this.onTitleInput}
                id="title"
                placeholder="Title"
              />
              <br />
              <label htmlFor="date" className="date-label">
                DATE
              </label>
              <input
                id="date"
                type="date"
                placeholder="dd/mmm/yyy"
                onChange={this.onDateInput}
                className="date"
              />
              <br />
              <button type="submit" className="btn">
                Add
              </button>
            </form>
            <img
              alt="appointments"
              className="imag-url"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>
          <hr className="hr" />
          <div className="bg-appointment-item-container">
            <h1 className="appointment-paragraph">Appointments</h1>

            <button
              type="button"
              className={`filter-style ${filterClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="ul-container">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                togleActive={this.isTogoleActive}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
