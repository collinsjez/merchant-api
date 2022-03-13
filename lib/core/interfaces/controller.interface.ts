import { Router } from 'express';
import { controller } from 'inversify-express-utils';

interface IController  {
  path: string;
  router: Router;
}

export default IController;