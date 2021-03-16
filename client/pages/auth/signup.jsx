import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: { email, password },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        await doRequest();
    }

    return <form className="container jumbotron" onSubmit={onSubmit}>
        <h1>Sign up</h1>
        <div className="form-group">
            <label>E-mail address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
        </div>
        {errors}
        <button className="btn btn-primary">Sign up</button>
    </form>
}

export default SignUp;