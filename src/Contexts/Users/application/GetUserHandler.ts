import { User } from "../domain/User";
import { GetUserQuery } from "./GetUserQuery";
import { UserRepository } from "../domain/UserRepository";

export class GetUserHandler {
  private userRepository: UserRepository;

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository;
  }

  async run(query: GetUserQuery): Promise<User> {
    const user = await this.userRepository.findById(query.id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
