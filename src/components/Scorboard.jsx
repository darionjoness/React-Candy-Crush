import React from 'react'

const Scorboard = ({ score }) => {
  return (
    <div className='score-board'>
        <h2>{score}</h2>
    </div>
  )
}

export default Scorboard