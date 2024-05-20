import './stats.css';
import {heat_sink_transfer, radiator_base_dissipation} from "../../values/misc_constants";
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import React, {ChangeEvent, useEffect, useState} from "react";
import {prettyNumber} from "../../../../utilities/pretty_number";
import {useTranslation} from "react-i18next";

function HeatManagement({
                            totalHeatGen,
                            totalHeatFuelChamber,
                            weaponHeatGeneratedWhenShooting,
                        } : {
    totalHeatGen: number,
    totalHeatFuelChamber: number,
    weaponHeatGeneratedWhenShooting: number,
}) {

    const { t } = useTranslation('ship_calc');

    const [requiredHeatSinks, setRequiredHeatSinks] = useState(0)
    const [requiredRadiatorBases, setRequiredRadiatorBases] = useState(0)
    const [Display, setDisplay] = useState(true)

    useEffect(() => {
        let heatsinks = 0
        let radiator_bases = 0
        let total_heat = totalHeatGen + totalHeatFuelChamber + weaponHeatGeneratedWhenShooting
        heatsinks = Math.ceil(total_heat / heat_sink_transfer)
        radiator_bases = Math.ceil(total_heat / radiator_base_dissipation)
        setRequiredHeatSinks(heatsinks)
        setRequiredRadiatorBases(radiator_bases)
    }, [totalHeatGen, totalHeatFuelChamber, weaponHeatGeneratedWhenShooting])

    const handleDisplay = (e: ChangeEvent<HTMLInputElement>) => {
        setDisplay(e.target.checked)
    }

    if (totalHeatGen === 0 && totalHeatFuelChamber === 0 && weaponHeatGeneratedWhenShooting === 0) {
        return <Card>
            <Card.Header>
                {t('heat_management.no_heat')}
            </Card.Header>
        </Card>
    } else {
        return <Card className={"stats-card"}>
            <Card.Header className={"stats-card-header"}>
                <h4 className={"stats-sub-title"}>{t('heat_management.title')}</h4>
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
                                (totalHeatGen > 0 || totalHeatFuelChamber > 0 || weaponHeatGeneratedWhenShooting > 0) ?
                                    <Row className={"stats-bold"}>
                                        {t('heat_management.stats')}
                                    </Row> : null
                            }
                            <Row>
                                <Col className={"stats-text"} xs={8}>
                                    {t('heat_management.required_heatsinks')}
                                </Col>
                                <Col className={"stats-text-numbers"} xs={4}>
                                    {prettyNumber(requiredHeatSinks)}
                                </Col>
                            </Row>
                            <Row>
                                <Col className={"stats-text"} xs={8}>
                                    {t('heat_management.required_radiator_bases')}
                                </Col>
                                <Col className={"stats-text-numbers"} xs={4}>
                                    {prettyNumber(requiredRadiatorBases)}
                                </Col>
                            </Row>
                        </Container> : null
                }
            </Card.Body>
        </Card>
    }
}

export default HeatManagement;
