import { useRouter } from "next/router";
import { useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const handleRouteChange = (...args) => {
    console.log(`url: ${args[0]}, shallow: ${args[1].shallow}`);
  };

  const handleRouteChangeError = (err, url) => {
    if (err.cancelled) {
      console.log(`Route to ${url} was cancelled!`);
    }
  };

  const handleHashChangeStart = (url, { shallow }) => {
    console.log(`handleHashChangeStart==>url: ${url}, shallow: ${shallow}`);
  };

  const handleHashChangeComplete = (url, { shallow }) => {
    console.log(`handleHashChangeComplete==>url: ${url}, shallow: ${shallow}`);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeError", handleRouteChangeError);
    router.events.on("hashChangeStart", handleHashChangeStart);
    router.events.on("hashChangeComplete", handleHashChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeError", handleRouteChangeError);
      router.events.off("hashChangeStart", handleHashChangeStart);
      router.events.off("hashChangeComplete", handleHashChangeComplete);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
