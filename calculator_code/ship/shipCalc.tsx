import "../calc.css"
import Thrusters from "./thrusters/thrusters";
import {Button, ButtonGroup, ButtonToolbar, Col, Container, Row} from "react-bootstrap";
import Stats from "./stats/stats";
import Ship from "./ship/ship";
import Power from "./power/power";
import Machinery from "./machinery/machinery";
import Cargo from "./cargo/cargo";
import Propellant from "./propellant/propellant";
import Weapons from "./weapons/weapons";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {build_count, ship_calc_url} from "../../global_values";
import {useLocalStorage} from "../../../utilities/local_storage";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import {collector_elec_per_sec} from "../values/tools_constants";

function ShipCalc() {
    const defaultGeneratorDensity = 3
    const defaultCollectorPower = 6000
    const defaultThrusterEfficiency = 95

    // values to be exported and imported in the url and local storage
    const [autoCannons, setAutoCannons] = useLocalStorage('autoCannons', 0);
    const [laserCannons, setLaserCannons] = useLocalStorage('laserCannons', 0);
    const [plasmaCannons, setPlasmaCannons] = useLocalStorage('plasmaCannons', 0);
    const [railGuns, setRailGuns] = useLocalStorage('railGuns', 0);
    const [generatorCards, setGeneratorCards] = useLocalStorage('generatorCards', []);
    const [generatorDensity, setGeneratorDensity] = useLocalStorage('generatorDensity', 3);
    const [batteryCount, setBatteryCount] = useLocalStorage('batteryCount', 0);
    const [smallPropellantCount, setSmallPropellantCount] = useLocalStorage('smallPropellantCount', 0)
    const [mediumPropellantCount, setMediumPropellantCount] = useLocalStorage('mediumPropellantCount', 0)
    const [bigPropellantCount, setBigPropellantCount] = useLocalStorage('bigPropellantCount', 0)
    const [collectorPower, setCollectorPower] = useLocalStorage('collectorPower', collector_elec_per_sec)
    const [collectorCount, setCollectorCount] = useLocalStorage('collectorCount', 0)
    const [miningLaserCount, setMiningLaserCount] = useLocalStorage('miningLaserCount', 0)
    const [towingWeight, setTowingWeight] = useLocalStorage('towingWeight', 0)
    const [thrusterEfficiency, setThrusterEfficiency] = useLocalStorage('thrusterEfficiency', 95);
    const [thrusterCards, setThrusterCards] = useLocalStorage('thrusterCards', []);
    const [overwriteSpeed, setOverwriteSpeed] = useLocalStorage('overwriteSpeed', 0);
    const [overwrittenSpeed, setOverwrittenSpeed] = useLocalStorage('overwrittenSpeed', 0);
    const [shipWeight, setShipWeight] = useLocalStorage('shipWeight', 1);
    const [overwriteFuelChamberCount, setOverwriteFuelChamberCount] = useLocalStorage('overwriteFuelChamberCount', 0);
    const [overwrittenFuelChamberCount, setOverwrittenFuelChamberCount] = useLocalStorage('overwrittenFuelChamberCount', 0);
    const [overwritePropellantConsumption, setOverwritePropellantConsumption] = useLocalStorage('overwritePropellantConsumption', 0);
    const [overwrittenPropellantConsumption, setOverwrittenPropellantConsumption] = useLocalStorage('overwrittenPropellantConsumption', 0);
    const [cargoCount, setCargoCount] = useLocalStorage('cargoCount', 0);
    const [cargoWeight, setCargoWeight] = useLocalStorage('cargoWeight', 0);

    // values that are calculated and that should not be stored
    const [TotalPowerGen, setTotalPowerGen] = useState(0)
    const [weaponPassivePowerConsumption, setWeaponPassivePowerConsumption] = useState(0);
    const [weaponShootingPowerConsumption, setWeaponShootingPowerConsumption] = useState(0);
    const [weaponHeatGeneratedWhenShooting, setWeaponHeatGeneratedWhenShooting] = useState(0);
    const [totalPropellant, setTotalPropellant] = useState(0)
    const [towingPowerDeficit, setTowingPowerDeficit] = React.useState(0);
    const [miningEquipmentPowerDeficit, setMiningEquipmentPowerDeficit] = React.useState(0);
    const [calculatedSpeed, setCalculatedSpeed] = React.useState(0);
    const [totalForwardThrust, setTotalForwardThrust] = useState(0);
    const [propellantConsumption, setPropellantConsumption] = useState(0);
    const [totalHeatGen, setTotalHeatGen] = useState(0);
    const [totalHeatFuelChamber, setTotalHeatFuelChamber] = useState(0);
    const [thrusterElectricityConsumption, setThrusterElectricityConsumption] = useState(0);

    // const parameter values
    const data_string_key = "data"

    // notification message for the clipboard
    const [notificationMessage, setNotificationMessage] = useState('');
    const [timerKey, setTimerKey] = useState(0);

    const { t } = useTranslation('ship_calc');

    async function copyTextToClipboard(text: string) {
        try {
            await navigator.clipboard.writeText(text);
            setNotificationMessage('Text copied to clipboard!');
        } catch (err) {
            setNotificationMessage('Failed to copy text.');
        }
    }

    const handleReset = () => {
        setAutoCannons(0)
        setLaserCannons(0)
        setPlasmaCannons(0)
        setRailGuns(0)
        setGeneratorCards([])
        setGeneratorDensity(defaultGeneratorDensity)
        setBatteryCount(0)
        setSmallPropellantCount(0)
        setMediumPropellantCount(0)
        setBigPropellantCount(0)
        setMiningLaserCount(0)
        setCollectorPower(defaultCollectorPower)
        setCollectorCount(0)
        setTowingWeight(0)
        setThrusterEfficiency(defaultThrusterEfficiency)
        setThrusterCards([])
        setOverwriteSpeed(0)
        setOverwrittenSpeed(0)
        setShipWeight(1)
        setOverwriteFuelChamberCount(0)
        setOverwrittenFuelChamberCount(0)
        setOverwritePropellantConsumption(0)
        setOverwrittenPropellantConsumption(0)
        setCargoCount(0)
        setCargoWeight(0)
    }

    const handleExport = async () => {
        const state = {autoCannons, laserCannons, plasmaCannons, railGuns, generatorCards, generatorDensity, batteryCount,
            smallPropellantCount, mediumPropellantCount, bigPropellantCount, miningLaserCount, collectorCount,
            collectorPower, towingWeight, thrusterEfficiency, thrusterCards, overwriteSpeed, overwrittenSpeed,
            shipWeight, overwriteFuelChamberCount, overwrittenFuelChamberCount, overwritePropellantConsumption,
            overwrittenPropellantConsumption, cargoCount, cargoWeight}
        const jsonState = JSON.stringify(state)
        const compressedState = compressToEncodedURIComponent(jsonState);
        const url = `${ship_calc_url}/?${data_string_key}=${compressedState}`;
        await copyTextToClipboard(url)
        resetTimer()
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const compressedState = params.get(data_string_key);

        if (compressedState) {
            const jsonState = decompressFromEncodedURIComponent(compressedState);
            const state = JSON.parse(jsonState);
            setAutoCannons(state.autoCannons)
            setLaserCannons(state.laserCannons)
            setPlasmaCannons(state.plasmaCannons)
            setRailGuns(state.railGuns)
            setGeneratorCards(state.generatorCards)
            setGeneratorDensity(state.generatorDensity)
            setBatteryCount(state.batteryCount)
            setSmallPropellantCount(state.smallPropellantCount)
            setMediumPropellantCount(state.mediumPropellantCount)
            setBigPropellantCount(state.bigPropellantCount)
            setMiningLaserCount(state.miningLaserCount)
            setCollectorPower(state.collectorPower)
            setCollectorCount(state.collectorCount)
            setTowingWeight(state.towingWeight)
            setThrusterEfficiency(state.thrusterEfficiency)
            setThrusterCards(state.thrusterCards)
            setOverwriteSpeed(state.overwriteSpeed)
            setOverwrittenSpeed(state.overwrittenSpeed)
            setShipWeight(state.shipWeight)
            setOverwriteFuelChamberCount(state.overwriteFuelChamberCount)
            setOverwrittenFuelChamberCount(state.overwrittenFuelChamberCount)
            setOverwritePropellantConsumption(state.overwritePropellantConsumption)
            setOverwrittenPropellantConsumption(state.overwrittenPropellantConsumption)
            setCargoCount(state.cargoCount)
            setCargoWeight(state.cargoWeight)
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
                        <Button variant="primary" onClick={handleReset} className={"calc-setting-button"}>
                            <i className="fa-solid fa-gear calc-button-icon"></i> <span className={"calc-button-text"}>{t('reset')}</span>
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button variant="primary" onClick={handleExport} className={"calc-setting-button"}>
                            <i className="fa-solid fa-floppy-disk calc-button-icon"></i> <span className={"calc-button-text"}>{t('export')}</span>
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
                <Col xl={3} md={6} xs={12}>
                    <Thrusters
                        thrusterEfficiency={thrusterEfficiency}
                        setThrusterEfficiency={setThrusterEfficiency}
                        thrusterCards={thrusterCards}
                        setThrusterCards={setThrusterCards}
                    />
                </Col>
                <Col xl={3} md={6} xs={12}>
                    <Power
                        cards={generatorCards}
                        setCards={setGeneratorCards}
                        density={generatorDensity}
                        setDensity={setGeneratorDensity}
                        batteryCount={batteryCount}
                        setBatteryCount={setBatteryCount}
                    />
                </Col>
                <Col xl={3} md={6} xs={12}>
                    <Ship
                        shipWeight={shipWeight}
                        setShipWeight={setShipWeight}
                        overwriteSpeed={overwriteSpeed}
                        setOverwriteSpeed={setOverwriteSpeed}
                        overwriteFuelChamberCount={overwriteFuelChamberCount}
                        setOverwriteFuelChamberCount={setOverwriteFuelChamberCount}
                        overwrittenSpeed={overwrittenSpeed}
                        setOverwrittenSpeed={setOverwrittenSpeed}
                        overwrittenFuelChamberCount={overwrittenFuelChamberCount}
                        setOverwrittenFuelChamberCount={setOverwrittenFuelChamberCount}
                        overwritePropellantConsumption={overwritePropellantConsumption}
                        setOverwritePropellantConsumption={setOverwritePropellantConsumption}
                        overwrittenPropellantConsumption={overwrittenPropellantConsumption}
                        setOverwrittenPropellantConsumption={setOverwrittenPropellantConsumption}
                    />
                    <Cargo
                        cargoCount={cargoCount}
                        setCargoCount={setCargoCount}
                        cargoWeight={cargoWeight}
                        setCargoWeight={setCargoWeight}
                    />
                    <Weapons
                        autoCannons={autoCannons}
                        setAutoCannons={setAutoCannons}
                        laserCannons={laserCannons}
                        setLaserCannons={setLaserCannons}
                        plasmaCannons={plasmaCannons}
                        setPlasmaCannons={setPlasmaCannons}
                        railGuns={railGuns}
                        setRailGuns={setRailGuns}
                    />
                    <Machinery
                        collectorCount={collectorCount}
                        setCollectorCount={setCollectorCount}
                        collectorPower={collectorPower}
                        setCollectorPower={setCollectorPower}
                        miningLaserCount={miningLaserCount}
                        setMiningLaserCount={setMiningLaserCount}
                        towingWeight={towingWeight}
                        setTowingWeight={setTowingWeight}
                    />
                    <Propellant
                        totalPropellant={totalPropellant}
                        setTotalPropellant={setTotalPropellant}
                        smallPropellantCount={smallPropellantCount}
                        setSmallPropellantCount={setSmallPropellantCount}
                        mediumPropellantCount={mediumPropellantCount}
                        setMediumPropellantCount={setMediumPropellantCount}
                        bigPropellantCount={bigPropellantCount}
                        setBigPropellantCount={setBigPropellantCount}
                    />
                </Col>
                <Col xl={3} md={6} xs={12}>
                    <Stats
                        autoCannons={autoCannons}
                        laserCannons={laserCannons}
                        plasmaCannons={plasmaCannons}
                        railGuns={railGuns}
                        generatorCards={generatorCards}
                        generatorDensity={generatorDensity}
                        batteryCount={batteryCount}
                        totalPowerGen={TotalPowerGen}
                        setTotalPowerGen={setTotalPowerGen}
                        weaponPassivePowerConsumption={weaponPassivePowerConsumption}
                        setWeaponPassivePowerConsumption={setWeaponPassivePowerConsumption}
                        weaponShootingPowerConsumption={weaponShootingPowerConsumption}
                        setWeaponShootingPowerConsumption={setWeaponShootingPowerConsumption}
                        weaponHeatGeneratedWhenShooting={weaponHeatGeneratedWhenShooting}
                        setWeaponHeatGeneratedWhenShooting={setWeaponHeatGeneratedWhenShooting}
                        collectorCount={collectorCount}
                        collectorPower={collectorPower}
                        miningLaserCount={miningLaserCount}
                        towingWeight={towingWeight}
                        towingPowerDeficit={towingPowerDeficit}
                        setTowingPowerDeficit={setTowingPowerDeficit}
                        miningEquipmentPowerDeficit={miningEquipmentPowerDeficit}
                        setMiningEquipmentPowerDeficit={setMiningEquipmentPowerDeficit}
                        calculatedSpeed={calculatedSpeed}
                        setCalculatedSpeed={setCalculatedSpeed}
                        overwriteSpeed={overwriteSpeed}
                        overwrittenSpeedValue={overwrittenSpeed}
                        thrusterCards={thrusterCards}
                        totalForwardThrust={totalForwardThrust}
                        setTotalForwardThrust={setTotalForwardThrust}
                        thrusterEfficiency={thrusterEfficiency}
                        overwriteFuelChamberCount={overwriteFuelChamberCount}
                        overwrittenFuelChamberCount={overwrittenFuelChamberCount}
                        overwritePropellantConsumption={overwritePropellantConsumption}
                        overwrittenPropellantConsumption={overwrittenPropellantConsumption}
                        cargoCount={cargoCount}
                        cargoWeight={cargoWeight}
                        totalPropellant={totalPropellant}
                        propellantConsumption={propellantConsumption}
                        setPropellantConsumption={setPropellantConsumption}
                        shipWeight={shipWeight}
                        totalHeatGen={totalHeatGen}
                        setTotalHeatGen={setTotalHeatGen}
                        totalHeatFuelChamber={totalHeatFuelChamber}
                        setTotalHeatFuelChamber={setTotalHeatFuelChamber}
                        thrusterElectricityConsumption={thrusterElectricityConsumption}
                        setThrusterElectricityConsumption={setThrusterElectricityConsumption}
                    />
                </Col>
            </Row>
        </Container>
    </div>
}

export default ShipCalc;
