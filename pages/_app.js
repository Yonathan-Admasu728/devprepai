import '../styles/globals.css';
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from '../contexts/ThemeContext';


function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
        <ThemeProvider>
      <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;







// import '../styles/globals.css';
// import { SessionProvider } from "next-auth/react";
// import { useEffect } from 'react';

// function MyApp({ Component, pageProps }) {

//   useEffect(() => {
//     function handleToggleClick() {
//       const body = document.body;
//       if (body.classList.contains('dark-mode')) {
//         body.classList.remove('dark-mode');
//       } else {
//         body.classList.add('dark-mode');
//       }
//     }

//     const toggleButton = document.getElementById('toggle-button');
    
//     if (toggleButton) {
//       toggleButton.addEventListener('click', handleToggleClick);
//     }

//     // Cleanup: Remove event listener when component unmounts
//     return () => {
//       if (toggleButton) {
//         toggleButton.removeEventListener('click', handleToggleClick);
//       }
//     };
//   }, []);

//   return (
//     <SessionProvider session={pageProps.session}>
//       <button className="cyan-black-button" id="toggle-button">Toggle Theme</button>
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// }

// export default MyApp;
