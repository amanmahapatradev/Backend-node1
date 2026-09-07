// import pullAt from "lodash/pullAt";
import http, { IncomingMessage,type ServerResponse } from "node:http";

const PORT = 3000;

// http.createServer create  low level http server
// callback is going to run for every incoming http req

// req -> request object

// method -> get ,post, put, options, delete
// / , /users
// headers -> actual meta data send by the client
// req body -> data post/pullAt

// res -> response object
// status code , response Headers, response body

const server = http.createServer((req: IncomingMessage, res: ServerResponse)=>{
    const method = req.method;

    // get -> read data 
    // post -> create data
    // put -> response data
    // patch -> update parial data
    // delete -> delete data

    const url = req.url;
    // in which path the client is actually requesting

    const userAgent = req.headers["user-agent"]

    res.statusCode = 200
    // set http status vode
    // 200 -> request is successful
    // 201,400,401,429,500

    res.setHeader('Content-Type', 'text/plain')
    res.end(`Basic http server: ${method}: ${url}:${userAgent}`)
},);
server.listen(PORT,()=>{
    console.log(`server is now running on port ${PORT}`)
})