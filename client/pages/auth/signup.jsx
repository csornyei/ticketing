import { useState } from 'react';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(email, password);
    }

    return <form className="container" onSubmit={onSubmit}>
        <h1>Sign up</h1>
        <div className="form-group">
            <label>E-mail address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
        </div>
        <button className="btn btn-primary">Sign up</button>
    </form>
}

export default SignUp;