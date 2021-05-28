import { UserPost } from './user-post';
import { UserTask } from './user-task';

export class User {
  constructor(
    public name: string,
    public email: string,
    public street: string,
    public city: string,
    public zipCode: number,
    public tasks?: UserTask[],
    public posts?: UserPost[],
    public _id?: string
  ) {}

  static demo(): User {
    return new User(
      'Guy',
      'guy@email.com',
      '4 hafets haim',
      'netanya',
      32323,
      [new UserTask('do somthing', false, '')],
      [new UserPost('User post', 'this is  user post')]
    );
  }

  static blankUser(): User {
    return new User("","","","",0,[],[])
  }
}
