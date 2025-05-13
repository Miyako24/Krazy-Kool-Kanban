import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  //Return the decoded user profile
  getProfile() {
    const token = this.getToken();
    if (!token) return null;
    return jwtDecode(token);
  }

  //Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  //Check if token is expired
  isTokenExpired(token: string) {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp ? decoded.exp < currentTime : true;
    } catch (err) {
      console.error("Error decoding token", err);
      return true;
    }
  }

  //Get token from localStorage
  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  //Save token and redirect
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/'); // Redirect to home page
  }

  //Remove token and redirect to login
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();