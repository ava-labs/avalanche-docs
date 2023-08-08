/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useThemeConfig } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";

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
          <div style={{ backgroundColor: "lightblue", height: "200px" }}></div>
          <div style={{ backgroundColor: "lightpink", height: "200px" }}>
            2fr
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
