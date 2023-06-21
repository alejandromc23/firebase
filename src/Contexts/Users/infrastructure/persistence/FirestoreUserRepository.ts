import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class FirestoreUserRepository implements UserRepository {
  private COLLECTION_NAME = 'users';

  constructor(private readonly firestore: any) {}

  async findById(id: string): Promise<any> {
    const user = await this.firestore.collection(this.COLLECTION_NAME).doc(id).get();
    if (!user.exists) {
      return null;
    }

    return User.fromPrimitives(user.data());
  }
}
