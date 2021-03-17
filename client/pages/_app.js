import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/headers';

const AppComponent = ({ Component, pageProps, data }) => {
    return (
        <div>
            <header>
                <Header currentUser={data.currentUser} />
            </header>
            <main className="container">
                <Component {...pageProps} />
            </main>
        </div>
    )
}

// getInitialProps on AppComponent is different than anywhere else
AppComponent.getInitialProps = async (context) => {
    const { ctx, Component } = context;
    const axios = buildClient(ctx);
    const { data } = await axios.get('/api/users/currentuser');
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return {data, pageProps};
}

export default AppComponent;