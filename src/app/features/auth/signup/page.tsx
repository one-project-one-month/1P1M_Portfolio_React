import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignUpFormContainer from './components/sign-up-form-container';

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const oauthProcessingRef = useRef(false);

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const code = searchParams.get('code');

  //   if (code && !oauthProcessingRef.current) {
  //     console.log('=== OAuth code received ===', code);
  //     console.log('Current pathname:', location.pathname);

  //     oauthProcessingRef.current = true;

  //     if (location.pathname === '/callback') {
  //       console.log('=== GOOGLE OAuth callback detected ===');
  //       exchangeGoogleCod(code)
  //         .then((data) => {
  //           console.log('Google authentication successful!', data);
  //           if (data.data.user) {
  //             localStorage.setItem('user', JSON.stringify(data.data.user));
  //           }
  //           if (data.data.token) {
  //             localStorage.setItem('token', data.data.token);
  //           }
  //           toast.success('Google authentication successful!');
  //           if (data.data.newUser) {
  //             navigate('/auth/setup-profile');
  //           } else {
  //             navigate('/');
  //           }
  //         })
  //         .catch((error) => {
  //           console.error('Google authentication failed:', error);
  //           toast.error(
  //             'Google authentication failed: ' +
  //               (error.message || 'Unknown error'),
  //           );
  //           navigate('/callback');
  //         })
  //         .finally(() => {
  //           // Reset processing flag
  //           oauthProcessingRef.current = false;
  //         });
  //     } else if (
  //       location.pathname === '/callback' ||
  //       location.pathname === '/login/oauth2/code/github'
  //     ) {
  //       console.log('=== GITHUB OAuth callback detected ===');
  //       exchangeGithubCode(code)
  //         .then((data) => {
  //           console.log('GitHub authentication successful!', data);
  //           if (data.data.user) {
  //             localStorage.setItem('user', JSON.stringify(data.data.user));
  //           }
  //           if (data.data.token) {
  //             localStorage.setItem('token', data.data.token);
  //           }

  //           toast.success('GitHub authentication successful!');
  //           if (data.data.newUser) {
  //             navigate('/auth/setup-profile');
  //           } else {
  //             navigate('/');
  //           }
  //         })
  //         .catch((error) => {
  //           console.error('GitHub authentication failed:', error);
  //           toast.error(
  //             'GitHub authentication failed: ' +
  //               (error.message || 'Unknown error'),
  //           );
  //         })
  //         .finally(() => {
  //           // Reset processing flag
  //           oauthProcessingRef.current = false;
  //         });
  //     } else {
  //       // Reset processing flag if no valid callback path
  //       oauthProcessingRef.current = false;
  //     }
  //   }
  // }, [location.pathname, location.search, navigate]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <SignUpFormContainer />
    </div>
  );
};

export default SignupPage;
