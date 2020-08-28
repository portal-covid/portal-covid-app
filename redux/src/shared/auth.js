class Auth {

    isLoggedIn() {
        return !!localStorage.getItem('token');
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('nome');
        localStorage.removeItem('cpf');
        localStorage.removeItem('ols');
        localStorage.removeItem('isChefia');
        localStorage.removeItem('olAtual');
        localStorage.removeItem('detalhes');
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

    getOls = () => {
        return localStorage.getItem('ols');
    }

    isChefia = () => {

        return localStorage.getItem('isChefia');
    }

    isGexSr = () => {

        return localStorage.getItem('isGexSr');
    }

    isPodeDecidir = () => {

        return localStorage.getItem('isPodeDecidir');
    }



    getSiape = () => {
        return localStorage.getItem('siape');
    }

    isDesenv = () => {
        return ['1380245','1380792','1526820','2276407'].includes(this.getSiape());

    }


    getOlAtual = () => {
        return localStorage.getItem('olAtual');
    }

    getDetalhes = () => {
        return localStorage.getItem('detalhes');
    }
}

export default new Auth();