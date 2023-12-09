export type type_address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

export type type_user_company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type type_user = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  username: string;
  address: type_address;
  company: type_user_company;
};
