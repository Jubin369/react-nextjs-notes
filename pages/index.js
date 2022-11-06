import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { Button, Form, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const UserPage = () => {
  const [form1, setForm] = useState({ username: "", password: "" });
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMessage] = useState({ msg: "" });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    setMessage({ msg: "" });
  }, [errors]);

  const createUser = async () => {
    try {
      const res = await fetch(`/api/user`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form1),
      });
      const { message } = await res.json();
      if (message == "user exits") {
        setMessage({ msg: message });
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
    if (Object.keys(errors).length === 0) {
      createUser();
    } else {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form1,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let errs = validateLogin();
    setErrors(errs);
    setIsSubmitting(true);
    try {
      const res = await fetch(
        `/api/user?username=${encodeURIComponent(
          loginForm.username
        )}&&password=${encodeURIComponent(loginForm.password)}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = await res.json();
      //console.log(data,data[0].username);
      if (data.length) {
        router.push("/home/" + data[0].username);
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};

    if (!form1.username) {
      err.username = "Username is required";
    }
    if (!form1.password) {
      err.password = "Password is required";
    }

    return err;
  };

  const validateLogin = () => {
    let err = {};

    if (!loginForm.username) {
      err.username = "Username is required";
    }
    if (!loginForm.password) {
      err.password = "Password is required";
    }

    return err;
  };

  return (
    <div className="form-container">
      {isSubmitting ? (
        <Loader active inline="centered" />
      ) : (
        <div className="login-table">
          <div className="login-sub">
            <h1>Create User</h1>
            <div>
              <Form onSubmit={handleSubmit}>
                <Form.Input
                  fluid
                  error={
                    errors.title
                      ? {
                          content: "Please enter a username",
                          pointing: "below",
                        }
                      : null
                  }
                  label="User Name"
                  placeholder="User Name"
                  name="username"
                  onChange={handleChange}
                />
                <Form.Input
                  fluid
                  label="Password"
                  placeholder="Password"
                  type="password"
                  name="password"
                  error={
                    errors.description
                      ? {
                          content: "Please enter a password",
                          pointing: "below",
                        }
                      : null
                  }
                  onChange={handleChange}
                />
                <Button type="submit">Create</Button>
              </Form>
              <span>{msg.msg}</span>
            </div>
          </div>
          <div className="login-sub">
            <h1>Login User</h1>
            <div>
              <Form onSubmit={handleLogin}>
                <Form.Input
                  fluid
                  error={
                    errors.title
                      ? {
                          content: "Please enter a username",
                          pointing: "below",
                        }
                      : null
                  }
                  label="User Name"
                  placeholder="User Name"
                  name="username"
                  onChange={handleLoginChange}
                />
                <Form.Input
                  fluid
                  label="Password"
                  placeholder="Password"
                  type="password"
                  name="password"
                  error={
                    errors.description
                      ? {
                          content: "Please enter a password",
                          pointing: "below",
                        }
                      : null
                  }
                  onChange={handleLoginChange}
                />
                <Button type="submit">Login</Button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
