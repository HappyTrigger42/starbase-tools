import "../calc.css"
import "./thruster-optimisation.css"
import Thrusters from "./thrusters/thrusters";
import {Button, ButtonGroup, ButtonToolbar, Col, Container, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {build_count, thruster_optimisation_url} from "../../global_values";
import {useLocalStorage} from "../../../utilities/local_storage";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import Chart from "./charts/line_charts/chart";
import ChartOptions from "./charts/chart_options";
import {chart_height_default, compact_chart_value, non_compact_chart_value} from "./const_values";
import {Chart_data_interface} from "./charts/line_charts/chart_data_interface";
import chart_calculator from "./charts/line_charts/chart_calculator";
import RatioChart from "./charts/ratio_charts/ratio_chart";
import BarChart from "./charts/bar_charts/bar_chart";
import {get_chart_raw_thruster_values} from "./charts/chart_raw_thruster_values";
import {chart_raw_thruster_values} from "./charts/chart_raw_thruster_values_interface";

function ThrusterOptimisation() {
    // values to be exported and imported in the url and local storage
    const [thrusterCards, setThrusterCards] = useLocalStorage('thrusterCards_thruster_optimisation', []);
    const [chartHeight, setChartHeight] = useLocalStorage('chartHeight', chart_height_default);
    const [useSteplines, setUseSteplines] = useLocalStorage('useSteplines', true);
    const [compactCharts, setCompactCharts] = useLocalStorage('compactCharts', true);

    // values that are calculated and that should not be stored
    const [thrusters_voxel_volume, setThrusters_voxel_volume] = useState<Chart_data_interface[]>([])
    const [thrusters_mass, setThrusters_mass] = useState<Chart_data_interface[]>([])
    const [thrusters_elec_usage, setThrusters_elec_usage] = useState<Chart_data_interface[]>([])
    const [thrusters_prop_usage, setThrusters_prop_usage] = useState<Chart_data_interface[]>([])
    const [thruster_chart_raw_values, setThruster_chart_raw_values] = useState<chart_raw_thruster_values[]>([])

    // const parameter values
    const data_string_key = "data"

    // notification message for the clipboard
    const [notificationMessage, setNotificationMessage] = useState('');
    const [timerKey, setTimerKey] = useState(0);

    const { t } = useTranslation('thruster_optimisation');

    async function copyTextToClipboard(text: string) {
        try {
            await navigator.clipboard.writeText(text);
            setNotificationMessage('Text copied to clipboard!');
        } catch (err) {
            setNotificationMessage('Failed to copy text.');
        }
    }

    const handleReset = () => {
        setThrusterCards([])
        setUseSteplines(true)
        setChartHeight(chart_height_default)
    }

    const handleExport = async () => {
        const state = {thrusterCards}
        const jsonState = JSON.stringify(state)
        const compressedState = compressToEncodedURIComponent(jsonState);
        const url = `${thruster_optimisation_url}/?${data_string_key}=${compressedState}`;
        await copyTextToClipboard(url)
        resetTimer()
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const compressedState = params.get(data_string_key);

        if (compressedState) {
            const jsonState = decompressFromEncodedURIComponent(compressedState);
            const state = JSON.parse(jsonState);
            setThrusterCards(state.thrusterCards)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setNotificationMessage("")
        }, 3000);
        return () => clearTimeout(timer);
    }, [timerKey]);

    useEffect(() => {
        const chart_voxel_volume = chart_calculator(thrusterCards, "voxel volume")
        setThrusters_voxel_volume(chart_voxel_volume)
        const chart_mass = chart_calculator(thrusterCards, "mass")
        setThrusters_mass(chart_mass)
        const chart_elec_usage = chart_calculator(thrusterCards, "elec_usage")
        setThrusters_elec_usage(chart_elec_usage)
        const chart_prop_usage = chart_calculator(thrusterCards, "prop_usage")
        setThrusters_prop_usage(chart_prop_usage)
        const thruster_radio_raw_values = get_chart_raw_thruster_values(chart_voxel_volume, chart_mass, chart_elec_usage, chart_prop_usage)
        setThruster_chart_raw_values(thruster_radio_raw_values)
    }, [thrusterCards]);

    const resetTimer = () => {
        setNotificationMessage(t("link"))
        setTimerKey(prevKey => prevKey + 1);
    };

    return <div>
        <Container className={"calc-title-container"}>
            <Row className={"ship-title-row"}>
                <h2>{t('title')}</h2>
                <p>{t('build')} {build_count}</p>
            </Row>
            <Row className={"ship-title-row"}>
                <ButtonToolbar className="justify-content-center">
                    <ButtonGroup>
                        <Button variant="primary" onClick={handleReset} className={"calc-setting-button"}>
                            <i className="fa-solid fa-gear calc-button-icon"></i> <span className={"calc-button-text"}>{t('reset')}</span>
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button variant="primary" onClick={handleExport} className={"calc-setting-button"}>
                            <i className="fa-solid fa-floppy-disk calc-button-icon"></i> <span className={"calc-button-text"}>{t('export')}</span>
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Row>
            <Row>
                <p className={"calc-notification"}>
                    {notificationMessage}
                </p>
            </Row>
        </Container>
        <Container className={"calc-container"}>
            <Row>
                <Col xl={3} xs={12}>
                    <ChartOptions
                        chartHeight={chartHeight}
                        setChartHeight={setChartHeight}
                        useSteplines={useSteplines}
                        setUseSteplines={setUseSteplines}
                        compactCharts={compactCharts}
                        setCompactCharts={setCompactCharts}
                    />
                    <Thrusters
                        thrusterCards={thrusterCards}
                        setThrusterCards={setThrusterCards}
                    />
                </Col>
                <Col xl={9} xs={12}>
                    <Container className={"calc-container"}>
                        <Row>
                            <Col xl={compactCharts ? compact_chart_value : non_compact_chart_value}>
                                <RatioChart
                                    chart_height={chartHeight}
                                    raw_values={thruster_chart_raw_values}
                                    compactCharts={compactCharts}
                                />
                                <BarChart
                                    chart_height={chartHeight}
                                    raw_values={thruster_chart_raw_values}
                                    compactCharts={compactCharts}
                                />
                            </Col>
                            <Col xl={compactCharts ? compact_chart_value : non_compact_chart_value}>
                                <Chart
                                    title={t("chart.thrust_to_voxel_volume")}
                                    x_label={t("chart.voxel_volume")}
                                    chart_height={chartHeight}
                                    useSteplines={useSteplines}
                                    chart_data={thrusters_voxel_volume}
                                    compactCharts={compactCharts}
                                />
                                <Chart
                                    title={t("chart.thrust_to_mass")}
                                    x_label={t("chart.mass")}
                                    chart_height={chartHeight}
                                    useSteplines={useSteplines}
                                    chart_data={thrusters_mass}
                                    compactCharts={compactCharts}
                                />
                                <Chart
                                    title={t("chart.thrust_to_elec_usage")}
                                    x_label={t("chart.elec_usage")}
                                    chart_height={chartHeight}
                                    useSteplines={useSteplines}
                                    chart_data={thrusters_elec_usage}
                                    compactCharts={compactCharts}
                                />
                                <Chart
                                    title={t("chart.thrust_to_prop_usage")}
                                    x_label={t("chart.prop_usage")}
                                    chart_height={chartHeight}
                                    useSteplines={useSteplines}
                                    chart_data={thrusters_prop_usage}
                                    compactCharts={compactCharts}
                                />
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    </div>
}

export default ThrusterOptimisation;
