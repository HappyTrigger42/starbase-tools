import {Card, Container} from "react-bootstrap";
import React from "react";
import {useTranslation} from "react-i18next";

import ModuleLine from "../misc/module_line";

function CapShipModules(
    {
        exoriumProcessingUnitCount,
        setExoriumProcessingUnitCount,
        exoriumFuelTankCount,
        setExoriumFuelTankCount,
        fastTravelCoreModuleCount,
        setFastTravelCoreModuleCount,
        fastTravelPropellantTankCount,
        setFastTravelPropellantTankCount,
        reconstructionMachineCount,
        setReconstructionMachineCount,
        shieldGeneratorCount,
        setShieldGeneratorCount,
        generatorModuleCount,
        setGeneratorModuleCount,
    }:{
        exoriumProcessingUnitCount: number,
        setExoriumProcessingUnitCount: React.Dispatch<React.SetStateAction<number>>;
        exoriumFuelTankCount: number,
        setExoriumFuelTankCount: React.Dispatch<React.SetStateAction<number>>;
        fastTravelCoreModuleCount: number,
        setFastTravelCoreModuleCount: React.Dispatch<React.SetStateAction<number>>;
        fastTravelPropellantTankCount: number,
        setFastTravelPropellantTankCount: React.Dispatch<React.SetStateAction<number>>;
        reconstructionMachineCount: number,
        setReconstructionMachineCount: React.Dispatch<React.SetStateAction<number>>;
        shieldGeneratorCount: number,
        setShieldGeneratorCount: React.Dispatch<React.SetStateAction<number>>;
        generatorModuleCount: number,
        setGeneratorModuleCount: React.Dispatch<React.SetStateAction<number>>;
    }) {

    const { t } = useTranslation('cap_ship_calc');


    return (
        <Card>
            <Card.Header>
                <h3>{t('modules')}</h3>
            </Card.Header>
            <Card.Body>
                <Container>
                    <ModuleLine
                        value={exoriumFuelTankCount}
                        value_name={"exoriumFuelTankCount"}
                        setter={setExoriumFuelTankCount}/>
                    <ModuleLine
                        value={exoriumProcessingUnitCount}
                        value_name={"exoriumProcessingUnitCount"}
                        setter={setExoriumProcessingUnitCount}/>
                    <ModuleLine
                        value={generatorModuleCount}
                        value_name={"generatorModuleCount"}
                        setter={setGeneratorModuleCount}/>
                    <ModuleLine
                        value={fastTravelCoreModuleCount}
                        value_name={"fastTravelCoreModuleCount"}
                        setter={setFastTravelCoreModuleCount}/>
                    <ModuleLine
                        value={fastTravelPropellantTankCount}
                        value_name={"fastTravelPropellantTankCount"}
                        setter={setFastTravelPropellantTankCount}/>
                    <ModuleLine
                        value={reconstructionMachineCount}
                        value_name={"reconstructionMachineCount"}
                        setter={setReconstructionMachineCount}/>
                    <ModuleLine
                        value={shieldGeneratorCount}
                        value_name={"shieldGeneratorCount"}
                        setter={setShieldGeneratorCount}/>
                </Container>
            </Card.Body>
        </Card>
    );
}

export default CapShipModules;

