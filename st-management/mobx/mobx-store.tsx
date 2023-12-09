import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { invokeApi } from "../../hooks";
import { userType } from "../../types";
import { type_user } from "../../types/api";

class UsersStore {
  users: userType[] = [];
  copiedUsers: userType[] = [];

  loading: boolean = false;
  usersList: type_user[] = [];

  constructor() {
    makeObservable(this, {
      usersLength: computed, // returned data

      copiedUsers: observable, // local

      loading: observable, // api
      usersList: observable, // api

      onAddingUser: action,
      onEditingUser: action,
      onDeletingUser: action,
      onFilteringUsers: action,
      onUndoDeletingUser: action,
      onFetchUsersList: action, // api
    });
  }

  onAddingUser = (value: userType) => {
    let newOne = [...this.copiedUsers];
    newOne.push(value);
    this.onUpdatingUser(newOne);
  };

  onEditingUser = (value: userType) => {
    // deleting user
    let newOne = [...this.copiedUsers];
    let index = newOne.findIndex((el) => el.id === value.id);
    newOne.splice(index, 1);

    newOne.push(value);
    this.onUpdatingUser(newOne);
  };

  onDeletingUser = (id: string) => {
    this.users = this.copiedUsers.filter((el) => el.id !== id);
    this.copiedUsers = this.copiedUsers.filter((el) => el.id !== id);
  };

  onUndoDeletingUser = (index: number, value: userType) => {
    let newOne = [...this.copiedUsers];
    newOne.splice(index, 0, value);
    this.onUpdatingUser(newOne);
  };

  onFilteringUsers = (type: string) => {
    if (type === "all") {
      this.copiedUsers = this.users;
    } else if (type === "male" || type === "female") {
      let res = this.users.filter((el) => el.gender === type);
      this.copiedUsers = res;
    }
  };

  onUpdatingUser = (value: userType[]) => {
    this.users = value;
    this.copiedUsers = value;
  };

  onFetchUsersList = async () => {
    runInAction(() => {
      this.loading = true;
    });
    const response = await invokeApi<type_user[]>("users");
    if (response === undefined || typeof response === "string") {
      runInAction(() => {
        this.loading = false;
        this.usersList = [] as type_user[];
      });
    } else {
      runInAction(() => {
        this.loading = false;
        this.usersList = response;
      });
    }
  };

  get usersLength(): number {
    return this.copiedUsers.length;
  }
}

export const usersStore = new UsersStore();
