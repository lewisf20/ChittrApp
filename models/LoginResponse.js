class LoginResponse {
    constructor(id, token) {
        this.id = id; //id of logged in user
        this.token = token; //A token used to verify future calls
    }
}

export default LoginResponse;