import { User } from "../domain/User";
import { GetUserQuery } from "./GetUserQuery";
import { UserRepository } from "../domain/UserRepository";

export class GetUserHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async run(query: GetUserQuery): Promise<User> {
    const user = await this.userRepository.findById(query.id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
