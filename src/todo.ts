interface ITodo {
  id: number
  title: string
  description: string
  status: boolean
  createDate: number
  updateDate?: number
}

/** Todo Class For managing Tasks(Add, Edit, Remove) */
class Todo {
  /** @private Tasks list*/
  #list: ITodo[] = []
  /** @private Total Tasks count*/
  static #count: number = 0

  constructor() {
    try {
      // Get Database(in our case is sessionStorage)
      const todStore = JSON.parse(atob(sessionStorage.getItem("Todo") || "") || "[]")

      if (todStore && todStore?.length > 0) {
        // Query list
        this.#list = todStore
        // Query list count
        Todo.#count = todStore.length
      } 
    } catch (error) {
      // Create empty Database(in our case is sessionStorage) if we had data corruption
      sessionStorage.setItem("Todo", btoa(JSON.stringify(this.#list)))
    }
  }

  /**
   * Create a Tasks.
   * @param {string} title - The title of Tasks.
   * @param {string} description - The description of Tasks.
   */
  add = (title: string, description: string) => {
    // Add Item to list
    this.#list.push({
      id: ++Todo.#count,
      title,
      description,
      status: false,
      createDate: new Date().getTime()
    })

    // Write changes to Database(in our case is sessionStorage)
    sessionStorage.setItem("Todo", btoa(JSON.stringify(this.#list)))
  }

  /**
   * Get list of Tasks.
   */
  get = () => {
    // Deep copy for access protection
    return this.#list.map(i => { return { ...i } })
  }

  /**
   * Change a Task status.
   * @param {number} id - The id of Task.
   * @param {status} status - The status of Task(done, undone).
   */
  changeStatus = (id: number, status: boolean) => {
    // Find query
    const idx = this.#list.findIndex(item => item.id === id)

    // Can't find error
    if (idx < 0) throw new Error("Can't find task for status!")

    // Change Status
    this.#list[idx].status = status
    // Add update date
    this.#list[idx].updateDate = new Date().getTime()

    // Write changes to Database(in our case is sessionStorage)
    sessionStorage.setItem("Todo", btoa(JSON.stringify(this.#list)))
  }

  /**
   * Remove a Task.
   * @param {number} id - The id of Task.
   */
  remove = (id: number) => {
    // Find query
    const idx = this.#list.findIndex(item => item.id === id)

    // Can't find error
    if (idx < 0) throw new Error("Can't find task for remove!")

    // Remove Item from list
    this.#list.splice(idx, 1)

    // Write changes to Database(in our case is sessionStorage)
    sessionStorage.setItem("Todo", btoa(JSON.stringify(this.#list)))
  }
}


export default Todo