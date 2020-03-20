import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, ListGroup, Image, Row, Col, Modal, } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';




function App() {

  const [contactList, setContactList] = useState([]); 
   const [modalShow, setModalShow] = useState(false);
   const [currentContact, setCurrentContact] = useState({})
  const [isEdit, setIsEdit] = useState({})
  const [deleted, setDeleted] = useState({})


const ContactModal = (props) => {
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
       <Row><Col> 
       <Row><Col xs={2} sm={2} md={2} lg={2} ><p>e-Mail:</p></Col><Col>{props.data.email}</Col></Row>
       <Row><Col xs={2} sm={2} md={2} lg={2} ><p>Name:</p></Col><Col>{props.data?.name?.first} {props.data?.name?.last}</Col></Row>
       <Row><Col xs={2} sm={2} md={2} lg={2} ><p>Phone:</p></Col><Col>{props.data.phone}</Col></Row>
       <Row><Col xs={2} sm={2} md={2} lg={2} ><p>Cell:</p></Col><Col>{props.data.cell}</Col></Row>
       <Row><Col xs={2} sm={2} md={2} lg={2} ><p>Date of Birth:</p></Col><Col>{props.data.dob?.date}</Col></Row>
      </Col>
      <Col xs={3} md={3}>
      <Image src={props.data?.picture?.large} width="100%" thumbnail />
    </Col></Row>
      </Modal.Body>
      <Modal.Footer>
        
          <Button onClick={() => console.log(props.data)}>Edit </Button>
          <Button onClick={() =>{
            
          }}>Delete </Button>
          <Button onClick={props.onHide}>Close</Button>

      </Modal.Footer>
    </Modal>
  );
}
 



  useEffect(() => {
  axios.get('https://randomuser.me/api/?results=10').then(response => {
    if (response.data) {
      const sortedContacts=response.data.results;
      sortedContacts.sort(function(a,b){
        let textA = a.name.first.toUpperCase();
        let textB = b.name.first.toUpperCase();
        return (textA<textB) ? -1 : (textA>textB) ? 1:0;
      });
      setContactList(sortedContacts);
    }
    console.log("kişilerim", response.data);
  })
    return () => {}
  }, []);

  

  return (
   
   
    <div className="App" style={{backgroundColor: '#343A40'}}>

      
      
<Row>
<Col xs={2} sm={2} md={2} lg={2}>
</Col>        
<Col>
    

        <ListGroup>
        <Row xs={5} sm={5} md={5} lg={5}><Col><ListGroup.Item>Contact List</ListGroup.Item></Col></Row>
        {contactList.map((item)=>  <ListGroup.Item key={item.email} action={true} onClick={() => {
          setModalShow(true);
          setCurrentContact(item)}}>
        <Row>
          <Col xs={2} sm={2} md={2} lg={2}> <Image src={item.picture.medium} roundedCircle /></Col>
          <Col>{item.name.first} {item.name.last}</Col>
          
        </Row>
         </ListGroup.Item>
       )}
      </ListGroup>
</Col>
      <ContactModal show={modalShow} data={currentContact} onHide={() => setModalShow(false)} />
    <Col xs={2} sm={2} md={2} lg={2}>
    </Col> 
    </Row>
    </div>
  );
}

export default App;
