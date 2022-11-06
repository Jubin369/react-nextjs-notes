import $ from "jquery";
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
    var $loginMsg = $(".loginMsg"),
      $login = $(".login"),
      $signupMsg = $(".signupMsg"),
      $signup = $(".signup"),
      $frontbox = $(".frontbox");

    $("#switch1").on("click", function () {
      $loginMsg.addClass("visibility");
      $frontbox.addClass("moving");
      $signupMsg.removeClass("visibility");

      $signup.removeClass("hide");
      $login.addClass("hide");
    });

    $("#switch2").on("click", function () {
      $loginMsg.removeClass("visibility");
      $frontbox.removeClass("moving");
      $signupMsg.addClass("visibility");

      $signup.addClass("hide");
      $login.removeClass("hide");
    });

    setTimeout(function () {
      $("#switch1").click();
    }, 1000);

    setTimeout(function () {
      $("#switch2").click();
    }, 3000);
  });

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
    <div className="signup-body">
      <div className="container">
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <>
            <div className="backbox">
              <div className="loginMsg">
                <div className="textcontent">
                  <p className="title">Don&apos;t have an account?</p>
                  <p>Sign up to save all your graph.</p>
                  <button id="switch1">Sign Up</button>
                </div>
              </div>
              <div className="signupMsg visibility">
                <div className="textcontent">
                  <p className="title">Have an account?</p>
                  <p>Log in to see all your collection.</p>
                  <button id="switch2">LOG IN</button>
                </div>
              </div>
            </div>

            <div className="frontbox">
              <div className="login">
                <form onSubmit={handleLogin}>
                  <h2>LOG IN</h2>
                  <div className="inputbox">
                    <input
                      type="text"
                      name="username"
                      placeholder="  EMAIL"
                      onChange={handleLoginChange}
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="  PASSWORD"
                      onChange={handleLoginChange}
                    />
                  </div>
                  <p>FORGET PASSWORD?</p>
                  <button type="submit">LOG IN</button>
                </form>
              </div>

              <div className="signup hide">
                <form onSubmit={handleSubmit}>
                  <h2>SIGN UP</h2>
                  <div className="inputbox">
                    <input
                      type="text"
                      name="username"
                      placeholder="  EMAIL"
                      onChange={handleChange}
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="  PASSWORD"
                      onChange={handleChange}
                    />
                  </div>
                  <button>SIGN UP</button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPage;
