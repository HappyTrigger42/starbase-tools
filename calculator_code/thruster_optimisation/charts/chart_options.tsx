import {useTranslation} from "react-i18next";
import {Card, Container} from "react-bootstrap";
import React from "react";
import {clamp} from "../../../../utilities/clamp";
import {chart_max_height, chart_min_height} from "../const_values";
import {num_input} from "../../../../utilities/num_input";
import {on_off} from "../../../../utilities/on_off";


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

    return <Card>
        <Card.Header>
            <h3>{t("chart_options.title")}</h3>
        </Card.Header>
        <Card.Body>
            <Container>
                {num_input(t("chart_options.chart_height"), chartHeight, handleChartHeightChange)}
                {on_off(t("chart_options.use_steplines"), t('yes'), t('no'), useSteplines, setUseSteplines, "thruster")}
                {on_off(t("chart_options.compact_charts"), t('yes'), t('no'), compactCharts, setCompactCharts, "thruster")}
            </Container>
        </Card.Body>
    </Card>
}

export default ChartOptions
