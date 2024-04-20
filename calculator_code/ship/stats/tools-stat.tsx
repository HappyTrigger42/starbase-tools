import './stats.css'
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import React, {ChangeEvent, useEffect, useState} from "react";
import {mining_laser_elec_per_sec, towing_elec_per_ton} from "../../values/tools_constants";
import {prettyNumber} from "../../../../utilities/pretty_number";
import {useTranslation} from "react-i18next";


function ToolsStats(
    {
        towingWeight,
        collectorCount,
        collectorPower,
        miningLaserCount,
        totalPowerGen,
        towingPowerDeficit,
        setTowingPowerDeficit,
        miningEquipmentPowerDeficit,
        setMiningEquipmentPowerDeficit,
    }:{
        towingWeight: number,
        collectorCount: number,
        collectorPower: number,
        miningLaserCount: number,
        totalPowerGen: number,
        towingPowerDeficit: number,
        setTowingPowerDeficit: React.Dispatch<React.SetStateAction<number>>,
        miningEquipmentPowerDeficit: number,
        setMiningEquipmentPowerDeficit: React.Dispatch<React.SetStateAction<number>>,
    }) {

    const { t } = useTranslation('ship_calc');

    const [maxTowingPower, setMaxTowingPower] = React.useState(0);
    const [collectorPowerConsumption, setCollectorPowerConsumption] = React.useState(0);
    const [miningLaserPowerConsumption, setMiningLaserPowerConsumption] = React.useState(0);
    const [miningEquipmentPowerConsumption, setMiningEquipmentPowerConsumption] = React.useState(0);
    const [Display, setDisplay] = useState(true)

    useEffect(() => {
        let maxTowingPowerVar = towingWeight * towing_elec_per_ton;
        let towing_deficit = totalPowerGen - maxTowingPowerVar;
        setMaxTowingPower(maxTowingPowerVar);
        setTowingPowerDeficit(towing_deficit);
    }, [towingWeight, totalPowerGen, setTowingPowerDeficit]);

    useEffect(() => {
        let collectors_power = collectorCount * collectorPower;
        let mining_laser_power = miningLaserCount * mining_laser_elec_per_sec;
        let mining_equipment_power_consumption_var = collectors_power + mining_laser_power;
        let mining_power_deficit = totalPowerGen - mining_equipment_power_consumption_var;
        setCollectorPowerConsumption(collectors_power);
        setMiningLaserPowerConsumption(mining_laser_power);
        setMiningEquipmentPowerConsumption(mining_equipment_power_consumption_var);
        setMiningEquipmentPowerDeficit(mining_power_deficit);
    }, [collectorCount, collectorPower, miningLaserCount, setMiningEquipmentPowerDeficit, totalPowerGen]);

    const handleDisplay = (e: ChangeEvent<HTMLInputElement>) => {
        setDisplay(e.target.checked)
    }

    return <Card className={"stats-card"}>
        <Card.Header className={"stats-card-header"}>
            <h4 className={"stats-sub-title"}>{t('tools.title')}</h4>
            <Form className={"stats-toggle"}>
                <Form.Check
                    type="switch"
                    checked={Display}
                    onChange={handleDisplay}
                />
            </Form>
        </Card.Header>
        <Card.Body>
            {
                (Display) ?
                    <Container className={"stats-container"}>
                        {
                            (towingWeight === 0 && collectorCount === 0 && miningLaserCount === 0) ?
                                <Row>
                                    <Col className={"stats-text"} xs={12}>
                                        {t('tools.no_tools')}
                                    </Col>
                                </Row> : null
                        }
                        {
                            (collectorCount > 0 || miningLaserCount > 0) ?
                                <Row>
                                    <Col className={"stats-text"} xs={8}>
                                        {t('tools.collectors_power_consumption')}
                                    </Col>
                                    <Col className={"stats-text-numbers"} xs={4}>
                                        {prettyNumber(collectorPowerConsumption)} {t('elec_per_second')}
                                    </Col>
                                </Row> : null
                        }
                        {
                            (collectorCount > 0 || miningLaserCount > 0) ?
                                <Row>
                                    <Col className={"stats-text"} xs={8}>
                                        {t('tools.mining_lasers_power_consumption')}
                                    </Col>
                                    <Col className={"stats-text-numbers"} xs={4}>
                                        {prettyNumber(miningLaserPowerConsumption)} {t('elec_per_second')}
                                    </Col>
                                </Row> : null
                        }
                        {
                            (collectorCount > 0 || miningLaserCount > 0) ?
                                <Row>
                                    <Col className={"stats-text"} xs={8}>
                                        {t('tools.mining_equipment_power_consumption')}
                                    </Col>
                                    <Col className={"stats-text-numbers"} xs={4}>
                                        {prettyNumber(miningEquipmentPowerConsumption)} {t('elec_per_second')}
                                    </Col>
                                </Row> : null
                        }
                        {
                            (miningEquipmentPowerConsumption > totalPowerGen) ?
                                <Row>
                                    <Col className={"stats-warning"} xs={8}>
                                        {t('tools.power_deficit_equipment')}
                                    </Col>
                                    <Col className={"stats-warning-numbers"} xs={4}>
                                        {prettyNumber(miningEquipmentPowerDeficit)} {t('elec_per_second')}
                                    </Col>
                                </Row> : null
                        }
                        {
                            (towingWeight > 0) ?
                                <Row>
                                    <Col className={"stats-text"} xs={8}>
                                        {t('tools.towing_power')}
                                    </Col>
                                    <Col className={"stats-text-numbers"} xs={4}>
                                        {prettyNumber(maxTowingPower)} {t('elec_per_second')}
                                    </Col>
                                </Row> : null
                        }
                        {
                            (towingWeight > 0 && towingPowerDeficit < 0) ?
                                <Row>
                                    <Col className={"stats-warning"} xs={8}>
                                        {t('tools.towing_deficit')}
                                    </Col>
                                    <Col className={"stats-warning-numbers"} xs={4}>
                                        {prettyNumber(towingPowerDeficit)} {t('elec_per_second')}
                                    </Col>
                                </Row> : null
                        }
                    </Container> : null
            }
        </Card.Body>
    </Card>
}

export default ToolsStats;
