import { useState } from 'react'
import Panel from './Components/Panel/Panel'
import History from './Components/History/History'
import './App.css'

function App() {
  return(
    <div className='app-wrapper'>
      <Panel/>
      <History/>
    </div>
  )
}

export default App
