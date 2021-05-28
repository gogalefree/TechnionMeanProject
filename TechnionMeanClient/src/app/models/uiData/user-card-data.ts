import { User } from "../entities/user";

export class UserCardData {
    constructor(public user: User, public rowSpan: number = 1, public isDetaillVisible = false, public isSelected = false){}
}
