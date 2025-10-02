import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { registerAsync } from "../../Services/Actions/userAction";
import './auth.css'

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isCreated } = useSelector((state) => state.userReducer);
  const intialState = {
    email: "",
    password: "",
    cpass: "",
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

    console.log("Submit", inputForm);
    dispatch(registerAsync(inputForm));
  };

  useEffect(() => {
    if (isCreated) {
      navigate("/signIn");
    }
  }, [isCreated]);
  return (
    <>
      <Container className="auth-container">
  <div className="auth-card">
    <h2>Sign Up</h2>
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
      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Confirm Password"
          name="cpass"
          value={inputForm.cpass}
          onChange={handleChanged}
        />
      </Form.Group>
      <Button type="submit" className="auth-btn">Sign Up</Button>
    </Form>
    <p className="auth-footer">
      Have an Account? <Link to={"/signIn"}>Sign In</Link>
    </p>
  </div>
</Container>

    </>
  );
};

export default SignUp;