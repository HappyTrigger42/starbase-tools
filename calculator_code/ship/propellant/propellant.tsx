import './propellant.css'
import {Card, Col, Container, Row} from "react-bootstrap";
import React, {useEffect} from "react";
import {clamp} from "../../../../utilities/clamp";
import {big_propellant, medium_propellant, small_propellant} from "../../values/propellant_constants";
import {prettyNumber} from "../../../../utilities/pretty_number";
import {useTranslation} from "react-i18next";


function Propellant({
                        totalPropellant,
                        setTotalPropellant,
                        smallPropellantCount,
                        setSmallPropellantCount,
                        mediumPropellantCount,
                        setMediumPropellantCount,
                        bigPropellantCount,
                        setBigPropellantCount,
                    }:{
    totalPropellant: number,
    setTotalPropellant: React.Dispatch<React.SetStateAction<number>>,
    smallPropellantCount: number,
    setSmallPropellantCount: React.Dispatch<React.SetStateAction<number>>,
    mediumPropellantCount: number,
    setMediumPropellantCount: React.Dispatch<React.SetStateAction<number>>,
    bigPropellantCount: number,
    setBigPropellantCount: React.Dispatch<React.SetStateAction<number>>,
}) {

    const { t } = useTranslation('ship_calc');

    useEffect(() => {
        let new_total = smallPropellantCount * small_propellant + mediumPropellantCount * medium_propellant + bigPropellantCount * big_propellant
        setTotalPropellant(new_total);
    }, [smallPropellantCount, mediumPropellantCount, bigPropellantCount, setTotalPropellant]);

    const big_prop_change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = clamp(Number(e.target.value), 0, 1000);
        e.target.value = count.toString()
        setBigPropellantCount(count);
    }

    const medium_prop_change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = clamp(Number(e.target.value), 0, 1000);
        e.target.value = count.toString()
        setMediumPropellantCount(count);
    }

    const small_prop_change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = clamp(Number(e.target.value), 0, 1000);
        e.target.value = count.toString()
        setSmallPropellantCount(count);
    }

    return <Card>
        <Card.Header>
            <h3>{t('propellant.title')}</h3>
        </Card.Header>
        <Card.Body>
            <Container className={"machinery-container"}>
                <Row className={"card-attribute"}>
                    <Col xs={8}>
                        <div className={"card-attribute-text"}>{t('propellant.total_propellant')}</div>
                    </Col>
                    <Col xs={4}>
                        {prettyNumber(totalPropellant)}
                    </Col>
                </Row>
                <Row className={"card-attribute"}>
                    <Col xs={8}>
                        <div className={"card-attribute-text"}>{t('propellant.big_propellant')}</div>
                    </Col>
                    <Col xs={4}>
                        <input className={"card-attribute-input"}
                               type="number"
                               value={bigPropellantCount}
                               onChange={e => big_prop_change(e)}
                               placeholder="big propellant count" />
                    </Col>
                </Row>
                <Row className={"card-attribute"}>
                    <Col xs={8}>
                        <div className={"card-attribute-text"}>{t('propellant.medium_propellant')}</div>
                    </Col>
                    <Col xs={4}>
                        <input className={"card-attribute-input"}
                               type="number"
                               value={mediumPropellantCount}
                               onChange={e => medium_prop_change(e)}
                               placeholder="medium propellant count" />
                    </Col>
                </Row>
                <Row className={"card-attribute"}>
                    <Col xs={8}>
                        <div className={"card-attribute-text"}>{t('propellant.small_propellant')}</div>
                    </Col>
                    <Col xs={4}>
                        <input className={"card-attribute-input"}
                               type="number"
                               value={smallPropellantCount}
                               onChange={e => small_prop_change(e)}
                               placeholder="small propellant count" />
                    </Col>
                </Row>
            </Container>
        </Card.Body>
    </Card>
}

export default Propellant;
