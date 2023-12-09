export type type_address = {
  city: string;
  suite: string;
  geo: type_geo;
  street: string;
  zipcode: string;
};

export type type_user_company = {
  name: string;
  bs: string;
  catchPhrase: string;
};

export type type_geo = {
  lat: string;
  lng: string;
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
