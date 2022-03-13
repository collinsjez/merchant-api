import express from 'express';
import IController from './controller.interface';
export abstract class BaseController implements IController {

    public router = express.Router();
    constructor(){}
    path: string;
    abstract initializeRoutes(): void;
}