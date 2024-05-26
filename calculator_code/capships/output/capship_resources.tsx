import "./capship_resources.css"
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import getNewResourceProp, {add_props} from "../../values/ressources";
import {
    get_exorium_fuel_tank,
    get_exorium_processing_unit,
    get_fast_travel_core_module,
    get_fast_travel_propellant_tank,
    get_generator_module,
    get_reconstruction_machine,
    get_shield_generator_module
} from "../resources/capship_component_resources";
import {stack_value} from "../../../global_values";
import {prettyNumber} from "../../../../utilities/pretty_number";
import {
    get_thruster_module_frame,
    get_thruster_module_nozzle,
    get_thruster_module_nozzle_ring,
    get_thruster_module_nozzle_support
} from "../resources/capship_thruster_resources";
import {
    get_capship_cube,
    get_capship_cube_wall_v1,
    get_capship_frame_long, get_capship_frame_medium
} from "../resources/capship_structure_resources";
import {
    get_capship_factory_hall_corner_beam, get_capship_factory_hall_edge_beam,
    get_capship_hall_corner_beam,
    get_capship_hall_edge_beam,
    get_capship_hangar_hall_corner_beam, get_capship_hangar_hall_edge_beam
} from "../resources/capship_halls_resources";

function CapShipResources(
    {
        exoriumProcessingUnitCount,
        exoriumFuelTankCount,
        fastTravelCoreModuleCount,
        fastTravelPropellantTankCount,
        generatorModuleCount,
        reconstructionMachineCount,
        shieldGeneratorCount,
        thrusterModuleFrameCount,
        thrusterModuleNozzleCount,
        thrusterModuleNozzleRingCount,
        thrusterModuleNozzleSupportCount,
        cubeCount,
        cubeWallV1Count,
        longFrameCount,
        mediumFrameCount,
        capShipHallCornerCount,
        capShipHallEdgeCount,
        capShipShipDesignerCornerCount,
        capShipShipDesignerEdgeCount,
        capShipFactoryHallCornerCount,
        capShipFactoryHallEdgeCount,
    }: {
        exoriumProcessingUnitCount: number,
        exoriumFuelTankCount: number,
        fastTravelCoreModuleCount: number,
        fastTravelPropellantTankCount: number,
        generatorModuleCount: number,
        reconstructionMachineCount: number,
        shieldGeneratorCount: number,
        thrusterModuleFrameCount: number,
        thrusterModuleNozzleCount: number,
        thrusterModuleNozzleRingCount: number,
        thrusterModuleNozzleSupportCount: number,
        cubeCount: number,
        cubeWallV1Count: number,
        longFrameCount: number,
        mediumFrameCount: number
        capShipHallCornerCount: number,
        capShipHallEdgeCount: number,
        capShipShipDesignerCornerCount: number,
        capShipShipDesignerEdgeCount: number,
        capShipFactoryHallCornerCount: number,
        capShipFactoryHallEdgeCount: number,
    }) {
    const {t} = useTranslation('cap_ship_calc');

    const [sum, setSum] = React.useState(getNewResourceProp())
    const [total, setTotal] = React.useState(0)
    const [totalStacks, setTotalStacks] = React.useState(0)
    const [sort_by_name, setSort_by_name] = useState(true)
    const [round_stacks, setRound_stacks] = useState(false)

    const handleSortByName = () => {
        setSort_by_name(!sort_by_name)
    }

    const handleRoundStacks = () => {
        setRound_stacks(!round_stacks)
    }

    useEffect(() => {
        let prop_sum = getNewResourceProp()
        prop_sum = add_props(prop_sum, get_exorium_processing_unit(), exoriumProcessingUnitCount)
        prop_sum = add_props(prop_sum, get_exorium_fuel_tank(), exoriumFuelTankCount)
        prop_sum = add_props(prop_sum, get_fast_travel_core_module(), fastTravelCoreModuleCount)
        prop_sum = add_props(prop_sum, get_fast_travel_propellant_tank(), fastTravelPropellantTankCount)
        prop_sum = add_props(prop_sum, get_generator_module(), generatorModuleCount)
        prop_sum = add_props(prop_sum, get_reconstruction_machine(), reconstructionMachineCount)
        prop_sum = add_props(prop_sum, get_shield_generator_module(), shieldGeneratorCount)
        prop_sum = add_props(prop_sum, get_thruster_module_frame(), thrusterModuleFrameCount)
        prop_sum = add_props(prop_sum, get_thruster_module_nozzle(), thrusterModuleNozzleCount)
        prop_sum = add_props(prop_sum, get_thruster_module_nozzle_ring(), thrusterModuleNozzleRingCount)
        prop_sum = add_props(prop_sum, get_thruster_module_nozzle_support(), thrusterModuleNozzleSupportCount)
        prop_sum = add_props(prop_sum, get_capship_cube(), cubeCount)
        prop_sum = add_props(prop_sum, get_capship_cube_wall_v1(), cubeWallV1Count)
        prop_sum = add_props(prop_sum, get_capship_frame_long(), longFrameCount)
        prop_sum = add_props(prop_sum, get_capship_frame_medium(), mediumFrameCount)
        prop_sum = add_props(prop_sum, get_capship_hall_corner_beam(), capShipHallCornerCount)
        prop_sum = add_props(prop_sum, get_capship_hall_edge_beam(), capShipHallEdgeCount)
        prop_sum = add_props(prop_sum, get_capship_hangar_hall_corner_beam(), capShipShipDesignerCornerCount)
        prop_sum = add_props(prop_sum, get_capship_hangar_hall_edge_beam(), capShipShipDesignerEdgeCount)
        prop_sum = add_props(prop_sum, get_capship_factory_hall_corner_beam(), capShipFactoryHallCornerCount)
        prop_sum = add_props(prop_sum, get_capship_factory_hall_edge_beam(), capShipFactoryHallEdgeCount)
        setSum(prop_sum)
        const keys = Object.keys(prop_sum)
        const values = Object.values(prop_sum)
        let tl = 0
        let tls = 0
        keys.forEach((key, index) => {
            tls += Math.ceil(values[index] / stack_value)
            tl += values[index]
        })
        setTotalStacks(tls)
        setTotal(tl)
    }, [cubeCount, exoriumFuelTankCount, exoriumProcessingUnitCount, fastTravelCoreModuleCount,
        fastTravelPropellantTankCount, generatorModuleCount, longFrameCount, mediumFrameCount,
        reconstructionMachineCount, shieldGeneratorCount, thrusterModuleFrameCount, thrusterModuleNozzleCount,
        thrusterModuleNozzleRingCount, thrusterModuleNozzleSupportCount, cubeWallV1Count, capShipHallCornerCount,
        capShipHallEdgeCount, capShipShipDesignerCornerCount, capShipShipDesignerEdgeCount,
        capShipFactoryHallCornerCount, capShipFactoryHallEdgeCount, round_stacks]);

    function display_resources() {
        let entries = Object.entries(sum);
        if (sort_by_name) {
            entries.sort((a, b) => a[0].localeCompare(b[0]));
        } else {
            entries.sort((a, b) => b[1] - a[1]);
        }
        return entries.map(([key, value]) => {
            if (value !== 0) {
                return <Row key={key}>
                    <Col xs={6}>
                        {key}
                    </Col>
                    <Col xs={3}>
                        {
                            (round_stacks) ?
                                <>
                                    {prettyNumber(Math.ceil(value / stack_value))} {t('stacks')}
                                </> :
                                <>
                                    {prettyNumber(value / stack_value)} {t('stacks')}
                                </>
                        }
                    </Col>
                    <Col xs={3}>
                        {prettyNumber(value)} {t('kilo_voxels')}
                    </Col>
                </Row>
            } else {
                return <div key={key}></div>
            }
        })
    }

    return (
        <div>
            <Card>
                <Card.Header className={"stats-card-header"}>
                    <h3>{t('required_resources')}</h3>
                    <div className={"capship-toggle"}>
                        <Button variant="primary"
                                className={"calc-setting-button"}
                                onClick={handleSortByName}>
                            {
                                (sort_by_name) ?
                                    <span>{t('sort.sort_by_stacks')}</span> :
                                    <span>{t('sort.sort_by_name')}</span>
                            }
                        </Button>
                        <Button variant="primary"
                                className={"calc-setting-button"}
                                onClick={handleRoundStacks}>
                            {
                                (round_stacks) ?
                                    <span>{t('sort.round_values')}</span> :
                                    <span>{t('sort.exact_value')}</span>
                            }
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Container>
                        {display_resources()}
                        <Row className={"capship-total-display"}>
                            <Col xs={6}>
                                {t('total')}
                            </Col>
                            <Col xs={3}>
                                {
                                    (round_stacks) ?
                                        <>
                                            {prettyNumber(totalStacks)} {t('stacks')}
                                        </> :
                                        <>
                                            {prettyNumber(total / stack_value)} {t('stacks')}
                                        </>
                                }
                            </Col>
                            <Col xs={3}>
                                {prettyNumber(total)} {t('kilo_voxels')}
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CapShipResources;
