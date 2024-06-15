import "../../thruster-optimisation.css"
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import {useTranslation} from "react-i18next";
import {Chart_data_interface} from "./chart_data_interface";
import {Card, Container, Form, Row} from "react-bootstrap";
import React, {ChangeEvent, useEffect, useState} from "react";
import {prettyNumber} from "../../../../../utilities/pretty_number";
import {useTheme} from "../../../../theme/theme_context";

function Chart (
    {
        title,
        chart_height,
        useSteplines,
        x_label,
        chart_data,
        compactCharts,
    }:{
        title: string,
        chart_height: number
        useSteplines: boolean
        x_label: string
        chart_data: Chart_data_interface[],
        compactCharts: boolean
    }) {

    const { t } = useTranslation('thruster_optimisation');
    const { theme } = useTheme();

    const [Display, setDisplay] = useState(true)
    const [extendedHeight, setExtendedHeight] = useState<number>(0)

    const handleDisplay = (e: ChangeEvent<HTMLInputElement>) => {
        setDisplay(e.target.checked)
    }

    useEffect(() => {
        if (compactCharts) {
            setExtendedHeight(0)
        } else {
            setExtendedHeight(75)
        }
    }, [compactCharts]);

    const options: ApexOptions = {
        chart: {
            type: 'line',
        },
        stroke: {
            curve: (useSteplines) ? 'stepline' : 'straight',
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
            title: {
                text: x_label,
                style: {
                    color: theme === "dark" ? "#ffffff" : "#000000"
                }
            },
            labels: {
                formatter: prettyNumber,
                style: {
                    colors: theme === "dark" ? "#ffffff" : "#000000"
                }
            }
        },
        yaxis: {
            title: {
                text: t("chart.thrust"),
                style: {
                    color: theme === "dark" ? "#ffffff" : "#000000"
                }
            },
            labels: {
                formatter: prettyNumber,
                style: {
                    colors: theme === "dark" ? "#ffffff" : "#000000"
                }
            }
        },
        tooltip: {
            theme: theme,
        }
    }

    return <Card className={"thruster-optimisation-chart"}>
        <Card.Header className={"stats-card-header"}>
            <h4 className={"stats-sub-title"}>{title}</h4>
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
                            <ReactApexChart options={options} series={chart_data} type={"line"} height={chart_height * 10 + extendedHeight}/>
                        </Row>
                    </Container>
                    : null
            }
        </Card.Body>
    </Card>
}

export default Chart
