import React from "react";
import "./assets/css/App.css";

// Importing Required logos
import logo from "./assets/images/logo.png";
import dark from "./assets/images/DarkMode.svg";
import light from "./assets/images/LightMode.svg";
import homelight from "./assets/images/home-light.svg";
import studentlight from "./assets/images/student-light.svg";
import eventlight from "./assets/images/event-light.svg";
import datalight from "./assets/images/data-light.svg";
import homedark from "./assets/images/home-dark.svg";
import studentdark from "./assets/images/student-dark.svg";
import eventdark from "./assets/images/event-dark.svg";
import datadark from "./assets/images/data-dark.svg";
import userLight from "./assets/images/user-light.svg";
import userDark from "./assets/images/user-dark.svg";

// Importing react-bootstrap & Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Dropdown,
    DropdownButton,
    Col,
    Form,
    Nav,
    Navbar,
    Row,
} from "react-bootstrap";

// Importing Router from react-dom
import { BrowserRouter as Router, Route } from "react-router-dom";

// Importing the components
import DashBoard from "./components/dashboard.component";
import AddStudent from "./components/addstudent.component";
import AddEvent from "./components/addclassroom.component";
import ClassroomData from "./components/classroomData.component";
import AddUser from "./components/adduser.component";
import Login from "./components/loginpage.component";

import jwt_decode from "jwt-decode";

// Main Driver App
export default function App() {
    // decoding name from local storage auth-token
    const userGoogleImgUrl = localStorage.getItem("userGoogleImgUrl");
    const nameDecoder = () => {
        if (localStorage.getItem("auth-token")) {
            const tokenStr = localStorage.getItem("auth-token");
            const splitTokenStr = tokenStr.split(",");
            const targetToken = splitTokenStr[2].split('"');
            const decoded = jwt_decode(targetToken[3]);
            return decoded.fname;
        } else {
            return "";
        }
    };

    // Dark Mode Implementation
    const [darkMode, setDarkMode] = React.useState(false);
    const [login, setLogin] = React.useState(false);
    React.useEffect(() => {
        const data = localStorage.getItem("darkmode");
        if (data) {
            setDarkMode(JSON.parse(data));
        }
        const data1 = localStorage.getItem("login");
        if (data1) {
            setLogin(JSON.parse(data1));
        }
    }, []);
    React.useEffect(() => {
        localStorage.setItem("darkmode", JSON.stringify(darkMode));
        localStorage.setItem("login", JSON.stringify(login));
    });
    const onLogout = () => {
        setLogin(!login);
        localStorage.setItem("auth-token", "");
        localStorage.removeItem("userGoogleImgUrl");
    };

    if (login) {
        return (
            <Router>
                <div className={darkMode ? "App-dark" : "App-light"}>
                    
                    {/* Computer Navbar */}
                    <Navbar className={darkMode ? "bag-dark navbar-dark" : " "}>
                        <Navbar.Brand href="/">
                            <img
                                alt=""
                                src={logo}
                                height="30"
                                className="d-inline-block align-top"
                            />{" "}
                            <b>VIT Pune</b> : AMS
                        </Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link href="/addstudent">Add Student</Nav.Link>
                            <Nav.Link href="/addevent">Create New Classroom</Nav.Link>
                            <Nav.Link href="/eventsdata">Show Classroom Data</Nav.Link>
                        </Nav>
                        <Form inline variant={darkMode ? "dark" : "light"}>
                            <img
                                alt="userGoogleImgUrl"
                                src={
                                    localStorage.getItem("userGoogleImgUrl")
                                        ? userGoogleImgUrl
                                        : darkMode
                                        ? userDark
                                        : userLight
                                }
                                width="45"
                                height="45"
                                className="m-2 d-inline-block align-top rounded-circle"
                            />{" "}
                            <DropdownButton
                                variant={darkMode ? "dark" : "light"}
                                drop="down"
                                id="dropdown-basic-button"
                                title={nameDecoder()}
                            >
                                <Dropdown.Item
                                    onClick={onLogout}
                                    variant={darkMode ? "dark" : "light"}
                                >
                                    Logout
                                </Dropdown.Item>
                            </DropdownButton>
                            <img
                                alt=""
                                src={darkMode ? light : dark}
                                width="70"
                                height="70"
                                className="d-inline-block align-top"
                                onClick={() => {
                                    setDarkMode(!darkMode);
                                }}
                            />
                        </Form>
                    </Navbar>
                    {/* **************************************** */}

                    {/* Mobile Navbar */}
                    <Navbar
                        fixed="bottom"
                        as={Row}
                        variant="tabs"
                        className={`mobile-nav-${darkMode ? "dark" : "light"}`}
                    >
                        <Nav.Item as={Col} lg="auto">
                            <Nav.Link href="/">
                                <img
                                    alt=""
                                    src={darkMode ? homedark : homelight}
                                    width="15"
                                    height="15"
                                    className="d-inline-block align-top"
                                />
                                <p>Home</p>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as={Col} lg="auto">
                            <Nav.Link href="/addstudent">
                                <img
                                    alt=""
                                    src={darkMode ? studentdark : studentlight}
                                    width="15"
                                    height="15"
                                    className="d-inline-block align-top"
                                />
                                <p>Add Student</p>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as={Col} lg="auto">
                            <Nav.Link href="/addevent">
                                <img
                                    alt=""
                                    src={darkMode ? eventdark : eventlight}
                                    width="15"
                                    height="15"
                                    className="d-inline-block align-top"
                                />
                                <p>Add Classroom</p>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as={Col} lg="auto">
                            <Nav.Link href="/eventsdata">
                                <img
                                    alt=""
                                    src={darkMode ? datadark : datalight}
                                    width="15"
                                    height="15"
                                    className="d-inline-block align-top"
                                />
                                <p>Classroom Data</p>
                            </Nav.Link>
                        </Nav.Item>
                    </Navbar>

                    {/* React Router Routes */}
                    <Route
                        path="/"
                        exact
                        render={() => <DashBoard mode={darkMode ? "dark" : "light"} />}
                    />
                    <Route
                        path="/addstudent"
                        exact
                        render={() => <AddStudent mode={darkMode ? "dark" : "light"} />}
                    />
                    <Route
                        path="/addevent"
                        render={() => <AddEvent mode={darkMode ? "dark" : "light"} />}
                    />
                    <Route
                        path="/eventsdata"
                        render={() => <ClassroomData mode={darkMode ? "dark" : "light"} />}
                    />
                </div>
            </Router>
        );
    } else {
        return (
            <Router>
                <Route
                    path="/"
                    exact
                    render={() => <Login mode={darkMode ? "dark" : "light"} />}
                />
                <Route
                    path="/register"
                    exact
                    render={() => <AddUser mode={darkMode ? "dark" : "light"} />}
                />
                <Route
                    path={["/addstudent", "/addevent", "/eventsdata", "/imcsv"]}
                    exact
                    render={() => (
                        <Login
                            mode={darkMode ? "dark" : "light"}
                            message="Please Login to access this route   "
                            alertType={"warning"}
                        />
                    )}
                />
            </Router>
        );
    }
}
