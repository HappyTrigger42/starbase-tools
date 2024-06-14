import {useTranslation} from "react-i18next";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import React from "react";
import {clamp} from "../../../utilities/clamp";
import {
    armor_sort_type,
    chart_height_default,
    chart_max_height,
    chart_min_height,
    highest_armor_value,
    highest_corrosion_resistance_value,
    highest_density_value,
    highest_structural_integrity_value,
    lowest_armor_value,
    lowest_corrosion_resistance_value,
    lowest_density_value,
    lowest_structural_integrity_value
} from "./const_values";
import {num_input} from "../../../utilities/num_input";
import {on_off} from "../../../utilities/on_off";
import RangeSlider from "../../../utilities/range-slider";

function ChartOptions(
    {
        chartHeight,
        setChartHeight,
        x_axis,
        setX_axis,
        y_axis,
        setY_axis,
        displayMaterials,
        setDisplayMaterials,
        displayAlloys,
        setDisplayAlloys,
        minArmor,
        setMinArmor,
        maxArmor,
        setMaxArmor,
        minDensity,
        setMinDensity,
        maxDensity,
        setMaxDensity,
        minStructuralIntegrity,
        setMinStructuralIntegrity,
        maxStructuralIntegrity,
        setMaxStructuralIntegrity,
        minCorrosionResistance,
        setMinCorrosionResistance,
        maxCorrosionResistance,
        setMaxCorrosionResistance
    }: {
        chartHeight: number,
        setChartHeight: React.Dispatch<React.SetStateAction<number>>
        x_axis: armor_sort_type,
        setX_axis: React.Dispatch<React.SetStateAction<armor_sort_type>>
        y_axis: armor_sort_type,
        setY_axis: React.Dispatch<React.SetStateAction<armor_sort_type>>
        displayMaterials: boolean,
        setDisplayMaterials: React.Dispatch<React.SetStateAction<boolean>>
        displayAlloys: boolean,
        setDisplayAlloys: React.Dispatch<React.SetStateAction<boolean>>
        minArmor: number,
        setMinArmor: React.Dispatch<React.SetStateAction<number>>
        maxArmor: number,
        setMaxArmor: React.Dispatch<React.SetStateAction<number>>
        minDensity: number,
        setMinDensity: React.Dispatch<React.SetStateAction<number>>
        maxDensity: number,
        setMaxDensity: React.Dispatch<React.SetStateAction<number>>
        minStructuralIntegrity: number,
        setMinStructuralIntegrity: React.Dispatch<React.SetStateAction<number>>
        maxStructuralIntegrity: number,
        setMaxStructuralIntegrity: React.Dispatch<React.SetStateAction<number>>
        minCorrosionResistance: number,
        setMinCorrosionResistance: React.Dispatch<React.SetStateAction<number>>
        maxCorrosionResistance: number,
        setMaxCorrosionResistance: React.Dispatch<React.SetStateAction<number>>
    }) {

    const {t} = useTranslation('armor_optimisation');

    const handleChartHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setChartHeight(clamp(value, chart_min_height, chart_max_height))
    }

    const handle_axis_change = (name: string, e: React.ChangeEvent<HTMLSelectElement>, setAxis: React.Dispatch<React.SetStateAction<armor_sort_type>>) => {
        const value = e.target.value as armor_sort_type;
        setAxis(value)
    }

    function axis_handler(display: string, axis: string, setAxis: React.Dispatch<React.SetStateAction<armor_sort_type>>) {
        return <Row className={"card-attribute"}>
            <Col xs={7}>
                <div className={"card-attribute-text"}>{display}</div>
            </Col>
            <Col xs={5}>
                <Form.Select className={"card-attribute-input card-attribute-input-select"}
                             value={axis}
                             onChange={e => handle_axis_change('chart_options.x_axis', e, setAxis)}>
                    <option value={"armor"}>{t('chart_axis.armor')}</option>
                    <option value={"density"}>{t('chart_axis.density')}</option>
                    <option value={"structural_integrity"}>{t('chart_axis.structural_integrity')}</option>
                    <option value={"corrosion_resistance"}>{t('chart_axis.corrosion_resistance')}</option>
                </Form.Select>
            </Col>
        </Row>
    }

    function min_max(title: string, minRange: number, maxRange: number, min: number, setMin: React.Dispatch<React.SetStateAction<number>>, max: number, setMax: React.Dispatch<React.SetStateAction<number>>) {
        return <div className={"armor-optimisation-small-padding"}>
            <Container>
                <Row className={"armor-optimisation-slider-container"}>
                    <Col xs={4}>
                        {title}<br/>{min} / {max}
                    </Col>
                    <Col xs={8}>
                        <RangeSlider
                            minRange={minRange}
                            maxRange={maxRange}
                            min={min}
                            setMin={setMin}
                            max={max}
                            setMax={setMax}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    }

    const handleReset = () => {
        setChartHeight(chart_height_default);
        setX_axis("density");
        setY_axis("armor");
        setDisplayMaterials(true);
        setDisplayAlloys(true);
        setMinArmor(lowest_armor_value);
        setMaxArmor(highest_armor_value);
        setMinDensity(lowest_density_value);
        setMaxDensity(highest_density_value);
        setMinStructuralIntegrity(lowest_structural_integrity_value);
        setMaxStructuralIntegrity(highest_structural_integrity_value);
        setMinCorrosionResistance(lowest_corrosion_resistance_value);
        setMaxCorrosionResistance(highest_corrosion_resistance_value);
    }

    return <Card>
        <Card.Header className={"justify-content-center"}>
            <h3>{t("chart_options.title")}</h3>
            <Button variant="primary" onClick={handleReset} className={"armor-optimisation-setting-button"}>
                <i className="fa-solid fa-gear calc-button-icon"/> <span className={"armor-optimisation-button-text"}>{t('chart_options.reset')}</span>
            </Button>
        </Card.Header>
        <Card.Body>
            <Container>
                <Row>
                    <Col md={5}>
                        <h3>{t("chart_options.options")}</h3>
                        <div className={"armor-optimisation-small-padding"}>
                            {num_input(t("chart_options.chart_height"), chartHeight, handleChartHeightChange)}
                        </div>
                        <div className={"armor-optimisation-small-padding"}>
                            {on_off(t("chart_options.display_materials"), t("yes"), t("no"), displayMaterials, setDisplayMaterials, "armor-optimisation")}
                        </div>
                        <div className={"armor-optimisation-small-padding"}>
                            {on_off(t("chart_options.display_alloys"), t("yes"), t("no"), displayAlloys, setDisplayAlloys, "armor-optimisation")}
                        </div>
                        <div className={"armor-optimisation-small-padding"}>
                            {axis_handler(t("chart_options.x_axis"), x_axis, setX_axis)}
                        </div>
                        <div className={"armor-optimisation-small-padding"}>
                            {axis_handler(t("chart_options.y_axis"), y_axis, setY_axis)}
                        </div>
                    </Col>
                    <Col md={7}>
                        <h3>{t("chart_options.filters")}</h3>
                        {min_max(t("chart_axis.armor"), lowest_armor_value, highest_armor_value, minArmor, setMinArmor, maxArmor, setMaxArmor)}
                        {min_max(t("chart_axis.density"), lowest_density_value, highest_density_value, minDensity, setMinDensity, maxDensity, setMaxDensity)}
                        {min_max(t("chart_axis.structural_integrity"), lowest_structural_integrity_value, highest_structural_integrity_value, minStructuralIntegrity, setMinStructuralIntegrity, maxStructuralIntegrity, setMaxStructuralIntegrity)}
                        {min_max(t("chart_axis.corrosion_resistance"), lowest_corrosion_resistance_value, highest_corrosion_resistance_value, minCorrosionResistance, setMinCorrosionResistance, maxCorrosionResistance, setMaxCorrosionResistance)}
                    </Col>
                </Row>
            </Container>
        </Card.Body>
    </Card>
}

export default ChartOptions
