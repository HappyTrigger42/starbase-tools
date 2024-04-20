import './stats.css'
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import React, {ChangeEvent, useEffect, useState} from "react";
import {weapon, rail_cannon, auto_cannon, laser_cannon, plasma_cannon} from "../../values/weapon_constants";
import {prettyNumber} from "../../../../utilities/pretty_number";
import {useTranslation} from "react-i18next";

function WeaponsStats (
    {
        autoCannons,
        laserCannons,
        plasmaCannons,
        railGuns,
        totalPowerGen,
        weaponPassivePowerConsumption,
        setWeaponPassivePowerConsumption,
        weaponShootingPowerConsumption,
        setWeaponShootingPowerConsumption,
        weaponHeatGeneratedWhenShooting,
        setWeaponHeatGeneratedWhenShooting,
        miningLaserCount,
    }: {
        autoCannons: number;
        laserCannons: number;
        plasmaCannons: number;
        railGuns: number;
        totalPowerGen: number;
        weaponPassivePowerConsumption: number;
        setWeaponPassivePowerConsumption: React.Dispatch<React.SetStateAction<number>>;
        weaponShootingPowerConsumption: number;
        setWeaponShootingPowerConsumption: React.Dispatch<React.SetStateAction<number>>;
        weaponHeatGeneratedWhenShooting: number;
        setWeaponHeatGeneratedWhenShooting: React.Dispatch<React.SetStateAction<number>>;
        miningLaserCount: number;
    }) {

    const { t } = useTranslation('ship_calc');

    let weaponCount = autoCannons + laserCannons + plasmaCannons + railGuns + miningLaserCount;
    const [weaponCountString, setWeaponCountString] = useState("There are no weapons");
    const [weaponIssue, setWeaponIssue] = useState(false);
    const [Display, setDisplay] = useState(true)

    useEffect(() => { // weapon string
        if (weaponCount === 0) {
            setWeaponCountString(t('weapons_stats.no_weapons'));
        } else if (weaponCount === 1) {
            setWeaponCountString(t('weapons_stats.one_weapon'));
        } else {
            setWeaponCountString(t('weapons_stats.multiple_weapons', {"weaponCount" : weaponCount}));
        }
    }, [t, weaponCount]);

    useEffect(() => { // weapon issue
        if (weaponCount > 30) {
            setWeaponIssue(true);
        } else {
            setWeaponIssue(false);
        }
    }, [weaponCount]);

    useEffect(() => { // weapon calculations
        function weaponIdlePowerConsumption(quantity: number, weapon: weapon): number {
            return quantity * weapon.idle_electricity_consumption;
        }
        function weaponShootingPowerConsumption(quantity: number, weapon: weapon): number {
            return quantity * weapon.idle_electricity_consumption +
                quantity * weapon.electricity_per_shot * weapon.fire_rate_minute / 60;
        }
        function weaponHeatGeneratedWhenShooting(quantity: number, weapon: weapon): number {
            return quantity * weapon.heat_per_shot * weapon.fire_rate_minute / 60
                - quantity * weapon.heat_dissipation;
        }
        let passive = 0;
        passive += weaponIdlePowerConsumption(autoCannons, auto_cannon);
        passive += weaponIdlePowerConsumption(laserCannons, laser_cannon);
        passive += weaponIdlePowerConsumption(plasmaCannons, plasma_cannon);
        passive += weaponIdlePowerConsumption(railGuns, rail_cannon);
        setWeaponPassivePowerConsumption(passive);
        let shooting = 0;
        shooting += weaponShootingPowerConsumption(autoCannons, auto_cannon);
        shooting += weaponShootingPowerConsumption(laserCannons, laser_cannon);
        shooting += weaponShootingPowerConsumption(plasmaCannons, plasma_cannon);
        shooting += weaponShootingPowerConsumption(railGuns, rail_cannon);
        setWeaponShootingPowerConsumption(shooting);
        let heat = 0;
        heat += weaponHeatGeneratedWhenShooting(autoCannons, auto_cannon);
        heat += weaponHeatGeneratedWhenShooting(laserCannons, laser_cannon);
        heat += weaponHeatGeneratedWhenShooting(plasmaCannons, plasma_cannon);
        heat += weaponHeatGeneratedWhenShooting(railGuns, rail_cannon);
        setWeaponHeatGeneratedWhenShooting(heat);
    }, [autoCannons, laserCannons, plasmaCannons, railGuns, miningLaserCount, weaponCount, setWeaponPassivePowerConsumption, setWeaponShootingPowerConsumption, setWeaponHeatGeneratedWhenShooting]);

    const handleDisplay = (e: ChangeEvent<HTMLInputElement>) => {
        setDisplay(e.target.checked)
    }

    return <Card className={"stats-card"}>
        <Card.Header className={"stats-card-header"}>
            <h4 className={"stats-sub-title"}>{t('weapons_stats.title')}</h4>
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
                            <div className={"stats-text"}>
                                <div className={weaponIssue ? "stats-error" : ""}>
                                    {weaponCountString}
                                </div>
                            </div>
                        </Row>
                        {
                            (miningLaserCount > 0 && weaponCount > 30) ?
                                <Row>
                                    <div className={"stats-text"}>
                                        <div className={weaponIssue ? "stats-warning" : ""}>
                                            {t('weapons_stats.mining_laser_weapons')}
                                        </div>
                                    </div>
                                </Row> : null
                        }
                        <Row>
                            <Col className={"stats-text"} xs={8}>
                                {t('weapons_stats.passive_power_consumption')}
                            </Col>
                            <Col className={"stats-text-numbers"} xs={4}>
                                {prettyNumber(weaponPassivePowerConsumption)} {t('elec_per_second')}
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"stats-text"} xs={8}>
                                shooting power consumption
                            </Col>
                            <Col className={"stats-text-numbers"} xs={4}>
                                {prettyNumber(weaponShootingPowerConsumption)} {t('elec_per_second')}
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"stats-text"} xs={8}>
                                heat generated when shooting
                            </Col>
                            <Col className={"stats-text-numbers"} xs={4}>
                                {prettyNumber(weaponHeatGeneratedWhenShooting)} {t('heat_per_second')}
                            </Col>
                        </Row>
                    </Container> : null
            }
        </Card.Body>
    </Card>
}

export default WeaponsStats;
