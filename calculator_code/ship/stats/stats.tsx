import './stats.css'
import FlightStat from "./flight-stat";
import ToolsStat from "./tools-stat";
import ThrustersStat from "./thrusters_stats";
import PowerGenStats from "./power-gen-stat";
import WeaponsStat from "./weapon_stats";
import React from "react";
import {Generator} from "../../cards/power_cards/power_types";
import BatStats from "./bat-stats";
import {Thruster} from "../../cards/thrusters_cards/thruster_types";
import HeatManagement from "./heat-management";


function Stats (
    {
        autoCannons,
        laserCannons,
        plasmaCannons,
        railGuns,
        generatorCards,
        generatorDensity,
        batteryCount,
        totalPowerGen,
        setTotalPowerGen,
        weaponPassivePowerConsumption,
        setWeaponPassivePowerConsumption,
        weaponShootingPowerConsumption,
        setWeaponShootingPowerConsumption,
        weaponHeatGeneratedWhenShooting,
        setWeaponHeatGeneratedWhenShooting,
        collectorCount,
        collectorPower,
        miningLaserCount,
        towingWeight,
        towingPowerDeficit,
        setTowingPowerDeficit,
        miningEquipmentPowerDeficit,
        setMiningEquipmentPowerDeficit,
        calculatedSpeed,
        setCalculatedSpeed,
        overwriteSpeed,
        overwrittenSpeedValue,
        thrusterCards,
        totalForwardThrust,
        setTotalForwardThrust,
        thrusterEfficiency,
        overwriteFuelChamberCount,
        overwrittenFuelChamberCount,
        overwritePropellantConsumption,
        overwrittenPropellantConsumption,
        cargoCount,
        cargoWeight,
        totalPropellant,
        propellantConsumption,
        setPropellantConsumption,
        shipWeight,
        totalHeatGen,
        setTotalHeatGen,
        totalHeatFuelChamber,
        setTotalHeatFuelChamber,
        thrusterElectricityConsumption,
        setThrusterElectricityConsumption,
    }: {
        autoCannons: number;
        laserCannons: number;
        plasmaCannons: number;
        railGuns: number;
        generatorCards: Generator[],
        generatorDensity: number,
        batteryCount: number,
        totalPowerGen: number,
        setTotalPowerGen: React.Dispatch<React.SetStateAction<number>>,
        weaponPassivePowerConsumption: number,
        setWeaponPassivePowerConsumption: React.Dispatch<React.SetStateAction<number>>,
        weaponShootingPowerConsumption: number,
        setWeaponShootingPowerConsumption: React.Dispatch<React.SetStateAction<number>>,
        weaponHeatGeneratedWhenShooting: number,
        setWeaponHeatGeneratedWhenShooting: React.Dispatch<React.SetStateAction<number>>,
        collectorCount: number,
        collectorPower: number,
        miningLaserCount: number,
        towingWeight: number,
        towingPowerDeficit: number,
        setTowingPowerDeficit: React.Dispatch<React.SetStateAction<number>>,
        miningEquipmentPowerDeficit: number,
        setMiningEquipmentPowerDeficit: React.Dispatch<React.SetStateAction<number>>,
        calculatedSpeed: number,
        setCalculatedSpeed: React.Dispatch<React.SetStateAction<number>>,
        overwriteSpeed: number,
        overwrittenSpeedValue: number,
        thrusterCards: Thruster[],
        totalForwardThrust: number,
        setTotalForwardThrust: React.Dispatch<React.SetStateAction<number>>,
        thrusterEfficiency: number,
        overwriteFuelChamberCount: number,
        overwrittenFuelChamberCount: number,
        overwritePropellantConsumption: number,
        overwrittenPropellantConsumption: number,
        cargoCount: number,
        cargoWeight: number,
        totalPropellant: number,
        propellantConsumption: number,
        setPropellantConsumption: React.Dispatch<React.SetStateAction<number>>,
        shipWeight: number,
        totalHeatGen: number,
        setTotalHeatGen: React.Dispatch<React.SetStateAction<number>>,
        totalHeatFuelChamber: number,
        setTotalHeatFuelChamber: React.Dispatch<React.SetStateAction<number>>,
        thrusterElectricityConsumption: number,
        setThrusterElectricityConsumption: React.Dispatch<React.SetStateAction<number>>,
    }) {

    return <div>
        <PowerGenStats
            generatorCards={generatorCards}
            generatorDensity={generatorDensity}
            setTotalPowerGen={setTotalPowerGen}
            overwriteFuelChamberCount={overwriteFuelChamberCount}
            overwrittenFuelChamberCount={overwrittenFuelChamberCount}
            totalHeatGen={totalHeatGen}
            setTotalHeatGen={setTotalHeatGen}
            totalHeatFuelChamber={totalHeatFuelChamber}
            setTotalHeatFuelChamber={setTotalHeatFuelChamber}
        />
        <FlightStat
            calculatedSpeed={calculatedSpeed}
            setCalculatedSpeed={setCalculatedSpeed}
            overwriteSpeed={overwriteSpeed}
            overwrittenSpeedValue={overwrittenSpeedValue}
            cargoCount={cargoCount}
            cargoWeight={cargoWeight}
            totalPropellant={totalPropellant}
            propellantConsumption={propellantConsumption}
            overwritePropellantConsumption={overwritePropellantConsumption}
            overwrittenPropellantConsumption={overwrittenPropellantConsumption}
            totalForwardThrust={totalForwardThrust}
            shipWeight={shipWeight}
            thrusterCards={thrusterCards}
        />
        <HeatManagement
            totalHeatGen={totalHeatGen}
            totalHeatFuelChamber={totalHeatFuelChamber}
            weaponHeatGeneratedWhenShooting={weaponHeatGeneratedWhenShooting}
        />
        <BatStats
            batteryCount={batteryCount}
            weaponPassivePowerConsumption={weaponPassivePowerConsumption}
            weaponShootingPowerConsumption={weaponShootingPowerConsumption}
            totalPowerGen={totalPowerGen}
            towingPowerDeficit={towingPowerDeficit}
            miningEquipmentPowerDeficit={miningEquipmentPowerDeficit}
            collectorCount={collectorCount}
            miningLaserCount={miningLaserCount}
            towingWeight={towingWeight}
            thrusterElectricityConsumption={thrusterElectricityConsumption}
            thrusterCards={thrusterCards}
        />
        <ThrustersStat
            thrusterCards={thrusterCards}
            totalForwardThrust={totalForwardThrust}
            setTotalForwardThrust={setTotalForwardThrust}
            thrusterEfficiency={thrusterEfficiency}
            overwritePropellantConsumption={overwritePropellantConsumption}
            overwrittenPropellantConsumption={overwrittenPropellantConsumption}
            propellantConsumption={propellantConsumption}
            setPropellantConsumption={setPropellantConsumption}
            thrusterElectricityConsumption={thrusterElectricityConsumption}
            setThrusterElectricityConsumption={setThrusterElectricityConsumption}
        />
        <WeaponsStat
            autoCannons={autoCannons}
            laserCannons={laserCannons}
            plasmaCannons={plasmaCannons}
            railGuns={railGuns}
            weaponPassivePowerConsumption={weaponPassivePowerConsumption}
            setWeaponPassivePowerConsumption={setWeaponPassivePowerConsumption}
            weaponShootingPowerConsumption={weaponShootingPowerConsumption}
            setWeaponShootingPowerConsumption={setWeaponShootingPowerConsumption}
            weaponHeatGeneratedWhenShooting={weaponHeatGeneratedWhenShooting}
            setWeaponHeatGeneratedWhenShooting={setWeaponHeatGeneratedWhenShooting}
            miningLaserCount={miningLaserCount}
        />
        <ToolsStat
            towingWeight={towingWeight}
            collectorCount={collectorCount}
            collectorPower={collectorPower}
            miningLaserCount={miningLaserCount}
            totalPowerGen={totalPowerGen}
            towingPowerDeficit={towingPowerDeficit}
            setTowingPowerDeficit={setTowingPowerDeficit}
            miningEquipmentPowerDeficit={miningEquipmentPowerDeficit}
            setMiningEquipmentPowerDeficit={setMiningEquipmentPowerDeficit}
        />
    </div>
}

export default Stats;
