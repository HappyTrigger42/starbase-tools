import {useTranslation} from "react-i18next";
import {Card, Container} from "react-bootstrap";
import ModuleLine from "../misc/module_line";
import React from "react";

function CapshipStructure(
    {
        cubeCount,
        setCubeCount,
        cubeWallV1Count,
        setCubeWallV1Count,
        longFrameCount,
        setLongFrameCount,
        mediumFrameCount,
        setMediumFrameCount
    } : {
        cubeCount: number,
        setCubeCount: React.Dispatch<React.SetStateAction<number>>;
        cubeWallV1Count: number,
        setCubeWallV1Count: React.Dispatch<React.SetStateAction<number>>;
        longFrameCount: number,
        setLongFrameCount: React.Dispatch<React.SetStateAction<number>>;
        mediumFrameCount: number,
        setMediumFrameCount: React.Dispatch<React.SetStateAction<number>>;
    }) {
    const { t } = useTranslation('cap_ship_calc');


    return (
        <Card>
            <Card.Header>
                <h3>{t('structure')}</h3>
            </Card.Header>
            <Card.Body>
                <Container>
                    <ModuleLine
                        value={cubeCount}
                        value_name={"cubeCount"}
                        setter={setCubeCount}/>
                    <ModuleLine
                        value={cubeWallV1Count}
                        value_name={"wallCount"}
                        setter={setCubeWallV1Count}/>
                    <ModuleLine
                        value={longFrameCount}
                        value_name={"longFrameCount"}
                        setter={setLongFrameCount}/>
                    <ModuleLine
                        value={mediumFrameCount}
                        value_name={"mediumFrameCount"}
                        setter={setMediumFrameCount}/>
                </Container>
            </Card.Body>
        </Card>
    );
}

export default CapshipStructure;
