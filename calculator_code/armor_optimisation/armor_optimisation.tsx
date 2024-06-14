import './armor_optimisation.css'
import {Container, Row} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import ArmorChart from "./armor_chart";
import ChartOptions from "./chart_options";
import {useLocalStorage} from "../../../utilities/local_storage";
import {
    chart_height_default,
    highest_armor_value, highest_corrosion_resistance_value,
    highest_density_value, highest_structural_integrity_value,
    lowest_armor_value, lowest_corrosion_resistance_value,
    lowest_density_value, lowest_structural_integrity_value
} from "./const_values";


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
    const [minStructuralIntegrity, setMinStructuralIntegrity] = useLocalStorage("armor_optimisation_min_structural_integrity", lowest_structural_integrity_value);
    const [maxStructuralIntegrity, setMaxStructuralIntegrity] = useLocalStorage("armor_optimisation_max_structural_integrity", highest_structural_integrity_value);
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
                        minStructuralIntegrity={minStructuralIntegrity}
                        setMinStructuralIntegrity={setMinStructuralIntegrity}
                        maxStructuralIntegrity={maxStructuralIntegrity}
                        setMaxStructuralIntegrity={setMaxStructuralIntegrity}
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
                        minStructuralIntegrity={minStructuralIntegrity}
                        maxStructuralIntegrity={maxStructuralIntegrity}
                        minCorrosionResistance={minCorrosionResistance}
                        maxCorrosionResistance={maxCorrosionResistance}
                    />
                </Row>
            </Container>
        </div>
    );
}

export default ArmorOptimisation;
