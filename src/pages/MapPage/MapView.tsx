import Map from '../../components/Map'
import DragAndDrop from '../../components/DragAndDrop'
import NavBar from '../../components/NavBar'
import './index.css'

function MapView() {
  return (
    <>
    <NavBar />
      <div className="map-page">
        <DragAndDrop />
        <Map />
      </div>
    </>
  )
}

export default MapView