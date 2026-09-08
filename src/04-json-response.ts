import http, { IncomingMessage, ServerResponse } from "node:http";

const PORT = 5003;

type User = {
    id : number;
    name : string;
    email : string;
};

type ApiResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
};

const users: User[] = [
    {id: 1, name: "Aman", email: "aman145@gmail.com"},
    {id: 2, name: "Ayush", email: "ayush545@gmail.com"},
    {id: 3, name: "John", email: "john2145@gmail.com"},
    {id: 4, name: "Michel", email: "michel24478@gmail.com"},
    {id: 5, name: "zems", email: "zems_247@gmail.com"},
];

function sendJson<T>(
    res: ServerResponse,
    statusCode:number,
    body: ApiResponse<T>
): void {
    res.statusCode = statusCode
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(body))
}
const server = http.createServer((req: IncomingMessage, res:ServerResponse) =>{
    const method = req.method ?? "GET";
    const requestUrl = new URL(req.url ?? "/", `http:${req.headers.host}`)
    const pathName = requestUrl.pathname;

    if(method === "GET" && pathName === "/"){
        sendJson(res, 200,{
            success: true,
            message: "sever is running",
            data: {
                routes: ["GET/users"],

            }
        });
        return
    }
    if(method === "GET" && pathName === "/users"){
        sendJson(res, 200,{
            success: true,
            message: "users fetched successfully",
            data: users
        })
        return
    }
    
    sendJson<null>(res,404,{
        success: false,
        message: "Route not found",
        error: `${method} ${pathName} is not exists`
    })
})

server.listen(PORT, () =>{
    console.log(`server is not running on pot ${PORT}`);
});