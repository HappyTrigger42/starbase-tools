import React, {ChangeEvent, useEffect, useState} from "react";
import {bat_capacity} from "../../values/misc_constants";
import {prettyNumber} from "../../../../utilities/pretty_number";
import {Container, Row, Col, Card, Form} from "react-bootstrap";
import {useTranslation} from "react-i18next";

function BatStats(
    {
        batteryCount,
        weaponPassivePowerConsumption,
        weaponShootingPowerConsumption,
        totalPowerGen,
        towingPowerDeficit,
        miningEquipmentPowerDeficit,
        collectorCount,
        miningLaserCount,
        towingWeight,
        thrusterElectricityConsumption,
    }:{
        batteryCount: number,
        weaponPassivePowerConsumption: number,
        weaponShootingPowerConsumption: number,
        totalPowerGen: number,
        towingPowerDeficit: number,
        miningEquipmentPowerDeficit: number,
        collectorCount: number,
        miningLaserCount: number,
        towingWeight: number,
        thrusterElectricityConsumption: number,
    }) {

    const { t } = useTranslation('ship_calc');

    const [totalBatCapacity, setTotalBatCapacity] = React.useState(0);
    const [batDeficitTimeWeapons, setBatDeficitTimeWeapons] = React.useState(0);
    const [batRefillTimeWeapons, setBatRefillTimeWeapons] = React.useState(0);
    const [batDeficitBatWeapons, setBatDeficitBatWeapons] = React.useState(0);
    const [batRefillBatWeapons, setBatRefillBatWeapons] = React.useState(0);
    const [batDeficitTimeTowing, setBatDeficitTimeTowing] = React.useState(0);
    const [batRefillTimeTowing, setBatRefillTimeTowing] = React.useState(0);
    const [batDeficitBatTowing, setBatDeficitBatTowing] = React.useState(0);
    const [batRefillBatTowing, setBatRefillBatTowing] = React.useState(0);
    const [batDeficitTimeMining, setBatDeficitTimeMining] = React.useState(0);
    const [batRefillTimeMining, setBatRefillTimeMining] = React.useState(0);
    const [batDeficitBatMining, setBatDeficitBatMining] = React.useState(0);
    const [batRefillBatMining, setBatRefillBatMining] = React.useState(0);
    const [batDeficitTimeThrusters, setBatDeficitTimeThrusters] = React.useState(0);
    const [batRefillTimeThrusters, setBatRefillTimeThrusters] = React.useState(0);
    const [batDeficitBatThrusters, setBatDeficitBatThrusters] = React.useState(0);
    const [batRefillBatThrusters, setBatRefillBatThrusters] = React.useState(0);
    const [Display, setDisplay] = useState(true)

    useEffect(() => { // bat calculations weapons
        let deficit = weaponShootingPowerConsumption - totalPowerGen;
        setBatDeficitBatWeapons(deficit / bat_capacity)
        let refill_bat = (totalPowerGen - weaponPassivePowerConsumption) / bat_capacity;
        setBatRefillBatWeapons(refill_bat);
        if (batteryCount > 0) {
            let seconds = totalBatCapacity / deficit;
            setBatDeficitTimeWeapons(seconds);
            let refill = totalBatCapacity / (totalPowerGen - weaponPassivePowerConsumption);
            setBatRefillTimeWeapons(refill);
        }

    }, [weaponShootingPowerConsumption, batteryCount, totalPowerGen, totalBatCapacity, weaponPassivePowerConsumption]);

    useEffect(() => { // bat calculations towing
        let deficit = (towingPowerDeficit * -1);
        setBatDeficitBatTowing(deficit / bat_capacity)
        let refill_bat = totalPowerGen / bat_capacity;
        setBatRefillBatTowing(refill_bat);
        if (batteryCount > 0) {
            let seconds = totalBatCapacity / deficit;
            setBatDeficitTimeTowing(seconds);
            let refill = totalBatCapacity / totalPowerGen;
            setBatRefillTimeTowing(refill);
        }
    }, [towingPowerDeficit, batteryCount, totalPowerGen, totalBatCapacity]);

    useEffect(() => { // bat calculations mining
        let deficit = (miningEquipmentPowerDeficit * -1);
        setBatDeficitBatMining(deficit / bat_capacity)
        let refill_bat = totalPowerGen / bat_capacity;
        setBatRefillBatMining(refill_bat);
        if (batteryCount > 0) {
            let seconds = totalBatCapacity / deficit;
            setBatDeficitTimeMining(seconds);
            let refill = totalBatCapacity / totalPowerGen;
            setBatRefillTimeMining(refill);
        }
    }, [miningEquipmentPowerDeficit, batteryCount, totalPowerGen, totalBatCapacity]);

    useEffect(() => { // bat calculations thrusters
        let deficit = thrusterElectricityConsumption;
        setBatDeficitBatThrusters(deficit / bat_capacity)
        let refill_bat = totalPowerGen / bat_capacity;
        setBatRefillBatThrusters(refill_bat);
        if (batteryCount > 0) {
            let seconds = totalBatCapacity / deficit;
            setBatDeficitTimeThrusters(seconds);
            let refill = totalBatCapacity / totalPowerGen;
            setBatRefillTimeThrusters(refill);
        }
    }, [thrusterElectricityConsumption, batteryCount, totalPowerGen, totalBatCapacity]);

    useEffect(() => { // bat capacity
        let totalBatCapacity = batteryCount * bat_capacity;
        setTotalBatCapacity(totalBatCapacity);
    }, [batteryCount]);

    function batWarning(warning: string) {
        return <>
            <Row className={"stats-warning"}>
                {t("batteries.warning", {"warning": warning})}
            </Row>
        </>
    }

    function batDrain(deficitTime: number, deficitBat: number) {
        return <>
            {
                (batteryCount !== 0) ? (
                    <Row>
                        <Col className={"stats-text"} xs={8}>
                            {t("batteries.drain_time")}
                        </Col>
                        <Col className={"stats-text-numbers"} xs={4}>
                            {prettyNumber(deficitTime)} {t('seconds')}
                        </Col>
                    </Row>
                ) : null
            }
            <Row>
                <Col className={"stats-text"} xs={8}>
                    {t('batteries.bat_second')}
                </Col>
                <Col className={"stats-text-numbers"} xs={4}>
                    {prettyNumber(deficitBat)}
                </Col>
            </Row>
        </>
    }

    function batRefill(refillTime: number, refillBat: number) {
        return <>
            {
                (batteryCount !== 0) ? (
                    <Row>
                        <Col className={"stats-text"} xs={8}>
                            {t('batteries.refill_time')}
                        </Col>
                        <Col className={"stats-text-numbers"} xs={4}>
                            {prettyNumber(refillTime)} {t('seconds')}
                        </Col>
                    </Row>
                ) : null
            }
            <Row>
                <Col className={"stats-text"} xs={8}>
                    {t('batteries.bat_refill')}
                </Col>
                <Col className={"stats-text-numbers"} xs={4}>
                    {prettyNumber(refillBat)}
                </Col>
            </Row>
        </>
    }

    function batUnaffected(cause: string) {
        return <Row>
            {t('batteries.no_warning', {"warning": cause})}
        </Row>
    }

    const handleDisplay = (e: ChangeEvent<HTMLInputElement>) => {
        setDisplay(e.target.checked)
    }

    return <Card className={"stats-card"}>
        <Card.Header className={"stats-card-header"}>
            <h4 className={"stats-sub-title"}>{t('batteries.title')}</h4>
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
                (Display) ?
                    <Container className={"stats-container"}>
                        <Row>
                            <Col className={"stats-text"} xs={8}>
                                {t('batteries.bat_capacity')}
                            </Col>
                            <Col className={"stats-text-numbers"} xs={4}>
                                {prettyNumber(totalBatCapacity)}
                            </Col>
                        </Row>
                        {
                            (thrusterElectricityConsumption !==0 && (collectorCount !== 0 || miningLaserCount !== 0 || towingWeight !== 0 || weaponPassivePowerConsumption !== 0)) ? (
                                <Row>
                                    <Col className={"stats-text"} >
                                        {t('batteries.thrusters_not_included')}
                                    </Col>
                                </Row>
                            ) : null
                        }
                        {
                            // ========================== bat stats
                        }
                        {
                            (weaponPassivePowerConsumption > totalPowerGen) ? (
                                <Row className={"stats-error"}>
                                    {t('batteries.passive_weapons')}
                                </Row>
                            ) : null
                        }
                        {
                            // ========================== bat warnings weapons
                        }
                        {
                            (weaponPassivePowerConsumption <= totalPowerGen && weaponShootingPowerConsumption > totalPowerGen) ? (
                                batWarning(t('batteries.shooting'))
                            ) : null
                        }
                        {
                            (weaponPassivePowerConsumption <= totalPowerGen && weaponShootingPowerConsumption > totalPowerGen) ? (
                                <>
                                    {batDrain(batDeficitTimeWeapons, batDeficitBatWeapons)}
                                    {batRefill(batRefillTimeWeapons, batRefillBatWeapons)}
                                </>
                            ) : null
                        }
                        {
                            (weaponShootingPowerConsumption < totalPowerGen && weaponPassivePowerConsumption !== 0) ? (
                                batUnaffected(t('batteries.shooting'))
                            ) : null
                        }
                        {
                            // ========================== bat warnings towing
                        }
                        {
                            (towingPowerDeficit < 0 && towingWeight !== 0) ? (
                                batWarning(t('batteries.towing'))
                            ) : null

                        }
                        {
                            (towingPowerDeficit < 0) ? (
                                <>
                                    {batDrain(batDeficitTimeTowing, batDeficitBatTowing)}
                                    {batRefill(batRefillTimeTowing, batRefillBatTowing)}
                                </>
                            ) : null
                        }
                        {
                            (towingPowerDeficit >= 0 && towingWeight !== 0) ? (
                                batUnaffected(t('batteries.towing'))
                            ) : null
                        }
                        {
                            // ========================== bat warnings mining
                        }
                        {
                            (miningEquipmentPowerDeficit < 0) ? (
                                batWarning(t('batteries.mining'))
                            ) : null
                        }
                        {
                            (miningEquipmentPowerDeficit < 0) ? (
                                <>
                                    {batDrain(batDeficitTimeMining, batDeficitBatMining)}
                                    {batRefill(batRefillTimeMining, batRefillBatMining)}
                                </>
                            ) : null
                        }
                        {
                            (miningEquipmentPowerDeficit > 0 && (collectorCount !== 0 || miningLaserCount !== 0)) ? (
                                batUnaffected(t('batteries.mining'))
                            ) : null
                        }
                        {
                            // ========================== bat warnings thrusters
                        }
                        {
                            (thrusterElectricityConsumption > totalPowerGen) ? (
                                batWarning(t('batteries.thrusters'))
                            ) : null
                        }
                        {
                            (thrusterElectricityConsumption > totalPowerGen) ? (
                                <>
                                    {batDrain(batDeficitTimeThrusters, batDeficitBatThrusters)}
                                    {batRefill(batRefillTimeThrusters, batRefillBatThrusters)}
                                </>
                            ) : null
                        }
                        {
                            (thrusterElectricityConsumption < totalPowerGen) ? (
                                batUnaffected(t('batteries.thrusters'))
                            ) : null
                        }
                    </Container>
                    : null
            }
        </Card.Body>
    </Card>
}

export default BatStats;
