import { FirestoreUserRepository } from '../../../Contexts/Users/infrastructure/persistence/FirestoreUserRepository';
import { GetUserHandler } from '../../../Contexts/Users/application/GetUserHandler';
import { GetUserController } from '../../../Contexts/Users/infrastructure/http/GetUserController';

export default {
    userRepository: FirestoreUserRepository,
    getUserHandler: GetUserHandler,
    getUserController: GetUserController,
};
