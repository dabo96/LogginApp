import express, { Application } from 'express';
import routesProducts from "../routes/product";
import routesUser from "../routes/user";
import cors from 'cors';
import { Product } from './product';
import { User } from './user';

class Server{
    private app: express.Application;
    private port: string;
    private whiteList = ['http://localhost:3000','http://localhost:3001'];

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('App corriendo en el puerto ' + this.port);
        });
    }

    routes(){
        this.app.use('/api/products', routesProducts);
        this.app.use('/api/users', routesUser);
    }

    midlewares(){
        //
        this.app.use(express.json());
        //
        this.app.use((req, res, next) =>{
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            next();
        });
    }

    async dbConnect(){
        try {
            await Product.sync();
            await User.sync();
            
        } catch (error) {
            console.error('Unable to connect to database');
        }
    }
}

export default Server;