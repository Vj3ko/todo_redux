import './App.scss'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

function App() {
  return (
    <main className='main'>
      <h1>Todo | App</h1>

      <TodoForm />
      <TodoList />
    </main>
  )
}

export default App
