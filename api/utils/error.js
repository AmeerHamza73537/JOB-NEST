export const errorHandler = (res, error)=>{
    const error = new Error()
    error.statusCode = 500
    error.message = 'Internal Server Error'
    return error;
}