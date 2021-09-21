import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

function List(props) {
    return (
        <div className='col-3 pt-4'>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">{props.name != undefined ? props.name : null}</CardTitle>
                    {
                        props.quantity != undefined ? 
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Quantity: {props.quantity}</CardSubtitle>
                        :
                            null
                    }
                    
                    <CardText>Price: {props.price != undefined ? props.price : null}</CardText>
                    <CardText>Expiry: {props.expiry != undefined ? props.expiry : null}</CardText>
                    <Button style={{marginRight: '8px'}} color="primary" onClick={() => props.onEdit()}>Edit</Button>
                    <Button color="danger" onClick={() => props.onDelete()}>Delete</Button>
                </CardBody>
            </Card>
        </div>
    );
}

export default List;