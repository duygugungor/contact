import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  ListGroup,
  Image,
  Row,
  Col,
  Modal,
  Form,
  Toast
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import dayjs from "dayjs";
import countryList from "./countries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  * as Icons  from '@fortawesome/free-solid-svg-icons'


function App() {
  const [contactList, setContactList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentContact, setCurrentContact] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(false);

  const ContactModal = props => {
    console.log("props", props);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Contact Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isEditing && (
            <Row>
              <Col style={{textAlign: 'center'}}>
                <Row>
                  <Col xs={24} sm={24} md={4} lg={4}>
                    <span>e-Mail:</span>
                  </Col>
                  <Col  xs={24} sm={24} md={8} lg={8}>{props.data.email}</Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={4} lg={4}>
                    <span>Name:</span>
                  </Col>
                  <Col  xs={24} sm={24} md={8} lg={8}>
                    {props.data?.name?.first} {props.data?.name?.last}
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={4} lg={4}>
                    <span>Phone:</span>
                  </Col>
                  <Col  xs={24} sm={24} md={8} lg={8}>{props.data.phone}</Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={4} lg={4}>
                    <span>Cell:</span>
                  </Col>
                  <Col  xs={24} sm={24} md={8} lg={8}>{props.data.cell}</Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={4} lg={4}>
                    <span>Date of Birth:</span>
                  </Col>
                  <Col  xs={24} sm={24} md={8} lg={8}>
                    {dayjs(props.data.dob?.date).format("DD / MM / YYYY")}
                  </Col>
                </Row>
              </Col>
              <Col xs={3} md={3} style={{borderLeft: 'thin solid #D3D3D3'}}>
                <Image
                  src={props.data?.picture?.large}
                  width="100%"
                  thumbnail
                />
              </Col>
            </Row>
          )}

          {isEditing && (
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    defaultValue={props.data.name.first}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridSurname">
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Surname"
                    defaultValue={props.data.name.last}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    defaultValue={props.data.email}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter Phone Number"
                    defaultValue={props.data.phone}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCell">
                  <Form.Label>Cell</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter Cell Number"
                    defaultValue={props.data.cell}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridDropdown">
                  <Form.Label>Custom select</Form.Label>
                  <Form.Control as="select" custom>
                    {countryList.map(item => {
                      return <option>{item.name}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridGender">
                  <Form.Label as={Col}>Gender </Form.Label>
                  <Form.Check
                    type="radio"
                    inline
                    id="custom-radio"
                    label="Female"
                  />
                  <Form.Check
                    type="radio"
                    inline
                    label="Male"
                    id="custom-radio2"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>

              <Button
                variant="primary"
                onClick={item => {
                  setIsEditing(!isEditing);
                  return setShow(!show);
                }}
              >
                Submit
              </Button>
            </Form>
          )}
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">Warning</strong>
            </Toast.Header>
            <Toast.Body>
            This form is made for just visual purpose.
            </Toast.Body>
          </Toast>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setIsEditing(!isEditing)}>Edit </Button>
          <Button
            onClick={() => {
              setContactList(
                contactList.filter(item => item.email !== props.data.email)
              );
              setModalShow(false);
              return;
            }}
          >
            Delete{" "}
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=10").then(response => {
      if (response.data) {
        const sortedContacts = response.data.results;
        sortedContacts.sort(function(a, b) {
          let textA = a.name.first.toUpperCase();
          let textB = b.name.first.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        setContactList(sortedContacts);
      }
      console.log("kişilerim", response.data);
    });
    return () => {};
  }, []);

  return (
    <Row
      className="App"
      style={{ backgroundColor: "#343A40", paddingTop: "15%" }}
    >
      <Col xs={2} sm={2} md={2} lg={2}></Col>
      <Col>
        <ListGroup>
          <Row xs={5} sm={5} md={5} lg={5}>
            <Col>
              <ListGroup.Item><h2>Contact List</h2></ListGroup.Item>
            </Col>
          </Row>
          {contactList.map(item => (
            <ListGroup.Item
              key={item.email}
              action={true}
              onClick={() => {
                setModalShow(true);
                setCurrentContact(item);
              }}
            >
              <Row type="flex" align="center">
                <Col xs={24} sm={24} md={2} lg={2}>
                  {" "}
                  <Image src={item.picture.medium} roundedCircle />
                </Col>
                <Col>
                <Row>
                  <Col >
                  <h4>{item.name.first} {item.name.last}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={6} lg={6}>
                  <FontAwesomeIcon icon={Icons.faPhone} /> {item.phone}
                  </Col>
                  <Col  xs={24} sm={24} md={6} lg={6}>
                  <FontAwesomeIcon icon={Icons.faMobileAlt} /> {item.cell}
                  </Col>
                </Row>
                 
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <ContactModal
        show={modalShow}
        data={currentContact}
        onHide={() => setModalShow(false)}
      />
      <Col xs={2} sm={2} md={2} lg={2}></Col>
    </Row>
  );
}

export default App;
