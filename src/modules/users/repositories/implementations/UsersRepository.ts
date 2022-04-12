import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    const userCreated = {
      ...user,
      name,
      email,
    };

    this.users.push(userCreated);

    return userCreated;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  turnAdmin(receivedUser: User): User {
    const Admin = {
      ...receivedUser,
      admin: true,
      updated_at: new Date(),
    };

    const index = this.users.findIndex((user) => user.id === receivedUser.id);

    this.users.splice(index, 1, Admin);

    return Admin;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
