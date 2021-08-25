import './TrafficLights.css'

function TrafficLights({ redOn, yellowOn, greenOn }) {
  return (
    <div className="traffic-lights">
      <div className={redOn ? "red-light red-light_active" : "red-light"}></div>
      <div className={yellowOn ? "yellow-light yellow-light_active" : "yellow-light"}></div>
      <div className={greenOn ? "green-light green-light_active" : "green-light"}></div>     
    </div>
  )
}

export default TrafficLights;