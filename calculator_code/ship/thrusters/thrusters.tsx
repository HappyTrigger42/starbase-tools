import "../../add-card.css"
import React from 'react';
import ThrusterCard from "../../cards/thrusters_cards/thruster_card";
import {Thruster} from "../../cards/thrusters_cards/thruster_types";
import {Button, Container, Row, Col, Card} from "react-bootstrap";
import {clamp} from "../../../../utilities/clamp";
import {useTranslation} from "react-i18next";
import {addCard, handleChange, removeCard} from "../../cards/utilities";
import {ship_calc_max_thruster_quantity} from "../const_values";

function Thrusters (
    {
        thrusterEfficiency,
        setThrusterEfficiency,
        thrusterCards,
        setThrusterCards
    }:{
        thrusterEfficiency: number;
        setThrusterEfficiency: React.Dispatch<React.SetStateAction<number>>;
        thrusterCards: Thruster[];
        setThrusterCards: React.Dispatch<React.SetStateAction<Thruster[]>>;
    }) {

    const { t } = useTranslation('ship_calc');

    const handleThrusterEfficiencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = clamp(Number(e.target.value), 0, 100)
        e.target.value = count.toString()
        setThrusterEfficiency(count);
    }

    return (
        <>
            <Card className="add-card-buttons">
                <Card.Header>
                    <h3>{t('thruster.thrusters_title')}</h3>
                </Card.Header>
                <Card.Body>
                    <Container>
                        <Row className={"card-attribute"}>
                            <Col xs={7}>
                                <div className={"card-attribute-text"}>
                                    {t('thruster.thruster_efficiency')} [?]
                                </div>
                            </Col>
                            <Col xs={5}>
                                <input className={"card-attribute-input"}
                                       type="number"
                                       value={thrusterEfficiency}
                                       onChange={e => handleThrusterEfficiencyChange(e)}
                                       placeholder="bat quantity" />
                            </Col>
                        </Row>
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
                    max_thruster_quantity={ship_calc_max_thruster_quantity}
                    onRemove={removeCard}
                    onChange={handleChange}
                    hide_maneuver={false}
                    hide_quantity={false}
                    hide_plasma_rings={false}
                    display_plasma_tip={false}
                    display_hardpoint_string={false}
                />
            ))}
        </>
    );
}


export default Thrusters;
