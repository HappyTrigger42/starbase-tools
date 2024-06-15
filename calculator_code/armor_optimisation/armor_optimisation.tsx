import './armor_optimisation.css'
import {Col, Container, Row} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import ArmorChart from "./armor_chart";
import ChartOptions from "./chart_options";
import {useLocalStorage} from "../../../utilities/local_storage";
import {
    chart_height_default,
    highest_armor_value, highest_corrosion_resistance_value,
    highest_density_value, highest_structural_durability_value,
    lowest_armor_value, lowest_corrosion_resistance_value,
    lowest_density_value, lowest_structural_durability_value
} from "./const_values";
import ArmorValueTable from "../../values/value_tables/calculator_tables/armor_value_table";
import AlloyValueTable from "../../values/value_tables/calculator_tables/alloy_values";
import React from "react";


function ArmorOptimisation() {
    const { t } = useTranslation('armor_optimisation');

    const [chartHeight, setChartHeight] = useLocalStorage("armor_optimisation_chart_height", chart_height_default);
    const [x_axis, setX_axis] = useLocalStorage("armor_optimisation_x_axis", "density");
    const [y_axis, setY_axis] = useLocalStorage("armor_optimisation_y_axis", "armor");
    const [displayMaterials, setDisplayMaterials] = useLocalStorage("armor_optimisation_display_materials", true);
    const [displayAlloys, setDisplayAlloys] = useLocalStorage("armor_optimisation_display_alloys", true);
    const [minArmor, setMinArmor] = useLocalStorage("armor_optimisation_min_armor", lowest_armor_value);
    const [maxArmor, setMaxArmor] = useLocalStorage("armor_optimisation_max_armor", highest_armor_value);
    const [minDensity, setMinDensity] = useLocalStorage("armor_optimisation_min_density", lowest_density_value);
    const [maxDensity, setMaxDensity] = useLocalStorage("armor_optimisation_max_density", highest_density_value);
    const [minStructuralDurability, setMinStructuralIntegrity] = useLocalStorage("armor_optimisation_min_structural_durability", lowest_structural_durability_value);
    const [maxStructuralDurability, setMaxStructuralIntegrity] = useLocalStorage("armor_optimisation_max_structural_durability", highest_structural_durability_value);
    const [minCorrosionResistance, setMinCorrosionResistance] = useLocalStorage("armor_optimisation_min_corrosion_resistance", lowest_corrosion_resistance_value);
    const [maxCorrosionResistance, setMaxCorrosionResistance] = useLocalStorage("armor_optimisation_max_corrosion_resistance", highest_corrosion_resistance_value);

    return (
        <div>
            <Container className={"calc-title-container"}>
                <Row className={"ship-title-row"}>
                    <h2>{t('title')}</h2>
                </Row>
                <Row>
                    <ChartOptions
                        chartHeight={chartHeight}
                        setChartHeight={setChartHeight}
                        x_axis={x_axis}
                        setX_axis={setX_axis}
                        y_axis={y_axis}
                        setY_axis={setY_axis}
                        displayMaterials={displayMaterials}
                        setDisplayMaterials={setDisplayMaterials}
                        displayAlloys={displayAlloys}
                        setDisplayAlloys={setDisplayAlloys}
                        minArmor={minArmor}
                        setMinArmor={setMinArmor}
                        maxArmor={maxArmor}
                        setMaxArmor={setMaxArmor}
                        minDensity={minDensity}
                        setMinDensity={setMinDensity}
                        maxDensity={maxDensity}
                        setMaxDensity={setMaxDensity}
                        minStructuralDurability={minStructuralDurability}
                        setMinStructuralDurability={setMinStructuralIntegrity}
                        maxStructuralDurability={maxStructuralDurability}
                        setMaxStructuralDurability={setMaxStructuralIntegrity}
                        minCorrosionResistance={minCorrosionResistance}
                        setMinCorrosionResistance={setMinCorrosionResistance}
                        maxCorrosionResistance={maxCorrosionResistance}
                        setMaxCorrosionResistance={setMaxCorrosionResistance}
                    />
                </Row>
                <Row>
                    <ArmorChart
                        chartHeight={chartHeight}
                        x_axis={x_axis}
                        y_axis={y_axis}
                        displayMaterials={displayMaterials}
                        displayAlloys={displayAlloys}
                        minArmor={minArmor}
                        maxArmor={maxArmor}
                        minDensity={minDensity}
                        maxDensity={maxDensity}
                        minStructuralIntegrity={minStructuralDurability}
                        maxStructuralIntegrity={maxStructuralDurability}
                        minCorrosionResistance={minCorrosionResistance}
                        maxCorrosionResistance={maxCorrosionResistance}
                    />
                </Row>
                <Row>
                    <div className={"armor-optimisation-text-align-center"}>
                        {t('table_description')}
                    </div>
                </Row>
                <Row className={"armor-optimisation-margin"}>
                    <Col lg={6}>
                        <ArmorValueTable/>
                    </Col>
                    <Col lg={6}>
                        <AlloyValueTable/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ArmorOptimisation;
