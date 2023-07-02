import { Request, Response } from "express";
import httpStatus from "http-status";

import { Controller } from "../../../Shared/infrastructure/http/controller"
import { GetUserHandler } from "../../application/GetUserHandler";
import { GetUserQuery } from "../../application/GetUserQuery";

export class GetUserController implements Controller {
  private getUserHandler: GetUserHandler;

  constructor({ getUserHandler }: { getUserHandler: GetUserHandler }) {
    this.getUserHandler = getUserHandler;
  }

  async run(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await this.getUserHandler.run(new GetUserQuery(id));
    if (!user) {
      res.status(httpStatus.NOT_FOUND).send();
      return;
    }
    res.status(httpStatus.OK).send(user);
  }
}
