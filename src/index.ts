import { Server, Request, ResponseToolkit } from "hapi";
import { ProductPlugin } from './product/index';

const server = new Server({
    port: "5000"
});


server.route([
    {
        path: "/",
        method: "GET",
        handler: (request: Request, h: ResponseToolkit) => {
            return "Hello It's me";
        }
    },
    {
        path: "/",
        method: "POST",
        handler: (request: Request, h: ResponseToolkit) => {
            // return ("This is a POST method");
            return request.payload;
        }
    },
    // {
    //     // URL localhost:5000/product/1
    //     path: "/product/{productId}",
    //     method: "GET",
    //     handler:  (request: Request, h: ResponseToolkit) => {
    //         return request.params;
    //     }
    // },
    // {
    //     // URL localhost:5000/product?category=รองเท้า&size=m
    //     path: "/products",
    //     method: "GET",
    //     handler:  (request: Request, h: ResponseToolkit) => {
    //         return request.query;
    //     }
    // }

]);


// server.register(new ProductPlugin(), { routes: { prefix: "/product" } })
//     .then(() => { //promise
//         server.start().then(
//             () => { console.log("Server Start"); },
//             (err) => { console.log("Server Start err" + err); });
//     });


//ใช้await จัดการ promise 
// async function init() {
//     try {
//         await server.register(new ProductPlugin(), { routes: { prefix: "/product" } })
//         await server.start();
//         console.log("Server Start");
//     } catch(err) {
//         console.log("Server Start err" + err);
//     }
// }

async function initServer() {
    await server.register(new ProductPlugin(), { routes: { prefix: "/product" } })
    await server.start();
    console.log("Server Start");

}
try {
    initServer();
} catch (err) {
    console.log("Server Start err" + err);
}