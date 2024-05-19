import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <authStore>
      <Component {...pageProps} />
    </authStore>
  );
}

export default MyApp;
