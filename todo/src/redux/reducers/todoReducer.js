import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/todos`)

    if (response.ok) {
      const todos = await response.json()
      todos.reverse()
      return { todos }
    }
  }
)

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async payload => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: payload.title, completed: false }),
    })

    if (response.ok) {
      const todo = await response.json()
      return { todo }
    }
  }
)

export const markCompletedAsync = createAsyncThunk(
  'todos/markCompletedAsync',
  async payload => {
    const { id, completed } = payload
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/todos/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      }
    )

    if (response.ok) {
      const todo = await response.json()
      return { todo }
    }
  }
)

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async payload => {
    const { id } = payload
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/todos/${id}`,
      {
        method: 'DELETE',
      }
    )

    if (response.ok) {
      const id = await response.json()
      return { id }
    }
  }
)

export const updateTodoAsync = createAsyncThunk(
  'todos/updateTodoAsync',
  async payload => {
    const { id, title } = payload
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/todos/update/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      }
    )

    if (response.ok) {
      const todo = await response.json()
      return { todo }
    }
  }
)

const initialState = null

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},

  //Extra reducers
  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      console.log('Todos fetched')
      return action.payload.todos
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      console.log('Todo added')
      state.unshift(action.payload.todo)
    },
    [markCompletedAsync.fulfilled]: (state, action) => {
      console.log('Todo completion updated')
      const todo = state.find(todo => todo.id === action.payload.todo.id)
      todo.completed = action.payload.todo.completed
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      console.log('Todo Deleted')
      const id = action.payload.id.toString()
      return state.filter(todo => todo.id !== id)
    },
    [updateTodoAsync.fulfilled]: (state, action) => {
      console.log('Todo title updated')
      const id = action.payload.todo.id.toString()
      const todo = state.find(t => t.id === id)
      todo.title = action.payload.todo.title
    },
  },
})

export default todoSlice.reducer
