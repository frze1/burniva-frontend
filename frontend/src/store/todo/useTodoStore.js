import { create } from 'zustand'

const useTodoStore = create((set, get) => ({
  todos: [],

  setTodos: (todos) => set({ todos }),

  addTodo: (todo) => set((state) => ({
    todos: [{ ...todo, id: Date.now(), done: false }, ...state.todos]
  })),

  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(t => t.id === id ? { ...t, done: !t.done } : t)
  })),

  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(t => t.id !== id)
  })),

  getDoneCount:  () => get().todos.filter(t => t.done).length,
  getTotalCount: () => get().todos.length,
}))

export default useTodoStore