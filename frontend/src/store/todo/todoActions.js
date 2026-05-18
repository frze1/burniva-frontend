import todoService from '../../services/todo/todoService'
import useTodoStore from './useTodoStore'

export const fetchTodos = async () => {
  try {
    const data = await todoService.getAll()
    useTodoStore.getState().setTodos(data)
  } catch {
    // Biarkan pakai data lokal kalau API belum siap
  }
}

export const createTodo = async (todoData) => {
  try {
    const newTodo = await todoService.create(todoData)
    useTodoStore.getState().addTodo(newTodo)
    return newTodo
  } catch {
    useTodoStore.getState().addTodo(todoData)
  }
}

export const toggleTodo = async (id) => {
  useTodoStore.getState().toggleTodo(id)
  try {
    await todoService.toggle(id)
  } catch {
    useTodoStore.getState().toggleTodo(id) // rollback
  }
}

export const deleteTodo = async (id) => {
  useTodoStore.getState().deleteTodo(id)
  try {
    await todoService.delete(id)
  } catch {
    console.error('Failed to delete todo')
  }
}