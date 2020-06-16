class Auth {

    isLoggedIn() {
        return !!localStorage.getItem('token');
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('nome');
        localStorage.removeItem('cpf');
    }

    getToken = () => {
        return localStorage.getItem('token');
    }


    getNome = () => {
        return localStorage.getItem('nome');
    }

    getEmail = () => {
        return localStorage.getItem('email');
    }

    getCPF = () => {
        return localStorage.getItem('cpf');
    }
}

export default new Auth();