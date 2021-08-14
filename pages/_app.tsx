import "../styles/globals.css";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";

function Home({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default Home;
