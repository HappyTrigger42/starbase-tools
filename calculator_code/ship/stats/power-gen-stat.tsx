import './stats.css'
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import {Generator} from "../../cards/power_cards/power_types";
import React, {ChangeEvent, useEffect, useState} from "react";
import {
    big_generator,
    get_electricity_from_tokens,
    get_enhancer_from_tier,
    get_generator_from_tier,
    get_heat_from_tokens,
    get_fuel_chamber_from_tier,
    get_estimated_fuel_chamber_count
} from "../../values/gen_constants";
import {prettyNumber} from "../../../../utilities/pretty_number";
import {useTranslation} from "react-i18next";


function PowerGenStats ({
                            generatorCards,
                            generatorDensity,
                            setTotalPowerGen,
                            overwriteFuelChamberCount,
                            overwrittenFuelChamberCount,
                            totalHeatGen,
                            setTotalHeatGen,
                            totalHeatFuelChamber,
                            setTotalHeatFuelChamber,
                        }: {
    generatorCards: Generator[]
    generatorDensity: number
    setTotalPowerGen: React.Dispatch<React.SetStateAction<number>>
    overwriteFuelChamberCount: number
    overwrittenFuelChamberCount: number
    totalHeatGen: number,
    setTotalHeatGen: React.Dispatch<React.SetStateAction<number>>,
    totalHeatFuelChamber: number,
    setTotalHeatFuelChamber: React.Dispatch<React.SetStateAction<number>>,
}) {

    const { t } = useTranslation('ship_calc');

    const [TotalGeneratorCount, setTotalGeneratorCount] = useState(0)
    const [TotalPowerGenStr, setTotalPowerGenStr] = useState("0")
    const [FuelChamberCount, setFuelChamberCount] = useState(0)
    const [TotalHeat, setTotalHeat] = useState("0")
    const [Display, setDisplay] = useState(true)

    useEffect(() => {
        let power_gen = 0
        let heat_gen = 0
        let heat_fuel_chamber = 0
        let fuel_chamber_count = 0
        let fuel_chamber_lowest_tier = 3
        setTotalGeneratorCount(0)
        let small_generator_count = 0
        generatorCards.forEach((card) => {
            if (card.type === "generator") {
                if (card.tier < fuel_chamber_lowest_tier) {
                    fuel_chamber_lowest_tier = card.tier
                }
                small_generator_count += card.quantity
                let generator = get_generator_from_tier(card.tier)
                let enhancer = get_enhancer_from_tier(card.enhancer)
                power_gen += (generator.power + get_electricity_from_tokens(enhancer.electricity_tokens)) * card.quantity
                heat_gen += (generator.heat + get_heat_from_tokens(enhancer.heat_tokens + generatorDensity)) * card.quantity
                let fuel_chamber = get_fuel_chamber_from_tier(card.tier)
                let fuel_chamber_quantity = get_estimated_fuel_chamber_count(card.quantity)
                fuel_chamber_count += fuel_chamber_quantity
                heat_fuel_chamber += (fuel_chamber.heat + get_heat_from_tokens(generatorDensity)) * fuel_chamber_quantity
            } else if (card.type === "big_generator") {
                heat_gen += big_generator.heat * card.quantity
                power_gen += big_generator.power * card.quantity
            } else {
                console.log(card)
                console.log("Unknown generator type, ignoring it")
            }
        })
        if (overwriteFuelChamberCount) {
            heat_fuel_chamber = (get_fuel_chamber_from_tier(fuel_chamber_lowest_tier).heat + get_heat_from_tokens(generatorDensity)) * overwrittenFuelChamberCount
        }
        if (TotalGeneratorCount === 0) {
            heat_fuel_chamber = 0
        }
        setTotalPowerGen(power_gen)
        setTotalPowerGenStr(prettyNumber(power_gen))
        setTotalHeatGen(heat_gen)
        setTotalHeatFuelChamber(heat_fuel_chamber)
        setFuelChamberCount(fuel_chamber_count)
        setTotalHeat(prettyNumber(heat_gen + heat_fuel_chamber))
        setTotalGeneratorCount(small_generator_count)
    } , [TotalGeneratorCount, generatorCards, generatorDensity, overwriteFuelChamberCount, overwrittenFuelChamberCount, setTotalHeatFuelChamber, setTotalHeatGen, setTotalPowerGen])

    const handleDisplay = (e: ChangeEvent<HTMLInputElement>) => {
        setDisplay(e.target.checked)
    }

    return <Card className={"stats-card"}>
        <Card.Header className={"stats-card-header"}>
            <h4 className={"stats-sub-title"}>{t('power_generation.title')}</h4>
            <Form className={"stats-toggle"}>
                <Form.Check
                    type="switch"
                    checked={Display}
                    onChange={handleDisplay}
                />
            </Form>
        </Card.Header>
        <Card.Body>
            {
                (Display) ?
                    <Container className={"stats-container"}>
                        <Row>
                            <Col className={"stats-text"} xs={8}>
                                {t('power_generation.heat_tokens')}
                            </Col>
                            <Col className={"stats-text-numbers"} xs={4}>
                                {generatorDensity}
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"stats-text"} xs={8}>
                                {t('power_generation.total_power_generation')}
                            </Col>
                            <Col className={"stats-text-numbers"} xs={4}>
                                {TotalPowerGenStr} {t('elec_per_second')}
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"stats-text"} xs={8}>
                                {t('power_generation.generator_heat')}
                            </Col>
                            <Col className={"stats-text-numbers"} xs={4}>
                                {prettyNumber(totalHeatGen)} {t('heat_per_second')}
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"stats-text"} xs={8}>
                                {t('power_generation.small_generator_count')}
                            </Col>
                            <Col className={"stats-text-numbers"} xs={4}>
                                {TotalGeneratorCount}
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"stats-text"} xs={8}>
                                {overwriteFuelChamberCount ? t('power_generation.fuel_chamber_count') : t('power_generation.presumed_fuel_chamber_count')}
                            </Col>
                            <Col className={"stats-text-numbers"} xs={4}>
                                {prettyNumber(overwriteFuelChamberCount ? overwrittenFuelChamberCount : FuelChamberCount)}
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"stats-text"} xs={8}>
                                {t('power_generation.presumed_fuel_chamber_heat')}
                            </Col>
                            <Col className={"stats-text-numbers"} xs={4}>
                                {prettyNumber(totalHeatFuelChamber)} {t('heat_per_second')}
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"stats-text"} xs={8}>
                                {t('power_generation.total_heat')}
                            </Col>
                            <Col className={"stats-text-numbers"} xs={4}>
                                {TotalHeat} {t('heat_per_second')}
                            </Col>
                        </Row>
                        {
                            (TotalGeneratorCount / 3 > (overwriteFuelChamberCount ? overwrittenFuelChamberCount : FuelChamberCount)) ? (
                                <Row className={"stats-warning"}>
                                    {t('power_generation.too_many_gens')}
                                </Row>
                            ) : null
                        }
                    </Container> : null
            }
        </Card.Body>
    </Card>
}

export default PowerGenStats;
