/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import Link from "@docusaurus/Link";
import { useThemeConfig } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";

function Footer() {
  const { footer } = useThemeConfig();
  const { copyright, links = [], logo = {} } = footer || {};
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };

  if (!footer) {
    return null;
  }

  return (
    <footer className="footer footer--dark">
      <div className="container container-fluid">
        <div className="footer-grid">
          <div className="footer-col"></div>
          <div className="footer-col">
            <div
              className="row"
              style={{ backgroundColor: "lightpink", height: "100px" }}
            >
              <ul className="list-reset flex flex-wrap -mx-20">
                <a
                  className="header-twitter-link"
                  href="https://twitter.com/AvaxDevelopers"
                ></a>
              </ul>
            </div>
            <div
              className="row"
              style={{ backgroundColor: "lightpink", height: "100px" }}
            ></div>
          </div>
        </div>
      </div>
      <div className="footer__bottom text--center">
        <div className="footer__copyright">
          Copyright © {new Date().getFullYear()}{" "}
          <a href="https://avax.network" className="hover:text-yellow">
            Ava Labs, Inc.{" "}
          </a>
          <span className="mx-10">|</span> All rights reserved
        </div>
        <div className="footer-logo-container">
          <div></div>
          <img class="menu-item" src="/img/Avalanche_Horizontal_Red.svg"></img>
          <div></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
