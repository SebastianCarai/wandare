// To logout a user set the cookie expiration to a past date >> it will be automatically deleted

const logOut = () => {
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            if(cookie.includes('token=')){
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
        });
        localStorage.removeItem('token');
        localStorage.removeItem('loggedUserInfo');
        window.location.reload();
}

export default logOut