import './stats.css'
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import React, {ChangeEvent, useEffect, useState} from "react";
import {prettyNumber} from "../../../../utilities/pretty_number";
import {useTranslation} from "react-i18next";

function FlightStats({
                         calculatedSpeed,
                         setCalculatedSpeed,
                         overwriteSpeed,
                         overwrittenSpeedValue,
                         cargoCount,
                         cargoWeight,
                         totalPropellant,
                         propellantConsumption,
                         overwritePropellantConsumption,
                         overwrittenPropellantConsumption,
                         totalForwardThrust,
                         shipWeight
                     } : {
    calculatedSpeed: number,
    setCalculatedSpeed: React.Dispatch<React.SetStateAction<number>>;
    overwriteSpeed: number,
    overwrittenSpeedValue: number,
    cargoCount: number,
    cargoWeight: number,
    totalPropellant: number,
    propellantConsumption: number,
    overwritePropellantConsumption: number,
    overwrittenPropellantConsumption: number,
    totalForwardThrust: number,
    shipWeight: number
}) {

    const { t } = useTranslation('ship_calc');

    const [metricsStr, setMetricsStr] = useState(<> </>);
    const [speedWithCargo, setSpeedWithCargo] = useState(0);
    const [PropellantDistance, setPropellantDistance] = useState(0);
    const [PropellantDistanceWithCargo, setPropellantDistanceWithCargo] = useState(0);
    const [time, setTime] = useState("0");
    const [Display, setDisplay] = useState(true)

    function displayStat(valueName: string, unit: string, value: string) {
        return <>
            <Col className={"stats-text"} xs={8}>
                {valueName}
            </Col>
            <Col className={"stats-text-numbers"} xs={4}>
                {value} {unit}
            </Col>
        </>
    }

    function displayStat2(valueName: string, unit: string, value: string, value2: string) {
        return <>
            <Col className={"stats-text"} xs={6}>
                {valueName}
            </Col>
            <Col className={"stats-text-numbers"} xs={3}>
                {value} {unit}
            </Col>
            <Col className={"stats-text-numbers"} xs={3}>
                {value2} {unit}
            </Col>
        </>
    }

    useEffect(() => {
        if (cargoCount > 0) {
            setMetricsStr(<>
                <Col className={"stats-text"} xs={6}>
                </Col>
                <Col className={"stats-text"} xs={3}>
                    {t('speed.empty')}
                </Col>
                <Col className={"stats-text"} xs={3}>
                    {t('speed.full')}
                </Col>
            </>)
        } else {
            setMetricsStr(<></>)
        }
    }, [cargoCount, t]);

    function getDistance(localSpeed: number) {
        if (propellantConsumption === 0 || totalPropellant === 0) {
            return 0;
        }
        let time = totalPropellant / propellantConsumption;
        return localSpeed * time / 1000;
    }

    function getTime(propellantConsumption: number) {
        if (propellantConsumption === 0 || totalPropellant === 0) {
            return "0";
        }
        const timeInSeconds = totalPropellant / propellantConsumption;
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        let ret = "";
        if (hours > 0) {
            ret += hours + t('hours_short') + " ";
        }
        if (minutes > 0) {
            ret += minutes + t('minutes_short') + " ";
        }
        return ret;
    }

    function getSpeed(localShipWeight: number) {
        // https://6cken.com/en/research-of-the-relationship-speed-thrust-and-mass-en/
        let a = -564.803704446687
        let b = 582.348222415912
        let c = -12.8278635825771
        let d = 150.1
        let e = 1000000
        let f = e / localShipWeight
        let ratio = totalForwardThrust / localShipWeight
        let max = (-b + Math.sqrt(b**2 - 4 * a * -d)) / (2 * a)
        if (ratio / (f - c) > max) {
            return d
        } else {
            return a * (ratio / (f - c))**2 + b * ratio / (f - c)
        }
    }

    useEffect(() => {
        // note : the input states that the weight is in kg, but the algorithm uses tons
        if (overwriteSpeed === 0) {
            setCalculatedSpeed(getSpeed(shipWeight));
            setSpeedWithCargo(getSpeed(shipWeight + cargoWeight * cargoCount));
        } else {
            setCalculatedSpeed(overwrittenSpeedValue);
            setSpeedWithCargo(overwrittenSpeedValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalForwardThrust, shipWeight, overwriteSpeed, overwrittenSpeedValue, cargoCount, cargoWeight, setCalculatedSpeed]);

    useEffect(() => {
        if (overwritePropellantConsumption === 0) {
            setPropellantDistance(getDistance(calculatedSpeed));
            setPropellantDistanceWithCargo(getDistance(speedWithCargo));
            setTime(getTime(propellantConsumption));
        } else {
            setPropellantDistance(getDistance(overwrittenPropellantConsumption));
            setPropellantDistanceWithCargo(getDistance(overwrittenPropellantConsumption));
            setTime(getTime(overwrittenPropellantConsumption));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calculatedSpeed, overwriteSpeed, overwrittenSpeedValue, propellantConsumption, totalPropellant, overwritePropellantConsumption, overwrittenPropellantConsumption, cargoWeight, cargoCount, speedWithCargo]);

    const handleDisplay = (e: ChangeEvent<HTMLInputElement>) => {
        setDisplay(e.target.checked)
    }

    return <Card className={"stats-card"}>
        <Card.Header className={"stats-card-header"}>
            <h4 className={"stats-sub-title"}>{t('speed.title')}</h4>
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
                        <Row>
                            {metricsStr}
                        </Row>
                        <Row>
                            {
                                (cargoCount > 0 && overwriteSpeed === 0) ? (
                                    displayStat2(t('speed.speed') + " [?]", t('meters_per_second'), prettyNumber(calculatedSpeed), prettyNumber(speedWithCargo))
                                ) : (
                                    displayStat(t('speed.speed') + " [?]", t('meters_per_second'), prettyNumber(calculatedSpeed))
                                )
                            }
                        </Row>
                        <Row>
                            {
                                (cargoCount > 0 && overwriteSpeed === 0) ? (
                                    displayStat2(t('speed.estimated_range'), t('km'), prettyNumber(PropellantDistance), prettyNumber(PropellantDistanceWithCargo))
                                ) : (
                                    displayStat(t('speed.estimated_range'), t('km'), prettyNumber(PropellantDistance))
                                )
                            }
                        </Row>
                        <Row>
                            {
                                (cargoCount > 0) ? (
                                    displayStat2(t('speed.ship_weight'), t('kg'), prettyNumber(shipWeight), prettyNumber(shipWeight + cargoWeight * cargoCount))
                                ) : (
                                    displayStat(t('speed.ship_weight'), t('kg'), prettyNumber(shipWeight))
                                )
                            }
                        </Row>
                        <Row>
                            {
                                (cargoCount > 0 && overwriteSpeed === 0) ? (
                                    displayStat2(t('speed.estimated_time'), "", time, "")
                                ) : (
                                    displayStat(t('speed.estimated_time'), "", time)
                                )
                            }
                        </Row>
                        <Row>
                            {
                                (totalPropellant === 0) ? (
                                    <Col className={"stats-warning"}>
                                        {t("speed.no_propellant")}
                                    </Col>
                                ) : null
                            }
                        </Row>
                        <Row>
                            {
                                (totalPropellant !== 0 && overwritePropellantConsumption && overwrittenPropellantConsumption === 0) ? (
                                    <Col className={"stats-warning"}>
                                        {t("speed.no_propellant_consumption")}
                                    </Col>
                                ) : null
                            }
                        </Row>
                    </Container> : null
            }
        </Card.Body>
    </Card>
}

export default FlightStats;
