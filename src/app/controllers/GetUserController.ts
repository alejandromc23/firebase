import { Request, Response } from "express";

import { Controller } from "./controller";
import { GetUserHandler } from "../../Contexts/Users/application/GetUserHandler";
import httpStatus from "http-status";

export class GetUserController implements Controller {
  constructor(private readonly getUser: GetUserHandler) {}

  async run(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await this.getUser.run(id);
    if (!user) {
      res.status(httpStatus.NOT_FOUND).send();
      return;
    }
    res.status(httpStatus.OK).send(user);
  }
}
