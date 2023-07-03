import express, { Request, Response, Router as ExpressRouter } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compress from 'compression';
import cors from 'cors';
import errorHandler from 'errorhandler';
import Router from 'express-promise-router';
import httpStatus from 'http-status';
import http from 'http';
import path from 'path';
import { glob } from 'glob';

export default class Server {
  readonly port: number;
  private app: express.Express;
  httpServer?: http.Server;

  constructor(port: number) {
    this.port = port;
    this.app = express();

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.frameguard({ action: 'deny' }));
    this.app.use(helmet.ieNoOpen());
    this.app.use(helmet.hsts({ maxAge: 7776000001 }));
    this.app.use(compress());

    const router = Router();
    router.use(cors());
    router.use(errorHandler());
    this.app.use(router);
    this.registerRoutes(router);

    router.use((err: Error, req: Request, res: Response, next: Function) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.app.listen(this.port, () => {
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }

  private registerRoutes(router: ExpressRouter): void {
    const routes = glob.sync('**/routes/*', { cwd: path.join(__dirname, '..', 'Contexts') });

    routes.forEach(routePath => {
      const route = require(path.join(__dirname, '..', 'Contexts', routePath));
      route.register(router);
    });
  }
}
