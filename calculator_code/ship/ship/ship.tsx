import {Button, ButtonGroup, Card, Col, Container, Row} from "react-bootstrap";
import React from "react";
import {clamp} from "../../../../utilities/clamp";
import {useTranslation} from "react-i18next";


function Ship(
    {
        shipWeight,
        setShipWeight,
        overwriteSpeed,
        setOverwriteSpeed,
        overwriteFuelChamberCount,
        setOverwriteFuelChamberCount,
        overwrittenSpeed,
        setOverwrittenSpeed,
        overwrittenFuelChamberCount,
        setOverwrittenFuelChamberCount,
        overwritePropellantConsumption,
        setOverwritePropellantConsumption,
        overwrittenPropellantConsumption,
        setOverwrittenPropellantConsumption,
        cargoCount,
        setCargoCount,
        cargoWeight,
        setCargoWeight
    } : {
        shipWeight: number,
        setShipWeight: React.Dispatch<React.SetStateAction<number>>;
        overwriteSpeed: number,
        setOverwriteSpeed: React.Dispatch<React.SetStateAction<number>>;
        overwriteFuelChamberCount: number,
        setOverwriteFuelChamberCount: React.Dispatch<React.SetStateAction<number>>;
        overwrittenSpeed: number,
        setOverwrittenSpeed: React.Dispatch<React.SetStateAction<number>>;
        overwrittenFuelChamberCount: number,
        setOverwrittenFuelChamberCount: React.Dispatch<React.SetStateAction<number>>;
        overwritePropellantConsumption: number,
        setOverwritePropellantConsumption: React.Dispatch<React.SetStateAction<number>>;
        overwrittenPropellantConsumption: number,
        setOverwrittenPropellantConsumption: React.Dispatch<React.SetStateAction<number>>;
        cargoCount: number,
        setCargoCount: React.Dispatch<React.SetStateAction<number>>;
        cargoWeight: number,
        setCargoWeight: React.Dispatch<React.SetStateAction<number>>;
    }) {
    const { t } = useTranslation('ship_calc');

    const shipWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = clamp(Number(e.target.value), 1, 100000000000);
        e.target.value = count.toString()
        setShipWeight(count);
    }

    const overwrittenShipSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = clamp(Number(e.target.value), 1, 200);
        e.target.value = count.toString()
        setOverwrittenSpeed(count);
    }

    const overwrittenFuelChamberCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = clamp(Number(e.target.value), 1, 1000);
        e.target.value = count.toString()
        setOverwrittenFuelChamberCount(count);
    }

    const overwrittenPropellantConsumptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = clamp(Number(e.target.value), 1, 100000);
        e.target.value = count.toString()
        setOverwrittenPropellantConsumption(count);
    }

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

    return (
        <Card>
            <Card.Header>
                <h3>{t('ship.title')}</h3>
            </Card.Header>
            <Card.Body>

                <Container>
                    <Row className={"card-attribute"}>
                        <Col xs={8}>
                            <div className={"card-attribute-text"}>
                                {t('ship.ship_weight')} [?]
                            </div>
                        </Col>
                        <Col xs={4}>
                            <input
                                className={"card-attribute-input"}
                                type="number"
                                value={shipWeight}
                                onChange={e => shipWeightChange(e)}
                            />
                        </Col>
                    </Row>
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
                    <Row className={"card-attribute"}>
                        <Col xs={8}>
                            <div className={"card-attribute-text"}>
                                {t('ship.overwrite_ship_speed')} [?]
                            </div>
                        </Col>
                        <Col xs={4}>
                            <ButtonGroup className={"thruster-density-selection"}>
                                <Button
                                    variant={overwriteSpeed ? "primary" : "secondary"}
                                    onClick={() => setOverwriteSpeed(1)}
                                    className={"thruster-density-selection-button"}>
                                    {t('yes')}
                                </Button>
                                <Button
                                    variant={!overwriteSpeed ? "primary" : "secondary"}
                                    onClick={() => setOverwriteSpeed(0)}
                                    className={"thruster-density-selection-button"}>
                                    {t('no')}
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    {
                        (overwriteSpeed !== 0) ? (
                            <Row className={"card-attribute"}>
                                <Col xs={8}>
                                    <div className={"card-attribute-text"}>
                                        {t('ship.overwritten_ship_speed')}
                                    </div>
                                </Col>
                                <Col xs={4}>
                                    <input
                                        className={"card-attribute-input"}
                                        type="number"
                                        value={overwrittenSpeed}
                                        onChange={e => overwrittenShipSpeedChange(e)}
                                    />
                                </Col>
                            </Row>
                        ) : null
                    }
                    <Row className={"card-attribute"}>
                        <Col xs={8}>
                            <div className={"card-attribute-text"}>
                                {t('ship.overwrite_fuel_chamber_count')} [?]
                            </div>
                        </Col>
                        <Col xs={4}>
                            <ButtonGroup className={"thruster-density-selection"}>
                                <Button
                                    variant={overwriteFuelChamberCount ? "primary" : "secondary"}
                                    onClick={() => setOverwriteFuelChamberCount(1)}
                                    className={"thruster-density-selection-button"}>
                                    {t('yes')}
                                </Button>
                                <Button
                                    variant={!overwriteFuelChamberCount ? "primary" : "secondary"}
                                    onClick={() => setOverwriteFuelChamberCount(0)}
                                    className={"thruster-density-selection-button"}>
                                    {t('no')}
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    {
                        (overwriteFuelChamberCount !== 0) ? (
                            <Row className={"card-attribute"}>
                                <Col xs={8}>
                                    <div className={"card-attribute-text"}>
                                        {t('ship.overwritten_fuel_chamber_count')}
                                    </div>
                                </Col>
                                <Col xs={4}>
                                    <input
                                        className={"card-attribute-input"}
                                        type="number"
                                        value={overwrittenFuelChamberCount}
                                        onChange={e => overwrittenFuelChamberCountChange(e)}
                                    />
                                </Col>
                            </Row>
                        ) : null
                    }
                    <Row className={"card-attribute"}>
                        <Col xs={8}>
                            <div className={"card-attribute-text"}>
                                {t('ship.overwrite_propellant_consumption')} [?]
                            </div>
                        </Col>
                        <Col xs={4}>
                            <ButtonGroup className={"thruster-density-selection"}>
                                <Button
                                    variant={overwritePropellantConsumption ? "primary" : "secondary"}
                                    onClick={() => setOverwritePropellantConsumption(1)}
                                    className={"thruster-density-selection-button"}>
                                    {t('yes')}
                                </Button>
                                <Button
                                    variant={!overwritePropellantConsumption ? "primary" : "secondary"}
                                    onClick={() => setOverwritePropellantConsumption(0)}
                                    className={"thruster-density-selection-button"}>
                                    {t('no')}
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    {
                        (overwritePropellantConsumption !== 0) ? (
                            <Row className={"card-attribute"}>
                                <Col xs={8}>
                                    <div className={"card-attribute-text"}>
                                        {t('ship.overwritten_propellant_consumption')}
                                    </div>
                                </Col>
                                <Col xs={4}>
                                    <input
                                        className={"card-attribute-input"}
                                        type="number"
                                        value={overwrittenPropellantConsumption}
                                        onChange={e => overwrittenPropellantConsumptionChange(e)}
                                    />
                                </Col>
                            </Row>
                        ) : null
                    }
                </Container>
            </Card.Body>
        </Card>
    )
}

export default Ship;
