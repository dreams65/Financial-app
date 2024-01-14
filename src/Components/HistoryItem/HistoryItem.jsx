import React from 'react'
import './../HistoryItem/HistoryItem.css'

function HistoryItem({title, date, value}) {
  const valute = 'zl';
  const [color, setColor] = React.useState('green')

  React.useEffect(() => {
    if (value < 0) {
        setColor('red');
    }
  }, []);

  return (
    <li className='history__item'>
        <span className='history__item_title'>{title}</span>
        <span className='history__item_date'>{date}</span>
        <span className='history__item_value' data-color={color}> {+value} {valute}</span>
    </li>
  )
}

export default HistoryItem