import {ApexOptions} from "apexcharts";
import {Row} from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
import React, {useEffect} from "react";
import {all_materials, alloys, material, materials} from "../values/armor_constants";
import "./armor_optimisation.css";
import {prettyNumber} from "../../../utilities/pretty_number";
import {armor_sort_type} from "./const_values";
import {useLocalStorage} from "../../../utilities/local_storage";
import {useTranslation} from "react-i18next";
import {useTheme} from "../../theme/theme_context";


function ArmorChart(
    {
        chartHeight,
        x_axis,
        y_axis,
        displayMaterials,
        displayAlloys,
        minArmor,
        maxArmor,
        minDensity,
        maxDensity,
        minStructuralIntegrity,
        maxStructuralIntegrity,
        minCorrosionResistance,
        maxCorrosionResistance,
    } : {
        chartHeight: number,
        x_axis: armor_sort_type,
        y_axis: armor_sort_type,
        displayMaterials: boolean,
        displayAlloys: boolean,
        minArmor: number,
        maxArmor: number,
        minDensity: number,
        maxDensity: number,
        minStructuralIntegrity: number,
        maxStructuralIntegrity: number,
        minCorrosionResistance: number,
        maxCorrosionResistance: number,
    }) {

    const {t} = useTranslation('armor_optimisation');
    const { theme } = useTheme();

    function getMaterials() {
        let ret = [];
        let selected_materials: material[] = [];
        if (displayMaterials && displayAlloys) {
            selected_materials = all_materials
        } else if (displayMaterials && !displayAlloys) {
            selected_materials = materials
        } else if (!displayMaterials && displayAlloys) {
            selected_materials = alloys
        }
        for (let material of selected_materials) {
            if (material.armor >= minArmor && material.armor <= maxArmor &&
                material.density >= minDensity && material.density <= maxDensity &&
                material.structural_durability >= minStructuralIntegrity && material.structural_durability <= maxStructuralIntegrity &&
                material.corrosion_resistance >= minCorrosionResistance && material.corrosion_resistance <= maxCorrosionResistance) {
                let data_x = 0;
                switch (x_axis) {
                    case "armor":
                        data_x = material.armor;
                        break;
                    case "density":
                        data_x = material.density;
                        break;
                    case "structural_durability":
                        data_x = material.structural_durability;
                        break;
                    case "corrosion_resistance":
                        data_x = material.corrosion_resistance;
                        break;
                }
                let data_y = 0;
                switch (y_axis) {
                    case "armor":
                        data_y = material.armor;
                        break;
                    case "density":
                        data_y = material.density;
                        break;
                    case "structural_durability":
                        data_y = material.structural_durability;
                        break;
                    case "corrosion_resistance":
                        data_y = material.corrosion_resistance;
                        break;
                }
                let buffer = {
                    name: material.name,
                    image: material.source_asset,
                    data: [[data_x, data_y]]
                };
                ret.push(buffer);
            }
        }
        return ret
    }

    function getOptions(): ApexOptions {
        return {
            chart: {
                height: 350,
                type: 'scatter',
                animations: {
                    enabled: false,
                },
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false
                }
            },
            markers: {
                size: 20
            },
            xaxis: {
                title: {
                    text: t("chart_axis.density"),
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
                    text: t("chart_axis.armor"),
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
            },
            fill: {
                type: 'image',
                opacity: 1,
                image: {
                    src: all_materials.map((material) => material.source_asset),
                    width: 40,
                    height: 40
                }
            },
            legend: {
                labels: {
                    colors: theme === "dark" ? "#ffffff" : "#000000"
                }
            }
        }
    }

    const [options_chart, setOptions_chart] = useLocalStorage("armor-optimisation-chart-options", getOptions());
    const [series_chart, setSeries_chart] = useLocalStorage("armor-optimisation-chart-series", getMaterials());

    useEffect(() => {
        let materials = getMaterials();
        setSeries_chart(materials);
        let new_options = getOptions();
        if (new_options.fill &&
            new_options.fill.image &&
            new_options.fill.image.src &&
            new_options.xaxis &&
            new_options.xaxis.title &&
            new_options.yaxis &&
            !Array.isArray(new_options.yaxis) && // Check if yaxis is not an array
            new_options.yaxis.title) {
            new_options.fill = {
                ...new_options.fill,
                image: {
                    ...new_options.fill.image,
                    src: materials.map((material) => (material.image))
                }
            };
            new_options.xaxis.title.text = t("chart_axis." + x_axis);
            new_options.yaxis.title.text = t("chart_axis." + y_axis);
            setOptions_chart(new_options)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [x_axis, y_axis, displayMaterials, displayAlloys, minArmor, maxArmor, minDensity, maxDensity,
        minStructuralIntegrity, maxStructuralIntegrity, minCorrosionResistance, maxCorrosionResistance, theme]);

    return <Row className={"armor-optimisation-chart"}>
        <div className={"armor-optimisation-display-center"}>
            {t("currently_displaying", {"displayed": series_chart.length, "total": all_materials.length})}
        </div>
        <ReactApexChart options={options_chart} series={series_chart} type={"scatter"} height={chartHeight * 10}/>
    </Row>
}

export default ArmorChart;
