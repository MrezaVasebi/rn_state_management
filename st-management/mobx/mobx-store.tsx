import { action, computed, makeObservable, observable } from "mobx";
import { userType } from "../../types";

class UsersStore {
  users: userType[] = [];
  copiedUsers: userType[] = [];

  constructor() {
    makeObservable(this, {
      onAddingUser: action,
      onEditingUser: action,
      usersLength: computed,
      onDeletingUser: action,
      copiedUsers: observable,
      onFilteringUsers: action,
      onUndoDeletingUser: action,
    });
  }

  onAddingUser = (value: userType) => {
    let newOne = [...this.copiedUsers];
    newOne.push(value);

    this.users = newOne;
    this.copiedUsers = newOne;
  };

  onEditingUser = (value: userType) => {
    // deleting user
    let newOne = [...this.copiedUsers];
    let index = newOne.findIndex((el) => el.id === value.id);
    newOne.splice(index, 1);

    newOne.push(value);
    this.users = newOne;
    this.copiedUsers = newOne;
  };

  onDeletingUser = (id: string) => {
    this.users = this.copiedUsers.filter((el) => el.id !== id);
    this.copiedUsers = this.copiedUsers.filter((el) => el.id !== id);
  };

  onUndoDeletingUser = (index: number, value: userType) => {
    let newOne = [...this.copiedUsers];
    newOne.splice(index, 0, value);

    this.users = newOne;
    this.copiedUsers = newOne;
  };

  onFilteringUsers = (type: string) => {
    if (type === "all") {
      this.copiedUsers = this.users;
    } else if (type === "male" || type === "female") {
      let res = this.users.filter((el) => el.gender === type);
      this.copiedUsers = res;
    }
  };

  get usersLength(): number {
    return this.copiedUsers.length;
  }
}

export const usersStore = new UsersStore();
