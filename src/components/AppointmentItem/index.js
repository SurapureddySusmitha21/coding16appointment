// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, togleActive} = props
  const {id, title, isStar, date} = appointmentDetails

  const onClickStar = () => {
    togleActive(id)
  }

  const star = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="li-container">
      <div className="appointment-item-container">
        <div className="title-start-container">
          <h1 className="title-name">{title}</h1>
          <button
            type="button"
            onClick={onClickStar}
            className="start-btn"
            data-testid="star"
          >
            <img src={star} alt="star" className="star-image" />
          </button>
        </div>
        <p className="date-paragraph">Date: {date}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
