import {useTranslation} from "react-i18next";
import {Button, ButtonGroup, Card, Container, Row} from "react-bootstrap";
import ModuleLine from "../misc/module_line";
import React from "react";

function CapshipHalls(
    {
        capShipHallCornerCount,
        setCapShipHallCornerCount,
        capShipHallEdgeCount,
        setCapShipHallEdgeCount,
        capShipShipDesignerCornerCount,
        setCapShipShipDesignerCornerCount,
        capShipShipDesignerEdgeCount,
        setCapShipShipDesignerEdgeCount,
        capShipFactoryHallCornerCount,
        setCapShipFactoryHallCornerCount,
        capShipFactoryHallEdgeCount,
        setCapShipFactoryHallEdgeCount
    } : {
        capShipHallCornerCount: number,
        setCapShipHallCornerCount: React.Dispatch<React.SetStateAction<number>>;
        capShipHallEdgeCount: number,
        setCapShipHallEdgeCount: React.Dispatch<React.SetStateAction<number>>;
        capShipShipDesignerCornerCount: number,
        setCapShipShipDesignerCornerCount: React.Dispatch<React.SetStateAction<number>>;
        capShipShipDesignerEdgeCount: number,
        setCapShipShipDesignerEdgeCount: React.Dispatch<React.SetStateAction<number>>;
        capShipFactoryHallCornerCount: number,
        setCapShipFactoryHallCornerCount: React.Dispatch<React.SetStateAction<number>>;
        capShipFactoryHallEdgeCount: number,
        setCapShipFactoryHallEdgeCount: React.Dispatch<React.SetStateAction<number>>;
    }) {
    const dock_size = 47;

    const { t } = useTranslation('cap_ship_calc');

    const handleAddCapShipHall = () => {
        let corner_count = capShipHallCornerCount + 8;
        setCapShipHallCornerCount(corner_count);
        let edge_count = capShipHallEdgeCount + dock_size * 12;
        setCapShipHallEdgeCount(edge_count);
    }

    const handleAddShipDesigner = () => {
        let corner_count = capShipShipDesignerCornerCount + 8;
        setCapShipShipDesignerCornerCount(corner_count);
        let edge_count = capShipShipDesignerEdgeCount + dock_size * 12;
        setCapShipShipDesignerEdgeCount(edge_count);
    }

    const handleAddFactoryHall = () => {
        let corner_count = capShipFactoryHallCornerCount + 8;
        setCapShipFactoryHallCornerCount(corner_count);
        let edge_count = capShipFactoryHallEdgeCount + dock_size * 12;
        setCapShipFactoryHallEdgeCount(edge_count);
    }

    return (
        <Card>
            <Card.Header>
                <h3>{t('halls')}</h3>
            </Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        <ButtonGroup>
                            <Button variant="primary"
                                    onClick={handleAddCapShipHall}
                                    className={""}>
                                {t('add_capship_hall')}</Button>
                            <Button variant="primary"
                                    onClick={handleAddShipDesigner}
                                    className={""}>
                                {t('add_shipdesigner')}</Button>
                            <Button variant="primary"
                                    onClick={handleAddFactoryHall}
                                    className={""}>
                                {t('add_factory_hall')}</Button>
                        </ButtonGroup>
                    </Row>
                    <ModuleLine
                        value={capShipHallCornerCount}
                        value_name={"capShipHallCornerCount"}
                        setter={setCapShipHallCornerCount}/>
                    <ModuleLine
                        value={capShipHallEdgeCount}
                        value_name={"capShipHallEdgeCount"}
                        setter={setCapShipHallEdgeCount}/>
                    <ModuleLine
                        value={capShipShipDesignerCornerCount}
                        value_name={"capShipShipDesignerCornerCount"}
                        setter={setCapShipShipDesignerCornerCount}/>
                    <ModuleLine
                        value={capShipShipDesignerEdgeCount}
                        value_name={"capShipShipDesignerEdgeCount"}
                        setter={setCapShipShipDesignerEdgeCount}/>
                    <ModuleLine
                        value={capShipFactoryHallCornerCount}
                        value_name={"capShipFactoryHallCornerCount"}
                        setter={setCapShipFactoryHallCornerCount}/>
                    <ModuleLine
                        value={capShipFactoryHallEdgeCount}
                        value_name={"capShipFactoryHallEdgeCount"}
                        setter={setCapShipFactoryHallEdgeCount}/>
                </Container>
            </Card.Body>
        </Card>
    );
}

export default CapshipHalls;
