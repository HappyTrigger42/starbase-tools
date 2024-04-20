import {Col, Row} from "react-bootstrap";
import React from "react";
import {useTranslation} from "react-i18next";
import {clamp} from "../../../../utilities/clamp";

function ModuleLine(
    {
        value,
        value_name,
        setter
    } : {
        value: number,
        value_name: string,
        setter: React.Dispatch<React.SetStateAction<number>>;
    }) {

    const { t } = useTranslation('cap_ship_calc');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>) {
        const value = clamp(Number(e.target.value), 0, 40000);
        e.target.value = value.toString()
        setter(value);
    }

    return <Row className={"card-attribute"}>
        <Col xs={8}>
            <div className={"card-attribute-text"}>{t(value_name)}</div>
        </Col>
        <Col xs={4}>
            <input
                className={"card-attribute-input"}
                type="number"
                value={value}
                onChange={e => handleChange(e, setter)}
            />
        </Col>
    </Row>
}

export default ModuleLine
