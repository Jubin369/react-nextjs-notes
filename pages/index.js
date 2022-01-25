import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const UserPage = () => {
    const [form1, setForm] = useState({ username: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createUser();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const createUser= async () => {
        try {
            console.log(form1);
            const res = await fetch('http://localhost:3000/api/user', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form1)
            })
            setIsSubmitting(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form1,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form1.username) {
            err.title = 'Username is required';
        }
        if (!form1.password) {
            err.description = 'Password is required';
        }

        return err;
    }

    return (
        <div className="form-container">
            <h1>Create User</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.title ? { content: 'Please enter a username', pointing: 'below' } : null}
                                label='User Name'
                                placeholder='User Name'
                                name='username'
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                label='Password'
                                placeholder='Password'
                                type="password"
                                name='password'
                                error={errors.description ? { content: 'Please enter a password', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Button type='submit'>Create</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

export default UserPage;