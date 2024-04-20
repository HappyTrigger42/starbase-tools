import React from 'react';
import {GeneratorChangeableFields, Generator} from './power_types'; // import the types
import '../../ship/card.css'
import "../../icons.css"
import {Form, Button, Card, Col, Container, Row, Image} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import BigGenerator from "../../../../assets/img/starbase/big_generator.png"
import EnhancerTier1 from "../../../../assets/img/starbase/Enhancer_tier_1.webp"
import EnhancerTier2 from "../../../../assets/img/starbase/Enhancer_tier_2.webp"
import EnhancerTier3 from "../../../../assets/img/starbase/Enhancer_tier_3.webp"
import GeneratorTier1 from "../../../../assets/img/starbase/Generator_unit_tier_1.webp"
import GeneratorTier2 from "../../../../assets/img/starbase/Generator_unit_tier_2.webp"
import GeneratorTier3 from "../../../../assets/img/starbase/Generator_unit_tier_3.webp"

interface GeneratorCardProps {
    index: number;
    values: Generator;
    onRemove: (index: number) => void;
    onChange: (index: number, field: GeneratorChangeableFields, value: number) => void;
}

const GeneratorCard: React.FC<GeneratorCardProps> = ({ index, values, onRemove, onChange }) => {
    const { t } = useTranslation('ship_calc');

    const handleInputChange = (field: GeneratorChangeableFields, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newValue = e.target.value;
        let parsedValue = parseInt(newValue, 10);
        if (isNaN(parsedValue)) {
            parsedValue = 0;
        }
        e.target.value = parsedValue.toString()
        onChange(index, field, parsedValue);
    };

    const renderFields = (generator: Generator) => {
        switch (generator.type) {
            case 'generator':
                return (
                    <Container className={"card-body-container"}>
                        <Row className={"card-attribute"}>
                            <Col xs={7}>
                                <div className={"card-attribute-text"}>{t('quantity')}</div>
                            </Col>
                            <Col xs={5}>
                                <input className={"card-attribute-input"} type="number" value={generator.quantity} onChange={e => handleInputChange('quantity', e)}/>
                            </Col>
                        </Row>
                        <Row className={"card-attribute"}>
                            <Col xs={7}>
                                <div className={"card-attribute-text"}>{t('tier')}</div>
                            </Col>
                            <Col xs={5}>
                                <Form.Select className={"card-attribute-input card-attribute-input-select"} value={generator.tier} onChange={e => handleInputChange('tier', e)}>
                                    <option value={1}>{t('tier_1')}</option>
                                    <option value={2}>{t('tier_2')}</option>
                                    <option value={3}>{t('tier_3')}</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className={"card-attribute"}>
                            <Col xs={7}>
                                <div className={"card-attribute-text"}>{t('generators.enhancer')}</div>
                            </Col>
                            <Col xs={5}>
                                <Form.Select className={"card-attribute-input card-attribute-input-select"} value={generator.enhancer} onChange={e => handleInputChange('enhancer', e)}>
                                    <option value={0}>{t('none')}</option>
                                    <option value={1}>{t('tier_1')}</option>
                                    <option value={2}>{t('tier_2')}</option>
                                    <option value={3}>{t('tier_3')}</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Container>
                );
            case 'big_generator':
                return (
                    <Container className={"card-body-container"}>
                        <Row className={"card-attribute"}>
                            <Col xs={7}>
                                <div className={"card-attribute-text"}>{t('quantity')}</div>
                            </Col>
                            <Col xs={5}>
                                <input className={"card-attribute-input"} type="number" value={generator.quantity} onChange={e => handleInputChange('quantity', e)}/>
                            </Col>
                        </Row>
                    </Container>
                );
            default:
                return null;
        }
    };

    const get_icons = (generator: Generator) => {
        switch (generator.type) {
            case 'generator':
                return <div>
                    {(generator.tier === 1) ? <Image src={GeneratorTier1} className={"calculator-icon"}/> : null }
                    {(generator.tier === 2) ? <Image src={GeneratorTier2} className={"calculator-icon"}/> : null }
                    {(generator.tier === 3) ? <Image src={GeneratorTier3} className={"calculator-icon"}/> : null }
                    {(generator.enhancer === 1) ? <Image src={EnhancerTier1} className={"calculator-icon"}/> : null }
                    {(generator.enhancer === 2) ? <Image src={EnhancerTier2} className={"calculator-icon"}/> : null }
                    {(generator.enhancer === 3) ? <Image src={EnhancerTier3} className={"calculator-icon"}/> : null }
                </div>
            case 'big_generator':
                return <div>
                    <Image src={BigGenerator} className={"calculator-icon"}/>
                </div>
            default:
                return null;
        }
    }

    return (
        <Card className="card">
            <Card.Header className={"card-title"}>
                <h5 className={"card-title-text"}>{t('generators.' + values.type)}</h5>
                {get_icons(values)}
                <div className={"card-close"}>
                    <Button className={"card-close-button"} variant="secondary" onClick={() => onRemove(index)}>
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

export default GeneratorCard;
