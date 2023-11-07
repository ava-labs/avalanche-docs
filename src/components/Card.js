import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./HomepageFeatures.module.css";
import Translate from "@docusaurus/Translate";

function Card({ to, header, body, externalIcon = false, image, Icon }) {
  /*
  Both the `header` and `body` expect an object with the following type
  header = {
    label: String, //
  }
  */

  return (
    <div className={clsx("col col--4 ", styles.feature)}>
      <Link className="navbar__link" to={to}>
        <div style={{position: 'relative'}}>
          <img className="card-image" src={image} />
          {Icon && <Icon style={{position: 'absolute', top: 15, left: 15}}/>}
        </div>
        <div>
          <h4 style={{fontSize: 16, lineHeight: '22px', marginTop: '23px'}}>
            {header.label}
            {externalIcon && (
              <svg
                width="13.5"
                height="13.5"
                aria-hidden="true"
                viewBox="0 0 24 24"
                className={styles.iconExternalIcon}
              >
                <path
                  fill="currentColor"
                  d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
                ></path>
              </svg>
            )}
          </h4>
        </div>
        <div>
          <p style={{fontWeight: '400', fontSize: '14px'}}>{body.label}</p>
        </div>
      </Link>
    </div>
  );
}

export default Card;
