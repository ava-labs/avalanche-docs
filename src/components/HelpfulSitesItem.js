import styles from "../pages/index.module.css";
import React from "react";
import Link from "@docusaurus/core/lib/client/exports/Link";
import {translate} from "@docusaurus/core/lib/client/exports/Translate";

export const HelpfulSiteItem = ({ Svg, link, message }) => {
   return(
    <Link className={styles.usefulLinkContainer} href={link}>
        <div className={styles.usefulLinkWrapper}>
            <Svg className={styles.usefulIcon} /> <span className={styles.usefulLinkText}>{translate({message})}</span>
        </div>
    </Link>
   )
}