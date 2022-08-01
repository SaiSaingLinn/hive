export const ToDoRequest = type => ({ type })
export const ToDoError = (type, error) => ({ type, error })
export const ToDoSuccess = (type, data) => ({ type, data})