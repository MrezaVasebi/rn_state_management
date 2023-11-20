export type userType = {
  id: string;
  email: string;
  mobile: string;
  gender: string;
  address: string;
  fullName: string;
};

// this section in used in context-api
export type UserContextType = {
  users: userType[];
  copiedUsers: userType[];
  onDeleteUser: (id: string) => void;
  onSaveUser: (user: userType) => void;
  onEditUser: (user: userType) => void;
  onFilterByGender: (type: string) => void;
  undoDeletedUser: (index: number, user: userType) => void;
};
