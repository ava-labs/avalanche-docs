import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import Card from "../components/Card";
import {translate} from "@docusaurus/Translate";
import Link from "@docusaurus/Link";

import banner from "../../static/img/homepage_banner.png";
import academy from "../../static/img/academy.png";
import visitAcademy from "../../static/img/visitAcademy.png";
import lines from "../../static/img/line_pattern.png";

import quick_start1 from "../../static/img/quick-start/quick_start1.png";
import quick_start2 from "../../static/img/quick-start/quick_start2.png";
import quick_start3 from "../../static/img/quick-start/quick_start3.png";
import quick_start4 from "../../static/img/quick-start/quick_start4.png";
import quick_start5 from "../../static/img/quick-start/quick_start5.png";
import quick_start6 from "../../static/img/quick-start/quick_start6.png";

import course1 from "../../static/img/quick-start/course1.png";
import course2 from "../../static/img/quick-start/course2.png";
import course3 from "../../static/img/quick-start/course3.png";

import Icon from "../../static/img/quick-start/start_icon1.svg";
import Icon2 from "../../static/img/quick-start/start_icon2.svg";
import Icon3 from "../../static/img/quick-start/start_icon3.svg";
import Icon4 from "../../static/img/quick-start/start_icon4.svg";
import Icon5 from "../../static/img/quick-start/start_icon5.svg";
import Icon6 from "../../static/img/quick-start/start_icon6.svg";

import {FaGraduationCap, FaCompass} from "react-icons/fa";

import clsx from "clsx";
import {Support} from "../../static/Support";
import {Owl} from "../../static/Owl";
import {HelpfulSiteItem} from "../components/HelpfulSitesItem";

function Home() {
    const context = useDocusaurusContext();
    const {siteConfig = {}} = context;

    return (
        <Layout title="Homepage" description="Avalanche Dev Docs">
            <main className={styles.main}>
                <div className="container">
                    <div className={clsx("row welcome", styles.welcome)}>
                        <div className={clsx("col col--6", styles.welcomeLeft)}>
                            <div className="row">
                                <img src={lines} className={styles.lineImg}/>
                                <h1 className={styles.headerText}>
                                    {translate({message: "Welcome to Avalanche Dev Docs"})}
                                </h1>
                            </div>
                            <h3>Dream Big, Build Even Bigger</h3>
                        </div>
                        <div className="col col--6">
                            <img src={banner}/>
                        </div>
                    </div>
                </div>
                <br/>
                <section className={styles.features}>
                    <div className="container">
                        <h1
                            align="left"
                            title="tagline"
                            style={{
                                fontWeight: "700",
                                marginBottom: "0px",
                                fontSize: "24px",
                            }}
                        >
                            {translate({message: "Quick Start Guide"})}
                        </h1>
                        <div className="row cards__container">
                            <Card
                                Icon={Icon}
                                to="/build/subnet/hello-subnet"
                                image={quick_start1}
                                header={{
                                    label: translate({message: "Launch Your First Subnet"}),
                                }}
                                body={{
                                    label: translate({
                                        message:
                                            "Start your Subnet developement journey by creating a subnet in under five minutes.",
                                    }),
                                }}
                            />

                            <Card
                                to="intro"
                                Icon={Icon2}
                                image={quick_start2}
                                header={{
                                    label: translate({message: "Learn about Avalanche"}),
                                }}
                                body={{
                                    label: translate({
                                        message:
                                            "Discover how Subnets and Avalanche Consensus are revolutionizing Web3",
                                    }),
                                }}
                            />

                            <Card
                                to="/nodes/validate/add-a-validator"
                                Icon={Icon3}
                                image={quick_start3}
                                header={{
                                    label: translate({message: "Become a Validator"}),
                                }}
                                body={{
                                    label: translate({
                                        message:
                                            "Join Avalanche’s Proof-of-Stake protocol to help secure the network and earn rewards",
                                    }),
                                }}
                            />

                            <Card
                                to="reference"
                                Icon={Icon4}
                                image={quick_start4}
                                header={{
                                    label: translate({message: "View Avalanche APIs"}),
                                }}
                                body={{
                                    label: translate({
                                        message:
                                            "Start your Subnet developement journey by creating a subnet in under five minutes.",
                                    }),
                                }}
                            />

                            <Card
                                to="/build/dapp/launch-dapp"
                                Icon={Icon5}
                                image={quick_start5}
                                header={{
                                    label: translate({
                                        message: "Launch Your Dapp on Avalanche",
                                    }),
                                }}
                                body={{
                                    label: translate({
                                        message:
                                            "Discover how Subnets and Avalanche Consensus are revolutionizing Web3",
                                    }),
                                }}
                            />

                            <Card
                                to="https://github.com/ava-labs/hypersdk"
                                image={quick_start6}
                                Icon={Icon6}
                                header={{
                                    label: translate({message: "HyperSDK"}),
                                }}
                                body={{
                                    label: translate({
                                        message:
                                            "Join Avalanche’s Proof-of-Stake protocol to help secure the network and earn rewards",
                                    }),
                                }}
                            />
                        </div>
                    </div>
                </section>
            </main>

            <main className={styles.main}>
                <br/>
                <section className={styles.featuresAcademy}>
                    <div className="container">
                        <div
                            className={clsx("row")}
                            style={{justifyContent: "space-between", marginBottom: 120}}
                        >
                            <div className="col col--6">
                                <img src={academy}/>
                            </div>
                            <div className={clsx("col col--5")}>
                                <h1 className={styles.academyText}>
                                    {translate({
                                        message: "Continue Learning With Avalanche Academy",
                                    })}
                                </h1>
                                <h3>Earn Your Certificate Today!</h3>
                                <p>
                                    A quick blurb about what this content pertains to. Make it
                                    enticing/interesting to read, but not overwhelming to the
                                    user. We all have things to do here.{" "}
                                </p>
                                <div className={styles.readMoreBtn}>Read More</div>
                            </div>
                        </div>
                        <h1
                            style={{
                                fontWeight: "700",
                                marginBottom: "0px",
                                fontSize: "24px",
                            }}
                        >
                            {translate({message: "Featured Academy Courses"})}
                        </h1>
                        <div className="row cards__container">
                            <Card
                                to="https://academy.avax.network/course/avalanche-fundamentals?utm_source=avalanche-dev-docs&utm_medium=website&utm_content=learn-avalanche"
                                header={{
                                    label: translate({message: "Avalanche Fundamentals"}),
                                }}
                                image={course1}
                                body={{
                                    label: translate({
                                        message:
                                            "Start your Subnet developement journey by creating a subnet in under five minutes.",
                                    }),
                                }}
                            />

                            <Card
                                to="https://academy.avax.network/course/subnet-architecture?utm_source=avalanche-dev-docs&utm_medium=website&utm_content=learn-avalanche"
                                header={{
                                    label: translate({message: "Hyper SDK"}),
                                }}
                                image={course2}
                                body={{
                                    label: translate({
                                        message:
                                            "Start your Subnet developement journey by creating a subnet in under five minutes.",
                                    }),
                                }}
                            />

                            <Card
                                to="https://academy.avax.network/course/customize-evm?utm_source=avalanche-dev-docs&utm_medium=website&utm_content=learn-avalanche"
                                header={{
                                    label: translate({
                                        message: "C-Chain Solidity Developement",
                                    }),
                                }}
                                image={course3}
                                body={{
                                    label: translate({
                                        message:
                                            "Start your Subnet developement journey by creating a subnet in under five minutes.",
                                    }),
                                }}
                            />
                        </div>
                    </div>
                </section>
                <section className={styles.visitAcademy}>
                    <div className="container">
                        <div
                            className={clsx("row")}
                            style={{justifyContent: "space-between"}}
                        >
                            <div className={clsx("col col--5")}>
                                <h1 className={styles.academyText}>
                                    {translate({
                                        message: "Top Developers Choose Avalanche",
                                    })}
                                </h1>
                                <h3>
                                    {translate({message: "Learn Why Avalanche Is The Best "})}!
                                </h3>
                                <p>
                                    A quick blurb about what this content pertains to. Make it
                                    enticing/interesting to read, but not overwhelming to the
                                    user. We all have things to do here.
                                </p>
                                <div className={styles.readMoreBtn}>Visit The Academy</div>
                            </div>
                            <div className="col col--6">
                                <img src={visitAcademy} className={styles.visitImg}/>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <section className={styles.usefulLinks}>
                <div className="container">
                    <div
                        className={clsx("row", styles.usefulContainerGap)}
                    >
                        <h3 className={styles.usefulLinksTitle}>
                            {translate({message: "Helpful Sites"})}
                        </h3>
                        <div className={styles.linksContainer}>
                            <HelpfulSiteItem link='https://subnets.avax.network/' message='Explorer' Svg={FaCompass} />
                            <HelpfulSiteItem link='https://academy.avax.com/?utm_source=avalanche-dev-docs&utm_medium=website&utm_content=footer' message='Academy' Svg={FaGraduationCap} />
                            <HelpfulSiteItem link='https://support.avax.network/en/' message='Support' Svg={Support} />
                            <HelpfulSiteItem link='https://support.avax.network/en/' message='Wallet' Svg={Owl} />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default Home;
