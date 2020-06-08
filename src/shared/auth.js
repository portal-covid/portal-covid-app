class Auth {

    isLoggedIn() {
        return !!localStorage.getItem('authToken');
    }

    logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('nome');
        localStorage.removeItem('role');
        localStorage.removeItem('roleId');
    }

    getToken = () => {
        return localStorage.getItem('authToken');
    }

    getUserId = () => {
        return localStorage.getItem('userId');
    }

    getNome = () => {
        return localStorage.getItem('nome');
    }

    getRole = () => {
        return localStorage.getItem('role');
    }

    getRoleId = () => {
        return localStorage.getItem('roleId');
    }
}

export default new Auth();