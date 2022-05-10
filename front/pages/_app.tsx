import '../styles/globals.css';
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import wrapper from '../store/configureStore';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
