import {useTranslation} from "react-i18next";
import {Button, ButtonGroup, Card, Col, Container, Row} from "react-bootstrap";
import React from "react";
import {clamp} from "../../../../utilities/clamp";
import {chart_max_height, chart_min_height} from "../const_values";


function ChartOptions(
    {
        chartHeight,
        setChartHeight,
        useSteplines,
        setUseSteplines,
        compactCharts,
        setCompactCharts
    }:{
        chartHeight: number,
        setChartHeight: React.Dispatch<React.SetStateAction<number>>
        useSteplines: boolean
        setUseSteplines: React.Dispatch<React.SetStateAction<boolean>>
        compactCharts: boolean
        setCompactCharts: React.Dispatch<React.SetStateAction<boolean>>
    }) {
    const { t } = useTranslation('thruster_optimisation');

    const handleChartHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setChartHeight(clamp(value, chart_min_height, chart_max_height))
    }

    function on_off(title: string, value: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>) {
        return <Row className={"card-attribute"}>
            <Col xs={8}>
                <div className={"card-attribute-text"}>{t(title)}</div>
            </Col>
            <Col xs={4}>
                <ButtonGroup className={"thruster-density-selection"}>
                    <Button
                        variant={value ? "primary" : "secondary"}
                        onClick={() => setter(true)}
                        className={"thruster-density-selection-button"}>
                        {t('yes')}
                    </Button>
                    <Button
                        variant={!value ? "primary" : "secondary"}
                        onClick={() => setter(false)}
                        className={"thruster-density-selection-button"}>
                        {t('no')}
                    </Button>
                </ButtonGroup>
            </Col>
        </Row>
    }

    function num_input(title: string, value: number, handler: (e: React.ChangeEvent<HTMLInputElement>) => void) {
        return <Row className={"card-attribute"}>
            <Col xs={8}>
                <div className={"card-attribute-text"}>{t(title)}</div>
            </Col>
            <Col xs={4}>
                <input className={"card-attribute-input"} type="number" value={value} onChange={e => handler(e)} />
            </Col>
        </Row>
    }

    return <Card>
        <Card.Header>
            <h3>{t("chart_options.title")}</h3>
        </Card.Header>
        <Card.Body>
            <Container>
                {num_input("chart_options.chart_height", chartHeight, handleChartHeightChange)}
                {on_off("chart_options.use_steplines", useSteplines, setUseSteplines)}
                {on_off("chart_options.compact_charts", compactCharts, setCompactCharts)}
            </Container>
        </Card.Body>
    </Card>
}

export default ChartOptions
