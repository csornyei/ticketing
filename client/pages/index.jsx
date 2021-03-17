import { Fragment } from 'react';
import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
    return (
        <div>
            { currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>}
            { !currentUser &&
                <Fragment>
                    <a className="btn btn-primary mx-2" href="/auth/signup">Sign up</a>
                    <a className="btn btn-primary mx-2" href="/auth/signin">Sign in</a>
                </Fragment>
            }
        </div>
    )
};

LandingPage.getInitialProps = async (context) => {
    const axios = buildClient(context);
    const { data } = await axios.get('/api/users/currentuser');
    return data;
}

export default LandingPage;
