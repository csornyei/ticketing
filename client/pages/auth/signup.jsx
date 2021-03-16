import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        console.log(email, password);
        try {
            const response = await axios.post('/api/users/signup', {
                email, password
            });
        } catch (error) {
            console.log(error.response.data.errors);
            setErrors(error.response.data.errors);
        }

    }

    const renderErrors = () => {
        console.log('Rendering errors', errors);
        return errors.map(error => {
            return <h5> {error.message} </h5>
        })
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
        <div className="my-2 alert alert-danger">
            {errors.length > 0 && renderErrors()}
        </div>
        <button className="btn btn-primary">Sign up</button>
    </form>
}

export default SignUp;