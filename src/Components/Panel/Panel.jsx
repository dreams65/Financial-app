import React from 'react'
import './../Panel/Panel.css'
import Budget from '../Budget/Budget'
import { Link } from 'react-router-dom'


function Panel() {
  return (
    <aside className='panel'>
        <Budget/>
        <div className='panel__btns'>
          <Link className='panel__link' to={'/getcash'}>Take money</Link>
          <Link className='panel__link' to={'/addcash'}>Add money</Link>
        </div>
    </aside>
  )
}

export default Panel