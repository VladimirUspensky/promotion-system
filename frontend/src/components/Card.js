import React from "react";
//import Card from "react-bootstrap/Card"
import PropTypes from "prop-types";


const card = (props) => {

    return (
        <div>
            <br/>
            {/*<Card style={{ width: '30rem' }}>*/}
            {/*    <Card.Body>*/}
            {/*        <Card.Title>{props.title}</Card.Title>*/}
            {/*        <Card.Subtitle className="mb-2 text-muted">{props.deadline}</Card.Subtitle>*/}
            {/*        <Card.Subtitle className="mb-2 text-muted">{props.status}</Card.Subtitle>*/}
            {/*        <Card.Subtitle className="mb-2 text-muted">{props.payment}</Card.Subtitle>*/}
            {/*        <Card.Text>*/}
            {/*            Some quick example text to build on the card title and make up the bulk of*/}
            {/*            the card's content.*/}
            {/*        </Card.Text>*/}
            {/*        <Card.Link href={`/task/${props.slug}`}>{props.first_name} {props.last_name}</Card.Link>*/}
            {/*    </Card.Body>*/}
            {/*</Card>*/}
            <br/>
            <br/>
        </div>
    )
}

card.propTypes = {
    deadline: PropTypes.instanceOf(Date).isRequired,
    status: PropTypes.string.isRequired,
    payment: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired
}

export default card
