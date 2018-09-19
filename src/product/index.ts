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
            // new Product("1", "เสื้อ", 299),
            // new Product("2", "กระเป๋า", 499),
            // new Product("3", "รองเท้า", 799),
            new Product ( "1", "รองเท้า", "รองเท้า", 299,  "http://www.baanlaesuan.com/app/uploads/2017/03/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B9%89%E0%B8%B2%E0%B9%83%E0%B8%9A.jpg" ),
            new Product ( "2", "เสื้อ", "เสื้อ", 399, "https://cultees.co/canvas/5ac4b36e03eb0-front-img.png" ),
            new Product ( "3", "กระเป๋า", "กระเป๋า", 799,  "https://f.btwcdn.com/store-38095/product/1fe4e5fb-cb7c-d9a5-f19f-5a3749f324b8.jpg" )
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