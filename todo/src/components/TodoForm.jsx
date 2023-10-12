import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { addTodoAsync } from '../redux/reducers/todoReducer'

const TodoForm = () => {
  const [title, setTitle] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()

    const trimmedTitle = title.trim()
    if (trimmedTitle && trimmedTitle.length > 0) {
      dispatch(addTodoAsync({ title: trimmedTitle }))
      setTitle('')
      e.target.focus()
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input
        type='text'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button>
        <FaPlus />
      </button>
    </form>
  )
}

export default TodoForm
