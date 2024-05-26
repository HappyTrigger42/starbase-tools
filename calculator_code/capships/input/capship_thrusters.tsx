import {useTranslation} from "react-i18next";
import {Button, ButtonGroup, Card, Container, Row} from "react-bootstrap";
import ModuleLine from "../misc/module_line";
import React from "react";

function CapshipThrusters(
    {
        thrusterModuleFrameCount,
        setThrusterModuleFrameCount,
        thrusterModuleNozzleCount,
        setThrusterModuleNozzleCount,
        thrusterModuleNozzleRingCount,
        setThrusterModuleNozzleRingCount,
        thrusterModuleNozzleSupportCount,
        setThrusterModuleNozzleSupportCount
    } : {
        thrusterModuleFrameCount: number,
        setThrusterModuleFrameCount: React.Dispatch<React.SetStateAction<number>>;
        thrusterModuleNozzleCount: number,
        setThrusterModuleNozzleCount: React.Dispatch<React.SetStateAction<number>>;
        thrusterModuleNozzleRingCount: number,
        setThrusterModuleNozzleRingCount: React.Dispatch<React.SetStateAction<number>>;
        thrusterModuleNozzleSupportCount: number,
        setThrusterModuleNozzleSupportCount: React.Dispatch<React.SetStateAction<number>>;
    }
) {
    const { t } = useTranslation('cap_ship_calc');

    const handleAddThrusterModule = () => {
        let frame_count = thrusterModuleFrameCount + 1;
        setThrusterModuleFrameCount(frame_count);
        let nozzle_count = thrusterModuleNozzleCount + 1;
        setThrusterModuleNozzleCount(nozzle_count);
        let nozzle_ring_count = thrusterModuleNozzleRingCount + 10;
        setThrusterModuleNozzleRingCount(nozzle_ring_count);
        let nozzle_support_count = thrusterModuleNozzleSupportCount + 1;
        setThrusterModuleNozzleSupportCount(nozzle_support_count);
    }

    return (
        <Card>
            <Card.Header>
                <h3>{t('thrusters')}</h3>
            </Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        <ButtonGroup>
                            <Button variant="primary"
                                    onClick={handleAddThrusterModule}
                                    className={""}>
                                {t('add.add_thruster')}
                            </Button>
                        </ButtonGroup>
                    </Row>
                    <ModuleLine
                        value={thrusterModuleFrameCount}
                        value_name={"thrusterModuleFrameCount"}
                        setter={setThrusterModuleFrameCount}/>
                    <ModuleLine
                        value={thrusterModuleNozzleCount}
                        value_name={"thrusterModuleNozzleCount"}
                        setter={setThrusterModuleNozzleCount}/>
                    <ModuleLine
                        value={thrusterModuleNozzleRingCount}
                        value_name={"thrusterModuleNozzleRingCount"}
                        setter={setThrusterModuleNozzleRingCount}/>
                    <ModuleLine
                        value={thrusterModuleNozzleSupportCount}
                        value_name={"thrusterModuleNozzleSupportCount"}
                        setter={setThrusterModuleNozzleSupportCount}/>
                    {
                        (thrusterModuleFrameCount === 0) ?
                            <Row>
                            <span className={"stats-warning"}>
                                {t('no_propulsion')}
                            </span>
                            </Row>: <></>
                    }
                    {
                        (thrusterModuleNozzleCount > thrusterModuleFrameCount) ?
                        <Row>
                            <span className={"stats-warning"}>
                                {t('too_many_nozzles')}
                            </span>
                        </Row>: <></>
                    }
                    {
                        (thrusterModuleNozzleRingCount / 10 > thrusterModuleFrameCount) ?
                            <Row>
                            <span className={"stats-warning"}>
                                {t('too_many_rings')}
                            </span>
                            </Row>: <></>
                    }
                    {
                        (thrusterModuleNozzleSupportCount > thrusterModuleNozzleRingCount) ?
                            <Row>
                            <span className={"stats-warning"}>
                                {t('too_many_supports')}
                            </span>
                            </Row>: <></>
                    }
                </Container>
            </Card.Body>
        </Card>
    );
}

export default CapshipThrusters;
