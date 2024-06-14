import {bar_chart_data_interface, bar_chart_mode_interface} from "./bar_chart_data_interface";
import {useTranslation} from "react-i18next";
import React, {ChangeEvent, useEffect, useState} from "react";
import {Card, Container, Form, Row} from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import {chart_raw_thruster_values} from "../chart_raw_thruster_values_interface";
import {get_bar_chart_values} from "./bar_chart_calculator";
import {prettyNumber} from "../../../../../utilities/pretty_number";


function BarChart (
    {
        chart_height,
        raw_values,
        compactCharts,
    } : {
        chart_height: number
        raw_values: chart_raw_thruster_values[],
        compactCharts: boolean
    }) {

    const { t } = useTranslation('thruster_optimisation');

    const [Display, setDisplay] = useState(true)
    const [bar_chart_voxel_values, set_bar_chart_voxel_values] = useState<bar_chart_data_interface>({data: []})
    const [bar_chart_mass_values, setBar_chart_mass_values] = useState<bar_chart_data_interface>({data: []})
    const [bar_chart_elec_values, setBar_chart_elec_values] = useState<bar_chart_data_interface>({data: []})
    const [bar_chart_prop_values, setBar_chart_prop_values] = useState<bar_chart_data_interface>({data: []})
    const [bar_chart_thrust_values, setBar_chart_thrust_values] = useState<bar_chart_data_interface>({data: []})
    const [extendedHeight, setExtendedHeight] = useState<number>(0)

    useEffect(() => {
        set_bar_chart_voxel_values(get_bar_chart_values(raw_values, "voxel"))
        setBar_chart_mass_values(get_bar_chart_values(raw_values, "mass"))
        setBar_chart_elec_values(get_bar_chart_values(raw_values, "elec"))
        setBar_chart_prop_values(get_bar_chart_values(raw_values, "prop"))
        setBar_chart_thrust_values(get_bar_chart_values(raw_values, "thrust"))
    }, [raw_values])

    useEffect(() => {
        if (compactCharts) {
            setExtendedHeight(0)
        } else {
            setExtendedHeight(100)
        }
    }, [compactCharts]);

    const handleDisplay = (e: ChangeEvent<HTMLInputElement>) => {
        setDisplay(e.target.checked)
    }

    function bar_chart(name: bar_chart_mode_interface, translated_name: string, values: bar_chart_data_interface) {
        let options_chart: ApexOptions = {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                title: {
                    text: translated_name
                },
                categories: raw_values.map((value) => value.name),
                labels: {
                    formatter: prettyNumber
                }
            },
        }

        return <Row className={"thruster-optimisation-chart"}>
            <ReactApexChart options={options_chart} series={[values]} type={"bar"} height={chart_height * 6 + extendedHeight}/>
        </Row>
    }

    return <Card className={"thruster-optimisation-chart"}>
        <Card.Header className={"stats-card-header"}>
            <h4 className={"stats-sub-title"}>{t("bar_chart.title")}</h4>
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
                        {bar_chart("thrust", t("radio_chart.total_thrust"), bar_chart_thrust_values)}
                        {bar_chart("mass", t("radio_chart.total_mass"), bar_chart_mass_values)}
                        {bar_chart("elec", t("radio_chart.total_elec"), bar_chart_elec_values)}
                        {bar_chart("prop", t("radio_chart.total_prop"), bar_chart_prop_values)}
                        {bar_chart("voxel", t("radio_chart.total_voxel_volume"), bar_chart_voxel_values)}
                    </Container>
                    : null
            }
        </Card.Body>
    </Card>
}

export default BarChart
