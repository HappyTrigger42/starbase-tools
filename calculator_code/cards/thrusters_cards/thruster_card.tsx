import React from 'react';
import {ThrusterChangeableFields, Thruster} from './thruster_types';
import '../../ship/card.css'
import '../../icons.css'
import './thruster_card.css'
import {Form, Button, Card, Col, Container, Row, ButtonGroup, Image} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import TriangleBaseTier1 from "../../../../assets/img/starbase/Triangle_thruster_body_tier_1.webp"
import TriangleBaseTier2 from "../../../../assets/img/starbase/Triangle_thruster_body_tier_2.webp"
import TriangleBaseTier3 from "../../../../assets/img/starbase/Triangle_thruster_body_tier_3.webp"
import TriangleNozzleTier1 from "../../../../assets/img/starbase/Triangle_thruster_nozzle_tier_1.webp"
import TriangleNozzleTier2 from "../../../../assets/img/starbase/Triangle_thruster_nozzle_tier_2.webp"
import TriangleNozzleTier3 from "../../../../assets/img/starbase/Triangle_thruster_nozzle_tier_3.webp"
import BoxBaseTier1 from "../../../../assets/img/starbase/Box_thruster_body_tier_1.webp"
import BoxBaseTier2 from "../../../../assets/img/starbase/Box_thruster_body_tier_2.webp"
import BoxBaseTier3 from "../../../../assets/img/starbase/Box_thruster_body_tier_3.webp"
import BoxNozzleTier1 from "../../../../assets/img/starbase/Box_thruster_nozzle_tier_1.webp"
import BoxNozzleTier2 from "../../../../assets/img/starbase/Box_thruster_nozzle_tier_2.webp"
import BoxNozzleTier3 from "../../../../assets/img/starbase/Box_thruster_nozzle_tier_3.webp"
import ManeuverTier1 from "../../../../assets/img/starbase/Maneuver_thruster_tier_1.webp"
import ManeuverTier2 from "../../../../assets/img/starbase/Maneuver_thruster_tier_2.webp"
import ManeuverTier3 from "../../../../assets/img/starbase/Maneuver_thruster_tier_3.webp"
import ElectricityConverterTier1 from "../../../../assets/img/starbase/Thruster_electricity_converter_tier_1.webp"
import ElectricityConverterTier2 from "../../../../assets/img/starbase/Thruster_electricity_converter_tier_2.webp"
import ElectricityConverterTier3 from "../../../../assets/img/starbase/Thruster_electricity_converter_tier_3.webp"
import PropellantConverterTier1 from "../../../../assets/img/starbase/Thruster_gas_converter_tier_1.webp"
import PropellantConverterTier2 from "../../../../assets/img/starbase/Thruster_gas_converter_tier_2.webp"
import PropellantConverterTier3 from "../../../../assets/img/starbase/Thruster_gas_converter_tier_3.webp"
import Plasma from "../../../../assets/img/starbase/Starbase_plasma_thruster.webp"

interface ThrusterCardProps {
    index: number;
    values: Thruster;
    max_thruster_quantity: number,
    thrusterCards: Thruster[];
    setThrusterCards: React.Dispatch<React.SetStateAction<Thruster[]>>;
    onRemove: (index: number,
               thrusterCards: Thruster[],
               setThrusterCards: React.Dispatch<React.SetStateAction<Thruster[]>>) => void;
    onChange: (index: number,
               field: ThrusterChangeableFields,
               value: number,
               thrusterCards: Thruster[],
               setThrusterCards: React.Dispatch<React.SetStateAction<Thruster[]>>,
               max_thruster_quantity: number) => void;
    hide_maneuver: boolean;
    hide_quantity: boolean;
    hide_plasma_rings: boolean;
    display_plasma_tip: boolean;
    display_hardpoint_string: boolean;
}

const ThrusterCard: React.FC<ThrusterCardProps> = ({ index,
                                                       values,
                                                       max_thruster_quantity,
                                                       onRemove,
                                                       onChange,
                                                       thrusterCards,
                                                       setThrusterCards,
                                                       hide_maneuver ,
                                                       hide_quantity,
                                                       hide_plasma_rings,
                                                       display_plasma_tip,
                                                       display_hardpoint_string}) => {
    const { t } = useTranslation('ship_calc');

    const handleInputChange = (field: ThrusterChangeableFields, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newValue = e.target.value;
        let parsedValue = parseInt(newValue, 10);
        if (isNaN(parsedValue)) {
            parsedValue = 0;
        }
        e.target.value = parsedValue.toString()
        onChange(index, field, parsedValue, thrusterCards, setThrusterCards, max_thruster_quantity);
    };

    const setManeuver = (thruster: Thruster, value: boolean) => {
        thruster.used_as_maneuver = value;
        const out = (value ? 1 : 0)
        onChange(index, 'used_as_maneuver', out, thrusterCards, setThrusterCards, max_thruster_quantity);
    }

    function getIsManeuverButtons(thruster: Thruster) {
        return <Row className={"card-attribute"}>
            <Col xs={7}>
                <div className={"card-attribute-text"}>{t('thruster.is_for_maneuvering')} [?]</div>
            </Col>
            <Col xs={5}>
                <ButtonGroup className={"thruster-density-selection"}>
                    <Button
                        variant={thruster.used_as_maneuver ? "primary" : "secondary"}
                        onClick={() => setManeuver(thruster, true)}
                        className={"thruster-density-selection-button"}>
                        {t('yes')}
                    </Button>
                    <Button
                        variant={!thruster.used_as_maneuver ? "primary" : "secondary"}
                        onClick={() => setManeuver(thruster, false)}
                        className={"thruster-density-selection-button"}>
                        {t('no')}
                    </Button>
                </ButtonGroup>
            </Col>
        </Row>
    }

    function get_quantity_input(thruster: Thruster) {
        return <Row className={"card-attribute"}>
            <Col xs={7}>
                <div className={"card-attribute-text"}>{t('quantity')}</div>
            </Col>
            <Col xs={5}>
                <input className={"card-attribute-input"}
                       type="number"
                       value={thruster.quantity}
                       onChange={e => handleInputChange('quantity', e)} />
            </Col>
        </Row>
    }

    const renderFields = (thruster: Thruster) => {
        switch (thruster.type) {
            case 'plasma':
                return (
                    <Container className={"card-body-container"}>
                        {!hide_maneuver ? getIsManeuverButtons(thruster) : null}
                        {!hide_quantity ? get_quantity_input(thruster) : null}
                        {!hide_plasma_rings ?
                            <Row className={"card-attribute"}>
                                <Col xs={7}>
                                    <div className={"card-attribute-text"}>{t('thruster.rings')}</div>
                                </Col>
                                <Col xs={5}>
                                    <input className={"card-attribute-input"}
                                           type="number" value={thruster.rings}
                                           onChange={e => handleInputChange('rings', e)} placeholder="Rings" />
                                </Col>
                            </Row> : null
                        }
                        {
                            (display_plasma_tip || display_hardpoint_string) ?
                                <ul className={"thruster-card-list-display"}>
                                    {display_plasma_tip ? <li>{t('thruster.plasma_tip')}</li> : null}
                                    {display_hardpoint_string ? <li>{t('thruster.plasma_hardpoint')}</li> : null}
                                </ul> : null
                        }
                    </Container>
                );
            case 'maneuver':
                return (
                    <Container className={"card-body-container"}>
                        {!hide_maneuver ? getIsManeuverButtons(thruster) : null}
                        {!hide_quantity ? get_quantity_input(thruster) : null}
                        <Row className={"card-attribute"}>
                            <Col xs={7}>
                                <div className={"card-attribute-text"}>{t('tier')}</div>
                            </Col>
                            <Col xs={5}>
                                <Form.Select className={"card-attribute-input card-attribute-input-select"}
                                             value={thruster.tier}
                                             onChange={e => handleInputChange('tier', e)}>
                                    <option value={1}>{t('tier_1')}</option>
                                    <option value={2}>{t('tier_2')}</option>
                                    <option value={3}>{t('tier_3')}</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        {display_hardpoint_string ? <ul className={"thruster-card-list-display"}><li>{t('thruster.thruster_hardpoint')}</li></ul> : null}
                    </Container>
                );
            case 'box':
            case 'triangle':
                return (
                    <Container className={"card-body-container"}>
                        {!hide_maneuver ? getIsManeuverButtons(thruster) : null}
                        {!hide_quantity ? get_quantity_input(thruster) : null}
                        <Row className={"card-attribute"}>
                            <Col xs={7}>
                                <div className={"card-attribute-text"}>{t('tier')}</div>
                            </Col>
                            <Col xs={5}>
                                <Form.Select className={"card-attribute-input card-attribute-input-select"}
                                             value={thruster.tier}
                                             onChange={e => handleInputChange('tier', e)}>
                                    <option value={1}>{t('tier_1')}</option>
                                    <option value={2}>{t('tier_2')}</option>
                                    <option value={3}>{t('tier_3')}</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className={"card-attribute"}>
                            <Col xs={7}>
                                <div className={"card-attribute-text"}>{t('thruster.nozzle')}</div>
                            </Col>
                            <Col xs={5}>
                                <Form.Select className={"card-attribute-input card-attribute-input-select"}
                                             value={thruster.nozzle}
                                             onChange={e => handleInputChange('nozzle', e)}>
                                    <option value={0}>{t('none')}</option>
                                    <option value={1}>{t('tier_1')}</option>
                                    <option value={2}>{t('tier_2')}</option>
                                    <option value={3}>{t('tier_3')}</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className={"card-attribute"}>
                            <Col xs={7}>
                                <div className={"card-attribute-text"}>{t('thruster.electricity_converter')}</div>
                            </Col>
                            <Col xs={5}>
                                <Form.Select className={"card-attribute-input card-attribute-input-select"}
                                             value={thruster.electricity_converter}
                                             onChange={e => handleInputChange('electricity_converter', e)}>
                                    <option value={0}>{t('none')}</option>
                                    <option value={1}>{t('tier_1')}</option>
                                    <option value={2}>{t('tier_2')}</option>
                                    <option value={3}>{t('tier_3')}</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className={"card-attribute"}>
                            <Col xs={7}>
                                <div className={"card-attribute-text"}>{t('thruster.propellant_converter')}</div>
                            </Col>
                            <Col xs={5}>
                                <Form.Select className={"card-attribute-input card-attribute-input-select"}
                                             value={thruster.propellant_converter}
                                             onChange={e => handleInputChange('propellant_converter', e)}>
                                    <option value={0}>{t('none')}</option>
                                    <option value={1}>{t('tier_1')}</option>
                                    <option value={2}>{t('tier_2')}</option>
                                    <option value={3}>{t('tier_3')}</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        {display_hardpoint_string ?
                            (thruster.type === "triangle") ?
                                <ul className={"thruster-card-list-display"}><li>{t('thruster.triangle_hardpoint')}</li></ul> :
                                <ul className={"thruster-card-list-display"}><li>{t('thruster.thruster_hardpoint')}</li></ul>
                            : null}
                    </Container>
                );
            default:
                return null;
        }
    };

    const get_box_and_triangle_icons = (thruster: Thruster) => {
        switch (thruster.type) {
            case 'box':
            case 'triangle':
            return<>
                {(thruster.electricity_converter === 1) ? <Image src={ElectricityConverterTier1} className={"calculator-icon"}/> : null }
                {(thruster.electricity_converter === 2) ? <Image src={ElectricityConverterTier2} className={"calculator-icon"}/> : null }
                {(thruster.electricity_converter === 3) ? <Image src={ElectricityConverterTier3} className={"calculator-icon"}/> : null }
                {(thruster.propellant_converter === 1) ? <Image src={PropellantConverterTier1} className={"calculator-icon"}/> : null }
                {(thruster.propellant_converter === 2) ? <Image src={PropellantConverterTier2} className={"calculator-icon"}/> : null }
                {(thruster.propellant_converter === 3) ? <Image src={PropellantConverterTier3} className={"calculator-icon"}/> : null }
            </>
            default:
                return <></>
        }
    }

    const get_icons = (thruster: Thruster) => {
        switch (thruster.type) {
            case 'plasma':
                return <div>
                    <Image src={Plasma} className={"calculator-icon"}/>
                </div>
            case 'box':
                return <div>
                    {(thruster.tier === 1) ? <Image src={BoxBaseTier1} className={"calculator-icon"}/> : null }
                    {(thruster.tier === 2) ? <Image src={BoxBaseTier2} className={"calculator-icon"}/> : null }
                    {(thruster.tier === 3) ? <Image src={BoxBaseTier3} className={"calculator-icon"}/> : null }
                    {(thruster.nozzle === 1) ? <Image src={BoxNozzleTier1} className={"calculator-icon"}/> : null }
                    {(thruster.nozzle === 2) ? <Image src={BoxNozzleTier2} className={"calculator-icon"}/> : null }
                    {(thruster.nozzle === 3) ? <Image src={BoxNozzleTier3} className={"calculator-icon"}/> : null }
                    {get_box_and_triangle_icons(thruster)}
                </div>
            case 'triangle':
                return <div>
                    {(thruster.tier === 1) ? <Image src={TriangleBaseTier1} className={"calculator-icon"}/> : null }
                    {(thruster.tier === 2) ? <Image src={TriangleBaseTier2} className={"calculator-icon"}/> : null }
                    {(thruster.tier === 3) ? <Image src={TriangleBaseTier3} className={"calculator-icon"}/> : null }
                    {(thruster.nozzle === 1) ? <Image src={TriangleNozzleTier1} className={"calculator-icon"}/> : null }
                    {(thruster.nozzle === 2) ? <Image src={TriangleNozzleTier2} className={"calculator-icon"}/> : null }
                    {(thruster.nozzle === 3) ? <Image src={TriangleNozzleTier3} className={"calculator-icon"}/> : null }
                    {get_box_and_triangle_icons(thruster)}
                </div>
            case 'maneuver':
                return <div>
                    {(thruster.tier === 1) ? <Image src={ManeuverTier1} className={"calculator-icon"}/> : null }
                    {(thruster.tier === 2) ? <Image src={ManeuverTier2} className={"calculator-icon"}/> : null }
                    {(thruster.tier === 3) ? <Image src={ManeuverTier3} className={"calculator-icon"}/> : null }
                </div>
            default:
                return <></>
        }
    }

    return (
        <Card className="card">
            <Card.Header className={"card-title"}>
                <h5 className={"card-title-text"}>{t('thruster.' + values.type)}</h5>
                {get_icons(values)}
                <div className={"card-close"}>
                    <Button className={"card-close-button"} variant="secondary" onClick={() => onRemove(index, thrusterCards, setThrusterCards)}>
                        <i className="fa-solid fa-xmark"></i>
                    </Button>
                </div>
            </Card.Header>
            <Card.Body>
                {renderFields(values)}
            </Card.Body>
        </Card>
    );
};

export default ThrusterCard;
