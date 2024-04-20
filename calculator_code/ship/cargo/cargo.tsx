import './cargo.css'
import {Card, Col, Container, Row} from "react-bootstrap";
import React from 'react';
import {clamp} from "../../../../utilities/clamp";
import {useTranslation} from "react-i18next";


function Cargo({
        cargoCount,
        setCargoCount,
        cargoWeight,
        setCargoWeight
    }:{
        cargoCount: number,
        setCargoCount: React.Dispatch<React.SetStateAction<number>>;
        cargoWeight: number,
        setCargoWeight: React.Dispatch<React.SetStateAction<number>>;
    }) {
    const { t } = useTranslation('ship_calc');

    function handleCargoCountChange(e: React.ChangeEvent<HTMLInputElement>) {
        const count = clamp(Number(e.target.value), 0, 9999);
        e.target.value = count.toString()
        setCargoCount(count);
    }

    function handleCargoWeightChange(e: React.ChangeEvent<HTMLInputElement>) {
        const count = clamp(Number(e.target.value), 0, 40000);
        e.target.value = count.toString()
        setCargoWeight(count);
    }

    return <Card>
        <Card.Header>
            <h3>{t('cargo.title')}</h3>
        </Card.Header>
        <Card.Body>
            <Container className={"cargo-container"}>
                <Row className={"card-attribute"}>
                    <Col xs={8}>
                        <div className={"card-attribute-text"}>{t('cargo.cargo_count')}</div>
                    </Col>
                    <Col xs={4}>
                        <input
                            className={"card-attribute-input"}
                            type="number"
                            value={cargoCount}
                            onChange={e => handleCargoCountChange(e)}
                        />
                    </Col>
                </Row>
                <Row className={"card-attribute"}>
                    <Col xs={8}>
                        <div className={"card-attribute-text"}>{t('cargo.cargo_weight')} [?]</div>
                    </Col>
                    <Col xs={4}>
                        <input
                            className={"card-attribute-input"}
                            type="number"
                            value={cargoWeight}
                            onChange={e => handleCargoWeightChange(e)}
                        />
                    </Col>
                </Row>
            </Container>
        </Card.Body>
    </Card>
}

export default Cargo;
