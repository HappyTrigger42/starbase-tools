import "../../add-card.css"
import "./power.css"
import React from 'react';
import GeneratorCard from "../../cards/power_cards/power_card";
import {GeneratorChangeableFields, Generator, GeneratorTypes} from "../../cards/power_cards/power_types";
import {Button, Container, Row, Col, ButtonGroup, Card} from "react-bootstrap";
import {clamp} from "../../../../utilities/clamp";
import {useTranslation} from "react-i18next";

function Power (
    {
        cards,
        setCards,
        density,
        setDensity,
        batteryCount,
        setBatteryCount
    }: {
        cards: Generator[];
        setCards: React.Dispatch<React.SetStateAction<Generator[]>>;
        density: number;
        setDensity: React.Dispatch<React.SetStateAction<number>>;
        batteryCount: number;
        setBatteryCount: React.Dispatch<React.SetStateAction<number>>;
    }) {
    const { t } = useTranslation('ship_calc');

    const getDefaultGenerator = (type: GeneratorTypes): Generator => {
        switch (type) {
            case 'generator':
                return { type: 'generator', quantity: 1, tier: 1, enhancer: 0 };
            case 'big_generator':
                return { type: 'big_generator', quantity: 1 };
            default:
                throw new Error("Unknown generator type");
        }
    }

    const addCard = (type: GeneratorTypes) => {
        const newThruster = getDefaultGenerator(type);
        setCards([...cards, newThruster]);
    };

    const removeCard = (index: number) => {
        const newCards = [...cards];
        newCards.splice(index, 1);
        setCards(newCards);
    };

    const handleChange = (index: number, field: GeneratorChangeableFields, value: number) => {
        const updatedCards = [...cards];
        const generators = updatedCards[index];
        if (field === 'quantity') {
            updatedCards[index][field] = clamp(value, 0, 9999);
        }
        if (generators.type === 'generator') {
            if (field === 'tier') {
                generators.tier = clamp(value, 1, 3) as 1 | 2 | 3;
            } else if (field === 'enhancer') {
                generators.enhancer = clamp(value, 0, 3) as 0 | 1 | 2 | 3;
            }
        }
        setCards(updatedCards);
    };

    const handleBatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setBatteryCount(clamp(value, 0, 500));
    }

    return (
        <>
            <Card className="add-card-buttons">
                <Card.Header>
                    <h3>{t('generators.title')}</h3>
                </Card.Header>
                <Card.Body>
                    <Container>
                        <Row className={"card-attribute"}>
                            <Col xs={7}>
                                <div className={"card-attribute-text"}>
                                    {t('generators.battery_count')}
                                </div>
                            </Col>
                            <Col xs={5}>
                                <input className={"card-attribute-input"}
                                       type="number"
                                       value={batteryCount}
                                       onChange={e => handleBatChange(e)}
                                       placeholder="bat quantity" />
                            </Col>
                        </Row>
                        <Row>
                            <h4 className={"gen-density-selection-title"}>{t('generators.generator_density')} [?]</h4>
                        </Row>
                        <Row className={"gen-density-selection"}>
                            <ButtonGroup>
                                <Button
                                    variant={density === 2 ? "primary" : "secondary"}
                                    onClick={() => setDensity(2)}
                                    className={"gen-density-selection-button"}>
                                    {t('generators.very_low')}
                                </Button>
                                <Button
                                    variant={density === 3 ? "primary" : "secondary"}
                                    onClick={() => setDensity(3)}
                                    className={"gen-density-selection-button"}>
                                    {t('generators.low')}
                                </Button>
                                <Button
                                    variant={density === 4 ? "primary" : "secondary"}
                                    onClick={() => setDensity(4)}
                                    className={"gen-density-selection-button"}>
                                    {t('generators.normal')}
                                </Button>
                                <Button
                                    variant={density === 5 ? "primary" : "secondary"}
                                    onClick={() => setDensity(5)}
                                    className={"gen-density-selection-button"}>
                                    {t('generators.high')}
                                </Button>
                            </ButtonGroup>
                        </Row>
                        <Row>
                            <Col xs={7}>
                                {t('generators.add_generator')}
                            </Col>
                            <Col xs={5}>
                                <Button className={"add-card-button"} variant="secondary" onClick={() => addCard('generator')}>
                                    <i className="fa-solid fa-plus"></i>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={7}>
                                {t('generators.add_big_generator')}
                            </Col>
                            <Col xs={5}>
                                <Button className={"add-card-button"} variant="secondary" onClick={() => addCard('big_generator')}>
                                    <i className="fa-solid fa-plus"></i>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            {cards.map((card, index) => (
                <GeneratorCard
                    key={index}
                    index={index}
                    values={card}
                    onRemove={removeCard}
                    onChange={handleChange}
                />
            ))}
        </>
    );
};


export default Power;
