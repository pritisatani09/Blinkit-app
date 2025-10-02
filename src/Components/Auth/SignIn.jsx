import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { signInAsync, signInWithGoogleAsync } from "../../Services/Actions/userAction";
import './auth.css'

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, error} = useSelector(state => state.userReducer);
  const intialState = {
    email: "",
    password: "",
  };
  const [inputForm, setInputForm] = useState(intialState);


  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInAsync(inputForm));
  };

  const handleGoogleLogin = () => {
    dispatch(signInWithGoogleAsync());
  }

  useEffect(() => {
    if(user){
        navigate("/")
    }
  }, [user]);
  return (
    <>
      <Container className="auth-container">
  <div className="auth-card">
    <h2>Sign In</h2>
    {error ? <p className="text-danger text-center">{error}</p> : ""}
    <Form className="auth-form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Email"
          name="email"
          value={inputForm.email}
          onChange={handleChanged}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          name="password"
          value={inputForm.password}
          onChange={handleChanged}
        />
      </Form.Group>
      <Button type="submit" className="auth-btn">Sign In</Button>
    </Form>
    <Button 
  onClick={handleGoogleLogin} 
  className="google-btn d-flex align-items-center justify-content-center gap-2"
>
  <FcGoogle size={22} /> Sign in with Google
</Button>

    <p className="auth-footer">
      Create an Account? <Link to={"/signUp"}>Sign Up</Link>
    </p>
  </div>
</Container>

    </>
  );
};

export default SignIn;