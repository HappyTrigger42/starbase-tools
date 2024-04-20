import "../../thruster-optimisation.css"
import "./ratio_charts.css"
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import {useTranslation} from "react-i18next";
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import React, {ChangeEvent, useEffect, useState} from "react";
import {prettyNumber} from "../../../../../utilities/pretty_number";
import {chart_raw_thruster_values} from "../chart_raw_thruster_values_interface";
import {ratio_ratios_chart_data_interface} from "./ratio_chart_data_interface";
import {get_ratio_chart_ratios} from "./ratio_chart_calculator";

function RatioChart (
    {
        chart_height,
        raw_values,
        compactCharts,
    }:{
        chart_height: number
        raw_values: chart_raw_thruster_values[],
        compactCharts: boolean
    }) {

    const { t } = useTranslation('thruster_optimisation');

    const [Display, setDisplay] = useState(true)
    const [series, setSeries] = useState<ratio_ratios_chart_data_interface[]>([])
    const [extendedHeight, setExtendedHeight] = useState<number>(0)
    const [displayTons, setDisplayTons] = useState<boolean>(true)
    const [displayElec, setDisplayElec] = useState<boolean>(true)
    const [displayProp, setDisplayProp] = useState<boolean>(true)
    const [displayVoxels, setDisplayVoxels] = useState<boolean>(true)
    const [ratios_labels, setRatios_labels] = useState<string[]>([
        t("radio_chart.thrust_mass"),
        t("radio_chart.thrust_elec"),
        t("radio_chart.thrust_prop"),
        t("radio_chart.thrust_voxel_volume")
    ])

    useEffect(() => {
        let new_labels: string[] = []
        if (displayTons) {
            new_labels.push(t("radio_chart.thrust_mass"))
        }
        if (displayElec) {
            new_labels.push(t("radio_chart.thrust_elec"))
        }
        if (displayProp) {
            new_labels.push(t("radio_chart.thrust_prop"))
        }
        if (displayVoxels) {
            new_labels.push(t("radio_chart.thrust_voxel_volume"))
        }
        setRatios_labels(new_labels)
        setSeries(get_ratio_chart_ratios(raw_values, displayTons, displayElec, displayProp, displayVoxels))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayTons, displayElec, displayProp, displayVoxels, raw_values]);

    const handleDisplay = (e: ChangeEvent<HTMLInputElement>) => {
        setDisplay(e.target.checked)
    }

    const handleDisplayTons = (e: ChangeEvent<HTMLInputElement>) => {
        setDisplayTons(e.target.checked)
    }

    const handleDisplayElec = (e: ChangeEvent<HTMLInputElement>) => {
        setDisplayElec(e.target.checked)
    }

    const handleDisplayProp = (e: ChangeEvent<HTMLInputElement>) => {
        setDisplayProp(e.target.checked)
    }

    const handleDisplayVoxels = (e: ChangeEvent<HTMLInputElement>) => {
        setDisplayVoxels(e.target.checked)
    }

    useEffect(() => {
        if (compactCharts) {
            setExtendedHeight(0)
        } else {
            setExtendedHeight(200)
        }
    }, [compactCharts]);

    const options_ratios: ApexOptions = {
        chart: {
            type: 'bar',
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '65%',
            },
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            hover: {
                sizeOffset: 4
            }
        },
        xaxis: {
            categories: ratios_labels,
        },
        yaxis: {
            labels: {
                formatter: prettyNumber
            }
        }
    }

    return <Card className={"thruster-optimisation-chart"}>
        <Card.Header className={"stats-card-header"}>
            <h4 className={"stats-sub-title"}>{t("radio_chart.title")}</h4>
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
                Display ?
                    <Container className={"thruster-optimisation-chart"}>
                        <Row className={"thruster-optimisation-chart"}>
                            <Col xl={12}>
                                <ReactApexChart options={options_ratios} series={series} type={"bar"} height={chart_height * 20 + extendedHeight}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3} className={"ratio_chart_value_toggle"}>
                                <div className={"ratio_chart_value_text"}>
                                    {t("radio_chart.display_thrust_mass")}
                                </div>
                                <Form className={"stats-toggle"}>
                                    <Form.Check
                                        type="switch"
                                        checked={displayTons}
                                        onChange={handleDisplayTons}
                                    />
                                </Form>
                            </Col>
                            <Col md={3} className={"ratio_chart_value_toggle"}>
                                <div className={"ratio_chart_value_text"}>
                                    {t("radio_chart.display_thrust_elec")}
                                </div>
                                <Form className={"stats-toggle"}>
                                    <Form.Check
                                        type="switch"
                                        checked={displayElec}
                                        onChange={handleDisplayElec}
                                    />
                                </Form>
                            </Col>
                            <Col md={3} className={"ratio_chart_value_toggle"}>
                                <div className={"ratio_chart_value_text"}>
                                    {t("radio_chart.display_thrust_prop")}
                                </div>
                                <Form className={"stats-toggle"}>
                                    <Form.Check
                                        type="switch"
                                        checked={displayProp}
                                        onChange={handleDisplayProp}
                                    />
                                </Form>
                            </Col>
                            <Col md={3} className={"ratio_chart_value_toggle"}>
                                <div className={"ratio_chart_value_text"}>
                                    {t("radio_chart.display_thrust_voxel_volume")}
                                </div>
                                <Form className={"stats-toggle"}>
                                    <Form.Check
                                        type="switch"
                                        checked={displayVoxels}
                                        onChange={handleDisplayVoxels}
                                    />
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                    : null
            }
        </Card.Body>
    </Card>
}

export default RatioChart
