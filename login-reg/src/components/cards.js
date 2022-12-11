import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Container} from "react-bootstrap";

const Cards = () => {

const [cardData, setCardData] = useState([]);
useEffect(() => {
    const fetchData = async () => {
        axios.post("http://localhost:4000/dashboard",{
            user_email: localStorage.getItem('userid')
        }).then(result =>{
            console.log(result.data)
            setCardData(result.data)
        })
    }
    fetchData()
}, [])

const showCourseDetails = (course) => {
    window.location.href = course+"/coursehome"
}

return (
    <Container className="DashboardCard_container">
            <Row>
                {cardData.map((cardData, k) => (
                    <Col key={k} xs={12} md={4} lg={3}>
                        <Card className="DashboardCard">
                            <Card.Img src="https://via.placeholder.com/90x75" />
                            <Card.Body>
                                <Card.Link onClick={() => showCourseDetails(cardData.coursename)}>{cardData.coursename}</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
    </Container>
//   <div class="ic-DashboardCard__box">
//       <div class="ic-DashboardCard">
//         <svg xmlns="http://www.w3.org/2000/svg" class="ic-DashboardCard__placeholder-svg" version="1.1" x="0" y="0" viewBox="-1087 618 260 254">
//           <title>Empty Card</title>
//           <g class="ic-DashboardCard__placeholder-animates">
//             <path d="M-1087 618h260v126h-260V618z"/>
//             <rect x="-1062" y="759.5" class="st0" width="184" height="16"/>
//             <rect x="-1062" y="785.5" class="st0" width="106" height="9"/>
//             <circle cx="-1054" cy="842.5" r="8"/>
//             <circle cx="-989" cy="842.5" r="8"/>
//             <circle cx="-924" cy="842.5" r="8"/>
//             <circle cx="-859" cy="842.5" r="8"/>
//           </g>
//         </svg>
//       </div>
//   </div>
)
};

export default Cards;
