import http, { IncomingMessage, ServerResponse } from "node:http";

const PORT = 3000;
const server = http.createServer((req: IncomingMessage, res: ServerResponse)=>{
    const method = req.method ?? "GET";

    //  http://localhost:3000/users -> req.url:/users
    // http://localhost:3000/users?id=1 -> req.url: /users?id1

    const requestUrl = res.url()
    const pathName = requestUrl.pathName

    res.setHeader("Content-Type", "text/plain")

    if(method === "GET" && pathName === "/health"){
        res.statusCode = 200;
        res.end("server is healthy")
        return 
    }

    if(method === "GET" && pathName === "/users"){
        res.statusCode = 200;
        res.end("Lists of users")
        return 
    }

    if(method === "POST" && pathName === "/users"){
        res.statusCode = 201;
        res.end("user created successfully!!!!!!")
        return 
    }

    res.statusCode = 404
    // 404 -> not found here 
    res.end("route not found")
})

server.listen(PORT , () =>{
    console.log(`server is now running on the port ${PORT}`);
})