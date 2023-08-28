interface ITodo {
  id: number
  title: string
  description: string
  status: boolean
  createDate: number
  updateDate?: number
}


class Todo {
  #list: ITodo[] = []
  static #count: number = 0

  constructor() {
    try {
      const todStore = JSON.parse(atob(sessionStorage.getItem("Todo") || "") || "[]")

      if (todStore && todStore?.length > 0) {
        this.#list = todStore
        Todo.#count = todStore.length
      } 
    } catch (error) {
      sessionStorage.setItem("Todo", btoa(JSON.stringify(this.#list)))
    }
  }

  add = (title: string, description: string) => {
    this.#list.push({
      id: ++Todo.#count,
      title,
      description,
      status: false,
      createDate: new Date().getTime()
    })


    sessionStorage.setItem("Todo", btoa(JSON.stringify(this.#list)))
  }

  get = () => {
    return this.#list.map(i => { return { ...i } })
  }

  changeStatus = (id: number, status: boolean) => {
    const idx = this.#list.findIndex(item => item.id === id)

    if (idx < 0) throw new Error("Can't find task for status!")
    this.#list[idx].status = status
    this.#list[idx].updateDate = new Date().getTime()


    sessionStorage.setItem("Todo", btoa(JSON.stringify(this.#list)))
  }

  remove = (id: number) => {
    const idx = this.#list.findIndex(item => item.id === id)

    if (idx < 0) throw new Error("Can't find task for remove!")
    this.#list.splice(idx, 1)


    sessionStorage.setItem("Todo", btoa(JSON.stringify(this.#list)))
  }
}


export default Todo