export class Register {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;

  constructor(firstName, lastName, email, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}