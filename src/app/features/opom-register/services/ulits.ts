import Cookies from 'js-cookie';

export function getUser() {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
}

export function getToken() {
  return localStorage.getItem('token') || Cookies.get('auth_token');
}

export function isAuthenticated() {
  const token = getToken();
  const user = getUser();
  return !!(token && user);
}

export function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  Cookies.remove('auth_token');
}

export function getDisplayName() {
  const user = getUser();
  return user?.username || user?.email || 'User';
}

export function getRole() {
  const user = getUser();
  return user ? user.role : null;
}
