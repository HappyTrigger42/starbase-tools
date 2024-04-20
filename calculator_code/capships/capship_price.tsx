import "./capship_price.css"
import {Button, ButtonGroup, ButtonToolbar, Col, Container, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import {useLocalStorage} from "../../../utilities/local_storage";
import {build_count, capship_calc_url} from "../../global_values";
import CapShipModules from "./input/capship_modules";
import CapshipThrusters from "./input/capship_thrusters";
import CapshipStructure from "./input/capship_structure";
import CapShipResources from "./output/capship_resources";
import CapshipHalls from "./input/capship_halls";


function CapshipPrice() {
    const exorium_processing_unit_price_default = 1;
    const exorium_fuel_tank_default = 1;
    const fast_travel_core_module_default = 1;
    const fast_travel_propellant_tank_default = 1;
    const reconstruction_machine_default = 0;
    const shield_generator_default = 1;
    const generator_module_default = 1;
    const cube_default = 60;
    const cube_wall_v1_default = 20;
    const long_frame_default = 20;
    const medium_frame_default = 20;
    const thruster_module_frame_default = 1;
    const thruster_module_nozzle_default = 1;
    const thruster_module_nozzle_ring_default = 10;
    const thruster_module_nozzle_support_default = 1;
    const cap_ship_hall_corner_default = 0;
    const cap_ship_hall_edge_default = 0;
    const cap_ship_ship_designer_corner_default = 0;
    const cap_ship_ship_designer_edge_default = 0;
    const cap_ship_factory_hall_corner_default = 0;
    const cap_ship_factory_hall_edge_default = 0;

    // values to export
    // modules
    const [exoriumProcessingUnitCount, setExoriumProcessingUnitCount] = useLocalStorage("exoriumProcessingUnitCount", exorium_processing_unit_price_default);
    const [exoriumFuelTankCount, setExoriumFuelTankCount] = useLocalStorage("exoriumFuelTankCount", exorium_fuel_tank_default);
    const [fastTravelCoreModuleCount, setFastTravelCoreModuleCount] = useLocalStorage("fastTravelCoreModuleCount", fast_travel_core_module_default);
    const [fastTravelPropellantTankCount, setFastTravelPropellantTankCount] = useLocalStorage("fastTravelPropellantTankCount", fast_travel_propellant_tank_default);
    const [reconstructionMachineCount, setReconstructionMachineCount] = useLocalStorage("reconstructionMachineCount", reconstruction_machine_default);
    const [shieldGeneratorCount, setShieldGeneratorCount] = useLocalStorage("shieldGeneratorCount", shield_generator_default);
    const [generatorModuleCount, setGeneratorModuleCount] = useLocalStorage("generatorModuleCount", generator_module_default);
    // structure
    const [cubeCount, setCubeCount] = useLocalStorage("cubeCount", cube_default);
    const [cubeWallV1Count, setCubeWallV1Count] = useLocalStorage("wallCount", cube_wall_v1_default);
    const [longFrameCount, setLongFrameCount] = useLocalStorage("longFrameCount", long_frame_default);
    const [mediumFrameCount, setMediumFrameCount] = useLocalStorage("mediumFrameCount", medium_frame_default);

    // thrust
    const [thrusterModuleFrameCount, setThrusterModuleFrameCount] = useLocalStorage("thrusterModuleFrameCount", thruster_module_frame_default);
    const [thrusterModuleNozzleCount, setThrusterModuleNozzleCount] = useLocalStorage("thrusterModuleNozzleCount", thruster_module_nozzle_default);
    const [thrusterModuleNozzleRingCount, setThrusterModuleNozzleRingCount] = useLocalStorage("thrusterModuleNozzleRingCount", thruster_module_nozzle_ring_default);
    const [thrusterModuleNozzleSupportCount, setThrusterModuleNozzleSupportCount] = useLocalStorage("thrusterModuleNozzleSupportCount", thruster_module_nozzle_support_default);

    // halls
    const [capShipHallCornerCount, setCapShipHallCornerCount] = useLocalStorage("capShipHallCornerCount", cap_ship_hall_corner_default);
    const [capShipHallEdgeCount, setCapShipHallEdgeCount] = useLocalStorage("capShipHallEdgeCount", cap_ship_hall_edge_default);
    const [capShipShipDesignerCornerCount, setCapShipShipDesignerCornerCount] = useLocalStorage("capShipShipDesignerCornerCount", cap_ship_ship_designer_corner_default);
    const [capShipShipDesignerEdgeCount, setCapShipShipDesignerEdgeCount] = useLocalStorage("capShipShipDesignerEdgeCount", cap_ship_ship_designer_edge_default);
    const [capShipFactoryHallCornerCount, setCapShipFactoryHallCornerCount] = useLocalStorage("capShipFactoryHallCornerCount", cap_ship_factory_hall_corner_default);
    const [capShipFactoryHallEdgeCount, setCapShipFactoryHallEdgeCount] = useLocalStorage("capShipFactoryHallEdgeCount", cap_ship_factory_hall_edge_default);

    // const parameter values
    const data_string_key = "data"

    // notification message for the clipboard
    const [notificationMessage, setNotificationMessage] = useState('');
    const [timerKey, setTimerKey] = useState(0);

    const { t } = useTranslation('cap_ship_calc');

    async function copyTextToClipboard(text: string) {
        try {
            await navigator.clipboard.writeText(text);
            setNotificationMessage('Text copied to clipboard!');
        } catch (err) {
            setNotificationMessage('Failed to copy text.');
        }
    }

    const handleReset = () => {
        setExoriumProcessingUnitCount(exorium_processing_unit_price_default);
        setExoriumFuelTankCount(exorium_fuel_tank_default);
        setFastTravelCoreModuleCount(fast_travel_core_module_default);
        setFastTravelPropellantTankCount(fast_travel_propellant_tank_default);
        setReconstructionMachineCount(reconstruction_machine_default);
        setShieldGeneratorCount(shield_generator_default);
        setGeneratorModuleCount(generator_module_default);
        setCubeCount(cube_default);
        setCubeWallV1Count(cube_wall_v1_default);
        setLongFrameCount(long_frame_default);
        setMediumFrameCount(medium_frame_default);
        setThrusterModuleFrameCount(thruster_module_frame_default);
        setThrusterModuleNozzleCount(thruster_module_nozzle_default);
        setThrusterModuleNozzleRingCount(thruster_module_nozzle_ring_default);
        setThrusterModuleNozzleSupportCount(thruster_module_nozzle_support_default);
        setCapShipHallCornerCount(cap_ship_hall_corner_default);
        setCapShipHallEdgeCount(cap_ship_hall_edge_default);
        setCapShipShipDesignerCornerCount(cap_ship_ship_designer_corner_default);
        setCapShipShipDesignerEdgeCount(cap_ship_ship_designer_edge_default);
        setCapShipFactoryHallCornerCount(cap_ship_factory_hall_corner_default);
        setCapShipFactoryHallEdgeCount(cap_ship_factory_hall_edge_default);
    }

    const handleResetZero = () => {
        setExoriumProcessingUnitCount(0);
        setExoriumFuelTankCount(0);
        setFastTravelCoreModuleCount(0);
        setFastTravelPropellantTankCount(0);
        setReconstructionMachineCount(0);
        setShieldGeneratorCount(0);
        setGeneratorModuleCount(0);
        setCubeCount(0);
        setCubeWallV1Count(0);
        setLongFrameCount(0);
        setMediumFrameCount(0);
        setThrusterModuleFrameCount(0);
        setThrusterModuleNozzleCount(0);
        setThrusterModuleNozzleRingCount(0);
        setThrusterModuleNozzleSupportCount(0);
        setCapShipHallCornerCount(0);
        setCapShipHallEdgeCount(0);
        setCapShipShipDesignerCornerCount(0);
        setCapShipShipDesignerEdgeCount(0);
        setCapShipFactoryHallCornerCount(0);
        setCapShipFactoryHallEdgeCount(0);
    }

    const handleExport = async () => {
        const state = {
            exoriumProcessingUnitCount,
            exoriumFuelTankCount,
            fastTravelCoreModuleCount,
            fastTravelPropellantTankCount,
            reconstructionMachineCount,
            shieldGeneratorCount,
            generatorModuleCount,
            cubeCount,
            cubeWallV1Count,
            longFrameCount,
            mediumFrameCount,
            thrusterModuleFrameCount,
            thrusterModuleNozzleCount,
            thrusterModuleNozzleRingCount,
            thrusterModuleNozzleSupportCount,
            capShipHallCornerCount,
            capShipHallEdgeCount,
            capShipShipDesignerCornerCount,
            capShipShipDesignerEdgeCount,
            capShipFactoryHallCornerCount,
            capShipFactoryHallEdgeCount,
        }
        const jsonState = JSON.stringify(state)
        const compressedState = compressToEncodedURIComponent(jsonState);
        const url = `${capship_calc_url}/?${data_string_key}=${compressedState}`;
        await copyTextToClipboard(url)
        resetTimer()
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const compressedState = params.get(data_string_key);

        if (compressedState) {
            const jsonState = decompressFromEncodedURIComponent(compressedState);
            const state = JSON.parse(jsonState);
            setExoriumProcessingUnitCount(state.exoriumProcessingUnitCount);
            setExoriumFuelTankCount(state.exoriumFuelTankCount);
            setFastTravelCoreModuleCount(state.fastTravelCoreModuleCount);
            setFastTravelPropellantTankCount(state.fastTravelPropellantTankCount);
            setReconstructionMachineCount(state.reconstructionMachineCount);
            setShieldGeneratorCount(state.shieldGeneratorCount);
            setGeneratorModuleCount(state.generatorModuleCount);
            setCubeCount(state.cubeCount);
            setCubeWallV1Count(state.cubeWallV1Count);
            setLongFrameCount(state.longFrameCount);
            setMediumFrameCount(state.mediumFrameCount);
            setThrusterModuleFrameCount(state.thrusterModuleFrameCount);
            setThrusterModuleNozzleCount(state.thrusterModuleNozzleCount);
            setThrusterModuleNozzleRingCount(state.thrusterModuleNozzleRingCount);
            setThrusterModuleNozzleSupportCount(state.thrusterModuleNozzleSupportCount);
            setCapShipHallCornerCount(state.capShipHallCornerCount);
            setCapShipHallEdgeCount(state.capShipHallEdgeCount);
            setCapShipShipDesignerCornerCount(state.capShipShipDesignerCornerCount);
            setCapShipShipDesignerEdgeCount(state.capShipShipDesignerEdgeCount);
            setCapShipFactoryHallCornerCount(state.capShipFactoryHallCornerCount);
            setCapShipFactoryHallEdgeCount(state.capShipFactoryHallEdgeCount);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setNotificationMessage("")
        }, 3000);
        return () => clearTimeout(timer);
    }, [timerKey]);

    const resetTimer = () => {
        setNotificationMessage(t("link"))
        setTimerKey(prevKey => prevKey + 1);
    };

    return <div>
        <Container className={"calc-title-container"}>
            <Row className={"ship-title-row"}>
                <h2>{t('title')}</h2>
                <p>{t('build')} {build_count}</p>
            </Row>
            <Row className={"ship-title-row"}>
                <ButtonToolbar className="justify-content-center">
                    <ButtonGroup>
                        <Button variant="primary"
                                onClick={handleReset}
                                className={"calc-setting-button"}>
                            <i className="fa-solid fa-gear calc-button-icon"></i>
                            <span className={"calc-button-text"}>{t('reset')}</span>
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button variant="primary"
                                onClick={handleResetZero}
                                className={"calc-setting-button"}>
                            <i className="fa-solid fa-gear calc-button-icon"></i>
                            <span className={"calc-button-text"}>{t('reset_zero')}</span>
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button variant="primary"
                                onClick={handleExport}
                                className={"calc-setting-button"}>
                            <i className="fa-solid fa-floppy-disk calc-button-icon"></i>
                            <span className={"calc-button-text"}>{t('export')}</span>
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Row>
            <Row>
                <p className={"calc-notification"}>
                    {notificationMessage}
                </p>
            </Row>
        </Container>
        <Container className={"calc-container"}>
            <Row>
                <Col md={6}>
                    <CapShipModules
                        exoriumProcessingUnitCount={exoriumProcessingUnitCount}
                        setExoriumProcessingUnitCount={setExoriumProcessingUnitCount}
                        exoriumFuelTankCount={exoriumFuelTankCount}
                        setExoriumFuelTankCount={setExoriumFuelTankCount}
                        fastTravelCoreModuleCount={fastTravelCoreModuleCount}
                        setFastTravelCoreModuleCount={setFastTravelCoreModuleCount}
                        fastTravelPropellantTankCount={fastTravelPropellantTankCount}
                        setFastTravelPropellantTankCount={setFastTravelPropellantTankCount}
                        reconstructionMachineCount={reconstructionMachineCount}
                        setReconstructionMachineCount={setReconstructionMachineCount}
                        shieldGeneratorCount={shieldGeneratorCount}
                        setShieldGeneratorCount={setShieldGeneratorCount}
                        generatorModuleCount={generatorModuleCount}
                        setGeneratorModuleCount={setGeneratorModuleCount}
                    />
                    <CapshipThrusters
                        thrusterModuleFrameCount={thrusterModuleFrameCount}
                        setThrusterModuleFrameCount={setThrusterModuleFrameCount}
                        thrusterModuleNozzleCount={thrusterModuleNozzleCount}
                        setThrusterModuleNozzleCount={setThrusterModuleNozzleCount}
                        thrusterModuleNozzleRingCount={thrusterModuleNozzleRingCount}
                        setThrusterModuleNozzleRingCount={setThrusterModuleNozzleRingCount}
                        thrusterModuleNozzleSupportCount={thrusterModuleNozzleSupportCount}
                        setThrusterModuleNozzleSupportCount={setThrusterModuleNozzleSupportCount}
                    />
                    <CapshipStructure
                        cubeCount={cubeCount}
                        setCubeCount={setCubeCount}
                        cubeWallV1Count={cubeWallV1Count}
                        setCubeWallV1Count={setCubeWallV1Count}
                        longFrameCount={longFrameCount}
                        setLongFrameCount={setLongFrameCount}
                        mediumFrameCount={mediumFrameCount}
                        setMediumFrameCount={setMediumFrameCount}
                    />
                    <CapshipHalls
                        capShipHallCornerCount={capShipHallCornerCount}
                        setCapShipHallCornerCount={setCapShipHallCornerCount}
                        capShipHallEdgeCount={capShipHallEdgeCount}
                        setCapShipHallEdgeCount={setCapShipHallEdgeCount}
                        capShipShipDesignerCornerCount={capShipShipDesignerCornerCount}
                        setCapShipShipDesignerCornerCount={setCapShipShipDesignerCornerCount}
                        capShipShipDesignerEdgeCount={capShipShipDesignerEdgeCount}
                        setCapShipShipDesignerEdgeCount={setCapShipShipDesignerEdgeCount}
                        capShipFactoryHallCornerCount={capShipFactoryHallCornerCount}
                        setCapShipFactoryHallCornerCount={setCapShipFactoryHallCornerCount}
                        capShipFactoryHallEdgeCount={capShipFactoryHallEdgeCount}
                        setCapShipFactoryHallEdgeCount={setCapShipFactoryHallEdgeCount}
                    />
                </Col>
                <Col md={6}>
                    <CapShipResources
                        exoriumProcessingUnitCount={exoriumProcessingUnitCount}
                        exoriumFuelTankCount={exoriumFuelTankCount}
                        fastTravelCoreModuleCount={fastTravelCoreModuleCount}
                        fastTravelPropellantTankCount={fastTravelPropellantTankCount}
                        generatorModuleCount={generatorModuleCount}
                        reconstructionMachineCount={reconstructionMachineCount}
                        shieldGeneratorCount={shieldGeneratorCount}
                        thrusterModuleFrameCount={thrusterModuleFrameCount}
                        thrusterModuleNozzleCount={thrusterModuleNozzleCount}
                        thrusterModuleNozzleRingCount={thrusterModuleNozzleRingCount}
                        thrusterModuleNozzleSupportCount={thrusterModuleNozzleSupportCount}
                        cubeCount={cubeCount}
                        cubeWallV1Count={cubeWallV1Count}
                        longFrameCount={longFrameCount}
                        mediumFrameCount={mediumFrameCount}
                        capShipHallCornerCount={capShipHallCornerCount}
                        capShipHallEdgeCount={capShipHallEdgeCount}
                        capShipShipDesignerCornerCount={capShipShipDesignerCornerCount}
                        capShipShipDesignerEdgeCount={capShipShipDesignerEdgeCount}
                        capShipFactoryHallCornerCount={capShipFactoryHallCornerCount}
                        capShipFactoryHallEdgeCount={capShipFactoryHallEdgeCount}
                    />
                </Col>
            </Row>
        </Container>
    </div>
}

export default CapshipPrice;
