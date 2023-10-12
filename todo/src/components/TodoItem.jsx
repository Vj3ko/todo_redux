import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { GoTrash } from 'react-icons/go'
import { useDispatch } from 'react-redux'
import {
  deleteTodoAsync,
  markCompletedAsync,
  updateTodoAsync,
} from '../redux/reducers/todoReducer'

import { AnimatePresence, motion } from 'framer-motion'

import { BiCheckbox, BiSolidCheckboxChecked } from 'react-icons/bi'

const todoAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch()
  const [isEditModal, setIsEditModal] = useState(false)

  const closeEditModal = () => setIsEditModal(false)

  return (
    <motion.div
      variants={todoAnimation}
      initial='initial'
      animate='animate'
      exit='exit'
      layout
      className='todo__item'>
      <label htmlFor={todo.id}>
        <input
          type='checkbox'
          checked={todo.completed}
          name={todo.id}
          id={todo.id}
          onChange={() =>
            dispatch(
              markCompletedAsync({ id: todo.id, completed: !todo.completed })
            )
          }
        />
        <span className='check'>
          {todo.completed ? <BiSolidCheckboxChecked /> : <BiCheckbox />}
        </span>
        <p>{todo.title}</p>
      </label>

      <div className='btns'>
        <button onClick={() => dispatch(deleteTodoAsync({ id: todo.id }))}>
          <GoTrash />
        </button>
        <button onClick={() => setIsEditModal(true)}>
          <BiEdit />
        </button>
      </div>

      <AnimatePresence>
        {isEditModal && (
          <EditModal todo={todo} closeEditModal={closeEditModal} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default TodoItem

const EditModal = ({ todo, closeEditModal }) => {
  const [newTitle, setNewTitle] = useState(todo.title)
  const dispatch = useDispatch()

  const handleSave = () => {
    dispatch(updateTodoAsync({ id: todo.id, title: newTitle }))
    closeEditModal()
  }

  return (
    <motion.div
      className='edit__modal'
      variants={todoAnimation}
      initial='initial'
      animate='animate'
      exit='exit'>
      <div className='inner'>
        <h3>Edit todo</h3>

        <input
          type='text'
          value={newTitle}
          autoFocus
          onChange={e => setNewTitle(e.target.value)}
        />
        <div className='btns'>
          <button className='cancel' onClick={closeEditModal}>
            cancel
          </button>
          <button className='save' onClick={handleSave}>
            save
          </button>
        </div>
      </div>
    </motion.div>
  )
}
