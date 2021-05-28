export class UserTask {
  constructor(
    public title: string,
    public completed: boolean,
    public _id?: string,
    public id: number = 0
  ) {}
}
