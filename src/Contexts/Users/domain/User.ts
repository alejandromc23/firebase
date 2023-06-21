export class User {
  constructor(readonly id: string, readonly email: string, readonly password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  static fromPrimitives({ id, email, password }: { id: string, email: string, password: string }): User {
    return new User(id, email, password);
  }
}
