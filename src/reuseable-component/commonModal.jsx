import React from 'react';  
import { Button,Modal} from 'react-bootstrap'; 

export default function successModal(props){

    return (        <>
        <Modal show={true} >  
        <Modal.Header closeButton>{props.header}</Modal.Header>  
        <Modal.Body>{props.message}</Modal.Body>  
        <Modal.Footer>  
          <Button onClick={props.close}>Close</Button>  
          <Button onClick={props.save}>Save</Button>  
        </Modal.Footer>  
      </Modal> </>
    )
}
