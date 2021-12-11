import 'setimmediate';
import App from 'next/app';
import { store } from '../redux/store';
import {Provider} from 'react-redux';

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        //Anything returned here can be access by the client
        return {pageProps: pageProps};
    }
    render() {
        const {Component, pageProps} = this.props;

        return (
            <Provider store={store}>
                <Component {...pageProps}/>
            </Provider>
        );
    }

}

export default MyApp;