import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class FirestoreUserRepository implements UserRepository {
  private COLLECTION_NAME = 'users';
  private firestore: any;

  constructor({ firestore }: { firestore: any }) {
    this.firestore = firestore;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.firestore.collection(this.COLLECTION_NAME).doc(id).get();
    if (!user.exists) {
      return null;
    }

    return User.fromPrimitives(user.data());
  }
}
