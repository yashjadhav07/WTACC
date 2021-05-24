import React, { Component } from "react";
import axios from "axios";

// Importing Logos
import addStudent from "../assets/images/AddStudent.svg";

// Importing the Components from react-bootstrap
import {
    Alert,
    Button,
    Col,
    Container,
    Form,
    Row,
} from "react-bootstrap";

const port = process.env.REACT_APP_SERVER_PORT;

export default class AddStudent extends Component {
    state = {
        classroomsd: [],
        fname: "",
        email: "",
        classname: "",
        message: "",
        alertType: "",
    };

    // Fetch Data as soon as Component Loads
    componentDidMount() {
        const classroomsData = axios.get(`http://localhost:${port}/classroom/`);

        axios
            .all([classroomsData])
            .then(
                axios.spread((...responses) => {
                    const responseOne = responses[0];
                    this.setState({
                        classroomsd: responseOne.data,
                    });
                })
            )
            .catch((errors) => {
                console.error(errors);
            });
    }

    // Set the Data from the inputs to state variable
    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };

    // Set the state.slots variable to append slots in Database
    handleChangeEvent = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
        const slots = {};
        this.state.classroomsd
            .filter((row) => row.classname === value)
            .map((classroomx) =>
                Object.keys(classroomx.slots).map((opt) => {
                    return slots[opt] = [];
                })
            );
        this.setState({ slots: slots });
    };

    // Mark the respective attendance accordingly
    submit = (event) => {
        event.preventDefault();

        const classroomsData = axios.get(`http://localhost:${port}/classroom/${this.state.classname}`)
        .then(() => {
            console.log(classroomsData.slots);
        })
        .catch(() => {
            console.log("Internal Server error");
            this.setState({ message: "Error", alertType: "danger" });
        });

        const payLoad = {
            fname: this.state.fname,
            email: this.state.email,
            class_name: this.state.classname,
            contact: this.state.contact,
            slots: this.state.slots,
        };

        this.setState({ message: "Processing", alertType: "warning" });

        axios({
            url: "http://localhost:5000/attendance/register",
            method: "POST",
            data: payLoad,
        })
            .then(() => {
                // console.log("Data has been sent to the server");
                this.setState({
                    message: "Spot Registration Done",
                    alertType: "success",
                });
            })
            .catch(() => {
                // console.log("Internal Server error");
                this.setState({ message: "Error", alertType: "danger" });
            });

        setTimeout(this.setState({ message: "", alertType: "" }), 3000);
    };

    render() {
        return (
            <Container className="App-header py-5">
                {/* display-the-alert-message-begin */}
                <Alert variant={this.state.alertType}>{this.state.message}</Alert>
                {/* display-the-alert-message-end */}

                {/* add-student-form-begin */}
                <Row>
                    <Col sm="3">
                        <img
                            alt=""
                            src={addStudent}
                            width="200"
                            height="200"
                            className="d-inline-block align-top"
                        />
                    </Col>
                    <Col sm="9" className="App-header">
                        <h1 className={this.props.mode}>Add Student</h1>
                    </Col>
                </Row>
                <Form onSubmit={this.submit}>
                    {/* ATTENDEE NAME */}
                    <Form.Row controlId="formBasicText">
                        <Form.Label column sm="2">
                            Full Name
                        </Form.Label>
                        <Col column sm="10" className="mb-4">
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                name="fname"
                                onChange={this.handleChange}
                            />
                        </Col>
                    </Form.Row>

                    {/* ATTENDEE EMAIL */}
                    <Form.Row controlId="formBasicEmail">
                        <Form.Label column sm="2">
                            Email address
                        </Form.Label>
                        <Col column sm="10" className="mb-4">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={this.handleChange}
                            />
                        </Col>
                    </Form.Row>

                    {/* ATTENDEE CONTACT */}
                    <Form.Row controlId="formBasicEmail">
                        <Form.Label column sm="2">
                            Contact No.
                        </Form.Label>
                        <Col column sm="10" className="mb-4">
                            <Form.Control
                                type="text"
                                placeholder="Enter contact"
                                name="contact"
                                onChange={this.handleChange}
                            />
                        </Col>
                    </Form.Row>

                    {/* classroom */}
                    <Form.Row controlId="formBasicTest">
                        <Form.Label column sm="2">
                            Classroom
                        </Form.Label>
                        <Col column sm="10" className="mb-4">
                            <Form.Control
                                name="classname"
                                id="classroom-input"
                                placeholder="classroom Name"
                                as="select"
                                onChange={this.handleChangeEvent}
                                custom
                            >
                                <option value="#" disabled>
                                    --Select--
                                </option>
                                {this.state.classroomsd.map((opt) => (
                                    <option key={opt._id} value={opt.classname}>
                                        {opt.classname} ({opt.classcode})
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Row>

                    {/* SUBMIT BUTTON */}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                {/* add-student-form-end */}
            </Container>
        );
    }
}
