import { Router } from "express";
import { ProductRoute } from "../modules/product/product.route";


const router = Router()

const moduleRoutes = [
    {
        path: '/products',
        route: ProductRoute
    },
]


moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router