class User {
  id;
  constructor(given_name, family_name, email, password) {
    this.given_name = given_name;
    this.family_name = family_name;
    this.email = email;
    this.password = password;
  }
}

export default User;
