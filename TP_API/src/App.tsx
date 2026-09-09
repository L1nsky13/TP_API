import { useState } from 'react'
import Drivers from './Drivers'
import './App.css'

function App() {
  const [showDrivers, setShowDrivers] = useState(false)

  return (
    <>
      <button 
      type="button" 
      onClick={() => 
      setShowDrivers((visible) => !visible)}>
        {showDrivers ? "Masquer l'API" : "Afficher l'API"}
      </button>
      {showDrivers && <Drivers />}
    </>
  )
}

export default App
