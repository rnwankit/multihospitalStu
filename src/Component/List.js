import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

function List(props) {

    console.log("List")

    return (
        <div className='col-3 pt-4'>
            <Card key={props.id}>
                <CardBody>
                    <CardTitle tag="h5">{props.name != undefined ? props.name : null}</CardTitle>
                    {
                        props.quantity != undefined ?
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Quantity: {props.quantity}</CardSubtitle>
                            :
                            null
                    }

                    {props.id ? <CardText>ID:  {props.id} </CardText> : null}
                    {props.price ? <CardText>Price:  {props.price} </CardText> : null}
                    {props.expiry ? <CardText>Expiry:  {props.expiry} </CardText> : null}
                    {
                        props.onEdit === "fromListAptEdit" ?
                            <Link style={{ marginRight: '8px' }} className="btn btn-primary" to={{
                                pathname: '/add_appointment',
                                state: {
                                    id: props.id
                                }
                            }}>Edit</Link>
                        :
                            <Button style={{ marginRight: '8px' }} color="primary" onClick={() => props.onEdit()}>Edit</Button>
                    }
                    {
                        props.onDelete === "fromListAptDelete" ? 
                            <Link className="btn btn-danger" to={{
                                pathname: '/delete',
                                state: {
                                    id: props.id
                                }
                            }}>Delete</Link>
                        :
                            <Button color="danger" onClick={() => props.onDelete()}>Delete</Button>
                    }

                </CardBody>
            </Card>
        </div>
    );
}

export default List;