import { Express } from 'express';
import container from '../../../../app/container'

export const register = (server: Express) => {
    const getUserController = container.resolve('getUserController');

    server.get('/api/users/:id', getUserController.run.bind(getUserController));
}
