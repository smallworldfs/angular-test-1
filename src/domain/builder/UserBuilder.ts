import { IUser, User } from "../entity/User";

export class UserBuilder {
    private user: IUser;
  
    constructor(name: string) {
        this.user = User.createNew(name)
    }
  
    setAge(age: number): UserBuilder {
      this.user.age = age;
      return this;
    }
  
    setGender(gender: string): UserBuilder {
      this.user.gender = gender;
      return this;
    }
  
    setCountry(country: string): UserBuilder {
      this.user.country = country;
      return this;
    }
  
    build(): IUser {
      return this.user;
    }
  }