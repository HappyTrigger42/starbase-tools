import "../../add-card.css"
import React from 'react';
import ThrusterCard from "../../cards/thrusters_cards/thruster_card";
import {Thruster} from "../../cards/thrusters_cards/thruster_types";
import {Button, Container, Row, Col, Card} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {addCard, handleChange, removeCard} from "../../cards/utilities";
import {chart_default_max_thruster_quantity} from "../const_values";

function Thrusters (
    {
        thrusterCards,
        setThrusterCards
    }:{
        thrusterCards: Thruster[];
        setThrusterCards: React.Dispatch<React.SetStateAction<Thruster[]>>;
    }) {

    const { t } = useTranslation('ship_calc');

    return (
        <>
            <Card className="add-card-buttons">
                <Card.Header>
                    <h3>{t('thruster.thrusters_title')}</h3>
                </Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col xs={7}>
                                {t('thruster.add_plasma')}
                            </Col>
                            <Col xs={5}>
                                <Button className={"add-card-button"} variant="secondary" onClick={() => addCard('plasma', thrusterCards, setThrusterCards)}>
                                    <i className="fa-solid fa-plus"></i>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={7}>
                                {t('thruster.add_maneuver_thruster')}
                            </Col>
                            <Col xs={5}>
                                <Button className={"add-card-button"} variant="secondary" onClick={() => addCard('maneuver', thrusterCards, setThrusterCards)}>
                                    <i className="fa-solid fa-plus"></i>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={7}>
                                {t('thruster.add_box_thruster')}
                            </Col>
                            <Col xs={5}>
                                <Button className={"add-card-button"} variant="secondary" onClick={() => addCard('box', thrusterCards, setThrusterCards)}>
                                    <i className="fa-solid fa-plus"></i>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={7}>
                                {t('thruster.add_triangle_thruster')}
                            </Col>
                            <Col xs={5}>
                                <Button className={"add-card-button"} variant="secondary" onClick={() => addCard('triangle', thrusterCards, setThrusterCards)}>
                                    <i className="fa-solid fa-plus"></i>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            {thrusterCards.map((card, index) => (
                <ThrusterCard
                    key={index}
                    index={index}
                    values={card}
                    thrusterCards={thrusterCards}
                    setThrusterCards={setThrusterCards}
                    max_thruster_quantity={chart_default_max_thruster_quantity}
                    onRemove={removeCard}
                    onChange={handleChange}
                    hide_maneuver={true}
                    hide_quantity={false}
                    hide_plasma_rings={true}
                    display_plasma_tip={true}
                    display_hardpoint_string={true}
                />
            ))}
        </>
    );
}


export default Thrusters;
