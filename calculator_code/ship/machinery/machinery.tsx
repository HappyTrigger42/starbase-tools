import './machinery.css'
import {Card, Col, Container, Row} from "react-bootstrap";
import React from 'react';
import {clamp} from "../../../../utilities/clamp";
import {useTranslation} from "react-i18next";
import {collector_elec_per_sec} from "../../values/tools_constants";


function Machinery(
    {
        collectorCount,
        setCollectorCount,
        collectorPower,
        setCollectorPower,
        miningLaserCount,
        setMiningLaserCount,
        towingWeight,
        setTowingWeight,
    }:{
        collectorCount: number,
        setCollectorCount: React.Dispatch<React.SetStateAction<number>>,
        collectorPower: number,
        setCollectorPower: React.Dispatch<React.SetStateAction<number>>,
        miningLaserCount: number,
        setMiningLaserCount: React.Dispatch<React.SetStateAction<number>>,
        towingWeight: number,
        setTowingWeight: React.Dispatch<React.SetStateAction<number>>,
    }) {

    const { t } = useTranslation('ship_calc');

    const collectorCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = clamp(Number(e.target.value), 0, 100);
        e.target.value = count.toString()
        setCollectorCount(count);
    }

    const miningLaserCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = clamp(Number(e.target.value), 0, 30);
        e.target.value = count.toString()
        setMiningLaserCount(count);
    }

    const collectorPowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = clamp(Number(e.target.value), 0, collector_elec_per_sec);
        e.target.value = count.toString()
        setCollectorPower(count);
    }

    const towingWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = clamp(Number(e.target.value), 0, 120000);
        e.target.value = count.toString()
        setTowingWeight(count);
    }

    return <Card>
        <Card.Header>
            <h3>{t('machinery.title')}</h3>
        </Card.Header>
        <Card.Body>
            <Container className={"machinery-container"}>
                <Row className={"card-attribute"}>
                    <Col xs={8}>
                        <div className={"card-attribute-text"}>{t('machinery.towing_weight')}</div>
                    </Col>
                    <Col xs={4}>
                        <input
                            className={"card-attribute-input"}
                            value={towingWeight}
                            type="number"
                            placeholder="mining laser count"
                            onChange={e => towingWeightChange(e)}
                        />
                    </Col>
                </Row>
                <Row className={"card-attribute"}>
                    <Col xs={8}>
                        <div className={"card-attribute-text"}>{t('machinery.mining_laser_count')}</div>
                    </Col>
                    <Col xs={4}>
                        <input
                            className={"card-attribute-input"}
                            value={miningLaserCount}
                            type="number"
                            placeholder="mining laser count"
                            onChange={e => miningLaserCountChange(e)}
                        />
                    </Col>
                </Row>
                <Row className={"card-attribute"}>
                    <Col xs={8}>
                        <div className={"card-attribute-text"}>{t('machinery.collector_count')}</div>
                    </Col>
                    <Col xs={4}>
                        <input
                            className={"card-attribute-input"}
                            value={collectorCount}
                            type="number"
                            placeholder="collector count"
                            onChange={e => collectorCountChange(e)}
                        />
                    </Col>
                </Row>
                <Row className={"card-attribute"}>
                    <Col xs={8}>
                        <div className={"card-attribute-text"}>{t('machinery.collector_power')}</div>
                    </Col>
                    <Col xs={4}>
                        <input
                            className={"card-attribute-input"}
                            value={collectorPower}
                            type="number"
                            placeholder="collector power"
                            onChange={e => collectorPowerChange(e)}
                        />
                    </Col>
                </Row>
            </Container>
        </Card.Body>
    </Card>
}

export default Machinery;
