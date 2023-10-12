import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTodosAsync } from '../redux/reducers/todoReducer'
import Filter from './Filter'
import TodoItem from './TodoItem'

const completedVariant = {
  initial: {
    y: 5,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 5,
    opacity: 0,
  },
}

const TodoList = () => {
  const allTodos = useSelector(state => state.todos)
  const completedTodos = allTodos?.filter(todo => todo.completed === true)
  const activeTodos = allTodos?.filter(todo => todo.completed !== true)
  const dispatch = useDispatch()

  const [filter, setFilter] = useState('ALL')

  const TODOS = {
    ALL: allTodos,
    COMPLETED: completedTodos,
    ACTIVE: activeTodos,
  }

  const changeFilter = fil => {
    setFilter(fil)
  }

  useEffect(() => {
    dispatch(getTodosAsync())
  }, [dispatch])

  if (!allTodos)
    return <h3 style={{ color: 'white', marginTop: 20 }}>Loading...</h3>

  return (
    <LayoutGroup>
      <motion.div layout className='todo__list'>
        {allTodos.length === 0 ? (
          <h3>No todos to display...</h3>
        ) : (
          <>
            <Filter filter={filter} changeFilter={changeFilter} />

            <motion.div layout className='todo__container'>
              <AnimatePresence initial>
                {TODOS[filter]?.map(todo => (
                  <TodoItem todo={todo} key={todo.id} />
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.p layout className='completed'>
              Completed:{' '}
              <AnimatePresence mode='wait'>
                <motion.span
                  variants={completedVariant}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  key={completedTodos.length}>
                  {completedTodos.length}
                </motion.span>
              </AnimatePresence>
            </motion.p>
          </>
        )}
      </motion.div>
    </LayoutGroup>
  )
}

export default TodoList
