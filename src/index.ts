import { Server, Request, ResponseToolkit } from "hapi";
import { ProductPlugin } from './product/index';
import { plugin } from 'hapi-auth-basic';
import { options } from "joi";


const server = new Server({
    port: "5000",
    routes: {
        cors: {
            origin: ["*"] //set route ทั้งหมด
        }
    }
});



async function initServer() {
    await server.register(plugin);
    server.auth.strategy('simple', 'basic', { validate });
 
    server.route([
 
        {
            path: "/",
            method: "GET",
            handler: (request: Request, h: ResponseToolkit) => {
                // console.log(request.auth.credentials);
                return "<a href='/product'>Product</a>"
 
            },
            options: {
                auth: 'simple'


            }
        }
 
 
    ]);
    await server.register(new ProductPlugin(), { routes: { prefix: "/product" } });
    await server.start();
    console.log("Server Start!!");
 
 }
 try {
    initServer();
 } catch (err) {
    console.log("Server error" + err);
 }
 
 
 const validate = async (request, username, password) => {
    let isValid = false;
    let credentials = {};
    if (username == "Maple" && password == "1234") {
        isValid = true;
        credentials = { 
            userId: "u123", 
            name: "Steve Hobkins" }
    }
    return { isValid, credentials };
 };
