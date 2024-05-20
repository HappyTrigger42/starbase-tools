import './stats.css'
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import {Thruster} from "../../cards/thrusters_cards/thruster_types";
import React, {ChangeEvent, useEffect, useState} from "react";
import {
    get_box_body_from_tier,
    get_box_nozzle_from_tier,
    get_electricity_converter_from_tier,
    get_maneuver_thruster_from_tier,
    get_propellant_converter_from_tier,
    get_triangle_body_from_tier,
    get_triangle_nozzle_from_tier,
    plasma_thruster_body,
    plasma_thruster_nozzle, plasma_thruster_ring
} from "../../values/thruster_constants";
import {remove_percentage} from "../../../../utilities/remove_percentage";
import {prettyNumber} from "../../../../utilities/pretty_number";
import {useTranslation} from "react-i18next";


function ThrustersStat(
    {
        thrusterCards,
        totalForwardThrust,
        setTotalForwardThrust,
        thrusterEfficiency,
        overwritePropellantConsumption,
        overwrittenPropellantConsumption,
        propellantConsumption,
        setPropellantConsumption,
        thrusterElectricityConsumption,
        setThrusterElectricityConsumption
    } : {
        thrusterCards: Thruster[],
        totalForwardThrust: number,
        setTotalForwardThrust: React.Dispatch<React.SetStateAction<number>>,
        thrusterEfficiency: number,
        overwritePropellantConsumption: number,
        overwrittenPropellantConsumption: number,
        propellantConsumption: number,
        setPropellantConsumption: React.Dispatch<React.SetStateAction<number>>
        thrusterElectricityConsumption: number,
        setThrusterElectricityConsumption: React.Dispatch<React.SetStateAction<number>>
    }) {

    const { t } = useTranslation('ship_calc');

    const [Display, setDisplay] = useState(true)
    const [hasManeuverThrusters, setHasManeuverThrusters] = useState(false)

    useEffect(() => {
        let totalPropellantConsumption = 0;
        let totalElectricityConsumption = 0;
        let totalForwardThrust = 0;
        let body = null;
        let nozzle = null;
        let propellant_converter = null;
        let electricity_converter = null;
        let propellant_consumption = null;
        let electricity_consumption = null;
        let thrust = null;
        let hasManeuverThrusters = false
        thrusterCards.forEach((thruster) => {
            switch (thruster.type) {
                case 'box':
                    body = get_box_body_from_tier(thruster.tier);
                    nozzle = get_box_nozzle_from_tier(thruster.nozzle);
                    propellant_converter = get_propellant_converter_from_tier(thruster.propellant_converter);
                    electricity_converter = get_electricity_converter_from_tier(thruster.electricity_converter);
                    propellant_consumption = remove_percentage(body.propellant_consumption, propellant_converter.converter) * thruster.quantity;
                    electricity_consumption = remove_percentage(body.electricity_consumption, electricity_converter.converter) * thruster.quantity;
                    if (thruster.used_as_maneuver) {
                        totalPropellantConsumption += remove_percentage(propellant_consumption, 10);
                        totalElectricityConsumption += remove_percentage(electricity_consumption, 40);
                        hasManeuverThrusters = true
                    } else {
                        thrust = remove_percentage((body.thrust + nozzle.thrust) * thruster.quantity, 100 - thrusterEfficiency);
                        totalForwardThrust += thrust;
                        totalPropellantConsumption += propellant_consumption;
                        totalElectricityConsumption += electricity_consumption;
                    }
                    break;
                case 'triangle':
                    body = get_triangle_body_from_tier(thruster.tier);
                    nozzle = get_triangle_nozzle_from_tier(thruster.nozzle);
                    propellant_converter = get_propellant_converter_from_tier(thruster.propellant_converter);
                    electricity_converter = get_electricity_converter_from_tier(thruster.electricity_converter);
                    propellant_consumption = remove_percentage(body.propellant_consumption, propellant_converter.converter) * thruster.quantity;
                    electricity_consumption = remove_percentage(body.electricity_consumption, electricity_converter.converter) * thruster.quantity;
                    if (thruster.used_as_maneuver) {
                        totalPropellantConsumption += remove_percentage(propellant_consumption, 10);
                        totalElectricityConsumption += remove_percentage(electricity_consumption, 40);
                        hasManeuverThrusters = true
                    } else {
                        thrust = remove_percentage((body.thrust + nozzle.thrust) * thruster.quantity, 100 - thrusterEfficiency);
                        totalForwardThrust += thrust;
                        totalPropellantConsumption += propellant_consumption;
                        totalElectricityConsumption += electricity_consumption;
                    }
                    break;
                case 'maneuver':
                    body = get_maneuver_thruster_from_tier(thruster.tier);
                    propellant_consumption = body.propellant_consumption * thruster.quantity;
                    electricity_consumption = body.electricity_consumption * thruster.quantity;
                    if (thruster.used_as_maneuver) {
                        totalPropellantConsumption += remove_percentage(propellant_consumption, 10);
                        totalElectricityConsumption += remove_percentage(electricity_consumption, 40);
                        hasManeuverThrusters = true
                    } else {
                        thrust = remove_percentage(body.thrust * thruster.quantity, 100 - thrusterEfficiency);
                        totalForwardThrust += thrust;
                        totalPropellantConsumption += propellant_consumption;
                        totalElectricityConsumption += electricity_consumption;
                    }
                    break;
                case 'plasma':
                    body = plasma_thruster_body;
                    nozzle = plasma_thruster_nozzle;
                    if (thruster.used_as_maneuver) {
                        propellant_consumption = body.propellant_consumption * thruster.quantity;
                        propellant_consumption += remove_percentage(plasma_thruster_ring.propellant_consumption * thruster.rings, 95) * thruster.quantity;
                        electricity_consumption = body.electricity_consumption * thruster.quantity;
                        electricity_consumption += remove_percentage(plasma_thruster_ring.electricity_consumption * thruster.rings, 25) * thruster.quantity;
                        totalPropellantConsumption += propellant_consumption
                        totalElectricityConsumption += electricity_consumption;
                        hasManeuverThrusters = true
                    } else {
                        propellant_consumption = (body.propellant_consumption + plasma_thruster_ring.propellant_consumption * thruster.rings ) * thruster.quantity;
                        electricity_consumption = (body.electricity_consumption + plasma_thruster_ring.electricity_consumption * thruster.rings) * thruster.quantity;
                        thrust = remove_percentage((body.thrust + nozzle.thrust + plasma_thruster_ring.thrust * thruster.rings) * thruster.quantity, 100 - thrusterEfficiency);
                        totalForwardThrust += thrust;
                        totalPropellantConsumption += propellant_consumption;
                        totalElectricityConsumption += electricity_consumption;
                    }
                    break;
            }
        })
        setTotalForwardThrust(totalForwardThrust);
        setPropellantConsumption(totalPropellantConsumption);
        setThrusterElectricityConsumption(totalElectricityConsumption);
        setHasManeuverThrusters(hasManeuverThrusters)
    }, [setPropellantConsumption, setThrusterElectricityConsumption, setTotalForwardThrust, thrusterCards, thrusterEfficiency]);

    const handleDisplay = (e: ChangeEvent<HTMLInputElement>) => {
        setDisplay(e.target.checked)
    }

    function getThrusterStats() {
        return <>
            <Row>
                {
                    (overwritePropellantConsumption === 0 && !hasManeuverThrusters) ? (
                        <Col className={"stats-warning"}>
                            {t("thruster_stats.no_maneuver_thrusters")}
                        </Col>
                    ) : null
                }
            </Row>
            <Row>
                <Col className={"stats-text"} xs={8}>
                    {t('thruster_stats.thrust_forward')}
                </Col>
                <Col className={"stats-text-numbers"} xs={4}>
                    {prettyNumber(totalForwardThrust)}
                </Col>
            </Row>
            {
                (overwritePropellantConsumption !== 0) ? (
                    <Row>
                        <Col className={"stats-text"} xs={8}>
                            {t('thruster_stats.overwritten_propellant_consumption')}
                        </Col>
                        <Col className={"stats-text-numbers"} xs={4}>
                            {prettyNumber(overwrittenPropellantConsumption)} p/s
                        </Col>
                    </Row>
                ) : (
                    <Row>
                        <Col className={"stats-text"} xs={8}>
                            {t('thruster_stats.propellant_consumption')}
                        </Col>
                        <Col className={"stats-text-numbers"} xs={4}>
                            {prettyNumber(propellantConsumption)} p/s
                        </Col>
                    </Row>
                )
            }
            <Row>
                <Col className={"stats-text"} xs={8}>
                    {t('thruster_stats.electricity_consumption')}
                </Col>
                <Col className={"stats-text-numbers"} xs={4}>
                    {prettyNumber(thrusterElectricityConsumption)} e/s
                </Col>
            </Row>
        </>
    }

    if (thrusterCards.length === 0) {
        return <Card>
            <Card.Header>
                {t('thruster_stats.no_thrusters')}
            </Card.Header>
        </Card>
    } else {
        return <Card>
            <Card.Header className={"stats-card-header"}>
                <h4 className={"stats-sub-title"}>{t('thruster_stats.title')}</h4>
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
                            {getThrusterStats()}
                        </Container> : null
                }
            </Card.Body>
        </Card>
    }
}

export default ThrustersStat;
