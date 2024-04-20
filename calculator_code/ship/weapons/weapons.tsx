import './weapons.css'
import {Card, Col, Container, Row} from "react-bootstrap";
import React, {ChangeEvent} from "react";
import {clamp} from "../../../../utilities/clamp";
import {useTranslation} from "react-i18next";


function Weapons (
    {
        autoCannons,
        setAutoCannons,
        laserCannons,
        setLaserCannons,
        plasmaCannons,
        setPlasmaCannons,
        railGuns,
        setRailGuns,
    }: {
        autoCannons: number;
        setAutoCannons: React.Dispatch<React.SetStateAction<number>>;
        laserCannons: number;
        setLaserCannons: React.Dispatch<React.SetStateAction<number>>;
        plasmaCannons: number;
        setPlasmaCannons: React.Dispatch<React.SetStateAction<number>>;
        railGuns: number;
        setRailGuns: React.Dispatch<React.SetStateAction<number>>;
    }) {
    const { t } = useTranslation('ship_calc');

    const handleChange = (e: ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<number>>) => {
        const count = clamp(Number(e.target.value), 0, 30)
        e.target.value = count.toString()
        setState(count);
    };

    return <Card>
        <Card.Header>
            <h3>{t('weapons.title')}</h3>
        </Card.Header>
        <Card.Body>
            <Container className={"machinery-container"}>
                <Row className={"card-attribute"}>
                    <Col xs={8}>
                        <div className={"card-attribute-text"}>{t('weapons.auto_cannons')}</div>
                    </Col>
                    <Col xs={4}>
                        <input className={"card-attribute-input"} type="number" value={autoCannons} onChange={(e) => handleChange(e, setAutoCannons)} />
                    </Col>
                </Row>
                <Row className={"card-attribute"}>
                    <Col xs={8}>
                        <div className={"card-attribute-text"}>{t('weapons.laser_cannons')}</div>
                    </Col>
                    <Col xs={4}>
                        <input className={"card-attribute-input"} type="number" value={laserCannons} onChange={(e) => handleChange(e, setLaserCannons)}/>
                    </Col>
                </Row>
                <Row className={"card-attribute"}>
                    <Col xs={8}>
                        <div className={"card-attribute-text"}>{t('weapons.plasma_cannons')}</div>
                    </Col>
                    <Col xs={4}>
                        <input className={"card-attribute-input"} type="number" value={plasmaCannons} onChange={(e) => handleChange(e, setPlasmaCannons)} />
                    </Col>
                </Row>
                <Row className={"card-attribute"}>
                    <Col xs={8}>
                        <div className={"card-attribute-text"}>{t('weapons.railguns')}</div>
                    </Col>
                    <Col xs={4}>
                        <input className={"card-attribute-input"} type="number" value={railGuns} onChange={(e) => handleChange(e, setRailGuns)}/>
                    </Col>
                </Row>
            </Container>
        </Card.Body>
    </Card>
}

export default Weapons;
