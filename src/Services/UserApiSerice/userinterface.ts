export interface loginauth {
  [x: string]: any;
  Email: String;
  Password: String;
}

export interface registerauth {
  FirstName: String;
  LastName: String;
  Email: String;
  Password: String;
  Phone: String;
}

export interface forgetPassword {
  Email: String;
}
