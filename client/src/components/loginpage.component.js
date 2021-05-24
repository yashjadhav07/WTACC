import React, { Component } from "react";
import axios from "axios";

import {
    Alert,
    Container,
    Row,
    OverlayTrigger,
    Tooltip,
    Form,
    Button,
    Nav,
    InputGroup,
} from "react-bootstrap";

import email_default from "../assets/images/req_for_adduser/email_default.jpg";
import password_default from "../assets/images/req_for_adduser/password_default.jpg";
import email_formatcorrect from "../assets/images/req_for_adduser/email_formatcorrect.jpg";
import email_formatwrong from "../assets/images/req_for_adduser/email_formatwrong.jpg";
import password_formatcorrect from "../assets/images/req_for_adduser/password_formatcorrect.jpg";
import password_formatwrong from "../assets/images/req_for_adduser/password_formatwrong.jpg";
const port = process.env.REACT_APP_SERVER_PORT;

export default class Login extends Component {
    state = {
        email: "",
        password: "",
        emailIcon: (
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="tooltip-disabled">Enter Email</Tooltip>}
            >
                <span className="d-inline-block">
                    <img src={email_default} height="50px" />
                </span>
            </OverlayTrigger>
        ),
        passwordIcon: (
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="tooltip-disabled">Enter Password</Tooltip>}
            >
                <span className="d-inline-block">
                    <img src={password_default} height="50px" />
                </span>
            </OverlayTrigger>
        ),
        // loginSuccess
        emailFormatMatched: true,
        passwordFormatMatched: true,
        flag: false,
        alertType: "",
        message: "",
        newUserAdded: JSON.parse(localStorage.getItem("newUserAdded")),
        loadComponent: "",
    };
    
    timer() {
        setTimeout(() => {
            this.setState({ newUserAdded: false, alertType: "", message: "" });
            localStorage.removeItem("newUserAdded");
        }, 7000);
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });

        if (name == "email") {
            this.setState({
                emailIcon: (
                    <OverlayTrigger
                        placement="right"
                        overlay={
                            <Tooltip id="tooltip-disabled">
                                {value.match(
                                    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
                                ) != null
                                    ? "Valid Format ✔"
                                    : "Please enter email correct format"}
                            </Tooltip>
                        }
                    >
                        <span className="d-inline-block">
                            <img
                                src={
                                  value.match(
                                      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
                                  ) != null
                                      ? email_formatcorrect
                                      : email_formatwrong
                                }
                              height="50px"
                            />
                        </span>
                    </OverlayTrigger>
                ),
                emailFormatMatched: !(
                    value.match(
                        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
                    ) != null
                ),
            });
        }
        if (name == "password") {
            this.setState({
                passwordIcon: (
                    <OverlayTrigger
                        placement="right"
                        overlay={
                            <Tooltip id="tooltip-disabled">
                                {value != ""
                                    ? "Valid password Format ✔"
                                    : "Password Cannot be empty"}
                            </Tooltip>
                        }
                    >
                      <span className="d-inline-block">
                          <img
                              src={
                                  value != "" ? password_formatcorrect : password_formatwrong
                              }
                              height="50px"
                          />
                      </span>
                    </OverlayTrigger>
                ),
                passwordFormatMatched: !(value != ""),
            });
        }
    };

    submit = (event) => {
        event.preventDefault();
        const payLoads = {
            email: this.state.email,
            password: this.state.password,
        };
        axios({
            url: `http://localhost:${port}/users/login`,
            method: "POST",
            data: payLoads,
        })
            .then((res) => {
                this.setState({ message: "Login success", alertType: "success" });
                this.state.flag = true;
                localStorage.setItem("login", JSON.stringify(this.state.flag));
                localStorage.setItem(
                    "auth-token",
                    JSON.stringify({ ...res.headers, "auth-token": res.data })
                );
                console.log({ ...res.headers, "auth-token": res.data });
                window.location.reload(false);
            })
            .catch((res) => {
                this.setState({
                    message: "Invalid Email or Password",
                    alertType: "danger",
                    flag: false,
                });

                console.log(payLoads, res.data, "Internal Server error");
            });
        
        this.setState({ newUserAdded: false });
        localStorage.removeItem("newUserAdded");
    };

    render() {
        return (
            <Container className="logreg-forms App-header py-5">
                {this.props && (
                    <Alert variant={this.props.alertType}>{this.props.message}</Alert>
                )}
                {this.state.flag && (
                    <Alert variant={this.props.alertType}>{this.props.message}</Alert>
                )}
                {<Alert variant={this.state.alertType}>{this.state.message}</Alert>}
                {!this.timer() && this.state.newUserAdded && (
                    <React.Fragment>
                        <Alert variant="info">
                            Your account is activated please login to continue
                        </Alert>
                    </React.Fragment>
                )}

                <Form className="form-signin" onSubmit={this.submit}>
                    <Nav fill variant="pills" activeKey="1" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link eventKey="1">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                id="registerBtn"
                                eventKey="2"
                                href="/register"
                            >
                                Register
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Form.Row as={Row} controlId="formBasicText">
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Ex: sundarp@gmail.com"
                                name="email"
                                onChange={this.handleChange}
                            />
                            <InputGroup.Append>{this.state.emailIcon}</InputGroup.Append>
                        </InputGroup>
                    </Form.Row>
                    <Form.Row as={Row} controlId="formBasicText">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="password"
                                placeholder="************"
                                name="password"
                                onChange={this.handleChange}
                            />
                            <InputGroup.Append>{this.state.passwordIcon}</InputGroup.Append>
                        </InputGroup>
                    </Form.Row>
                    {/* ********************* login button ******************* */}
                    {/* <Button variant="primary" type="submit">
                        Login
                    </Button> */}

                    <OverlayTrigger
                        placement="right"
                        overlay={
                            <Tooltip id="tooltip-disabled">
                            {this.state.emailFormatMatched ||
                            this.state.passwordFormatMatched
                                ? "Please enter valid inputs !"
                                : "Good to Go"}
                            </Tooltip>
                        }
                    >
                        <span className="d-inline-block">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={
                                    this.state.emailFormatMatched ||
                                    this.state.passwordFormatMatched
                                }
                                style={
                                    this.state.passwordFormatMatched ||
                                    this.state.emailFormatMatched
                                        ? { pointerEvents: "none" }
                                        : { pointerEvents: "" }
                                }
                            >
                                Login
                            </Button>
                        </span>
                    </OverlayTrigger>
                </Form>
            </Container>
        );
    }
}
