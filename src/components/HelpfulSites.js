import styles from "../pages/index.module.css";
import clsx from "clsx";
import {HelpfulSiteItem} from "./HelpfulSitesItem";
import {FaCompass, FaGraduationCap} from "react-icons/fa";
import {Support} from "../../static/Support";
import {Owl} from "../../static/Owl";
import React from "react";
import {translate} from "@docusaurus/core/lib/client/exports/Translate";

export const HelpfulSites = () => {
    return (
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
                        <HelpfulSiteItem link='https://core.app/' message='Wallet' Svg={Owl} />
                    </div>
                </div>
            </div>
        </section>
    )
}