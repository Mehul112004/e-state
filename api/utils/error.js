export const errorHandler=(statusCode,message)=>{
    console.log("Inside the custom errorHandler function")
    const error = new Error();
    error.statusCode=statusCode;
    error.message=message;
    return error;
}