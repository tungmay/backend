import { PluginBase, Server, PluginNameVersion, Request, ResponseToolkit } from 'hapi';
import { request } from 'https';
import { ProductManager } from './product_manager';
import { Product } from './product';
import * as Joi from 'joi';


export class ProductPlugin implements PluginBase<object>, PluginNameVersion {
    name = "product";
    version = "1";

    // server: Server;

    register(server: Server, options: object) {
        // this.server = server;
        const productManager = new ProductManager([
            new Product("1", "เสื้อ", 299),
            new Product("2", "กระเป๋า", 499),
            new Product("3", "รองเท้า", 799),
        ]);
        this.registerRoute(server,productManager);
    }

    // registerRoute() {
    registerRoute(server: Server, productManager: ProductManager) {
        // this.server.route([
            server.route([
            {
                path: "/",
                method: "GET",
                handler: (request: Request, h: ResponseToolkit) => {
                    // return ["เสื้อ", "รองเท้า", "กระเป๋า"]
                    return productManager.getAll();
                }
            },
            {
                path: "/{productId}",
                method: "GET",
                handler: (request: Request, h: ResponseToolkit) => {
                    // switch (request.params["productId"]) {
                    //     case "1":
                    //         return "เสื้อ";
                    //     case "2":
                    //         return "รองเท้า";
                    //     case "3":
                    //         return "กระเป๋า";
                    // }
                    // return "Not Found";

                    const product = productManager.get(request.params["productId"]);
                    return product || "Not found" 
                },
                options: {
                    validate: {
                        params: {
                            productId: Joi.number().min(0)
                        }
                    }
                }
            }
        ]);
    }
}