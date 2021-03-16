import axios from 'axios';
import { useState } from 'react';

const useRequest = ({url, method, body, onSuccess}) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            const response = await axios[method](url, body);
            setErrors(null);
            if (onSuccess) {
                onSuccess();
            }
            return response.data;
        } catch (err) {
            setErrors(
                <div className="my-2 alert alert-danger">
                    {err.response.data.errors.map(error => {
                        return <h5> {error.message} </h5>
                    })}
                </div>
            );
        }
    };

    return {errors, doRequest};
}


export default useRequest;