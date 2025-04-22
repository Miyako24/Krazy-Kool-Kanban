import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    // TODO: return the decoded token
  }

  loggedIn() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    // TODO: return a value that indicate
    // s if the user is logged in
  }
  
  isTokenExpired(token: string) {
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    if (decoded.exp && decoded.exp < currentTime) {
      return true; // Token is expired
    }
    return false; // Token is not expired

    // TODO: return a value that indicates if the token is expired
  }

  getToken(): string {
    const token = localStorage.getItem('id_token');
    if (!token) {
      return '';
    }
    // TODO: return the token
  }

  login(idToken: string) {
    // Save the token to localStorage
    localStorage.setItem('id_token', idToken);
    // Decode the token to get the user profile
    const decoded: JwtPayload = jwtDecode(idToken);


    // TODO: set the token to localStorage
    // TODO: redirect to the home page

  }

  logout() {

    // Remove the token from localStorage
    localStorage.removeItem('id_token');


    // TODO: remove the token from localStorage

    // TODO: redirect to the login page
    
  }
}

export default new AuthService();
