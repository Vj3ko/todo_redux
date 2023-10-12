import { motion } from 'framer-motion'
import React, { useState } from 'react'

const FILTERS = ['ALL', 'ACTIVE', 'COMPLETED']

const Filter = ({ filter, changeFilter }) => {
  const [isActive, setIsActive] = useState(false)

  const handleFilterSelect = e => {
    changeFilter(e.target.value)
    setIsActive(false)
  }

  return (
    <motion.div layout className='filter__container'>
      <button className='filterBtn' onClick={() => setIsActive(!isActive)}>
        {filter}
      </button>

      {isActive && (
        <div className='dropdown'>
          {FILTERS.map(filter => (
            <button onClick={handleFilterSelect} key={filter} value={filter}>
              {filter}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default Filter
