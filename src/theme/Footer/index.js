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
import {
  BsYoutube,
  BsGithub,
  BsTwitter,
  BsDiscord,
  BsTelegram,
  BsFacebook,
  BsLinkedin,
  BsReddit,
} from "react-icons/bs";

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
      <div className="container container--fluid"></div>
      <div class="row">
        <div class="col col--4">
          <div class="col-demo" style={{ backgroundColor: "lightpink" }}>
            col--3
          </div>
        </div>
        <div class="col col--7 col--offset-1">
          <div className="footer-row">
            <a href="https://t.me/+KDajA4iToKY2ZjBk">
              <BsTelegram className="footer-social"></BsTelegram>
            </a>
            <a href="https://chat.avax.network/">
              <BsDiscord className="footer-social"></BsDiscord>
            </a>
            <a href="https://github.com/ava-labs">
              <BsGithub className="footer-social"></BsGithub>
            </a>
            <a href="https://twitter.com/AvaxDevelopers">
              <BsTwitter className="footer-social"></BsTwitter>
            </a>
            <a href="https://www.reddit.com/r/Avax/">
              <BsReddit className="footer-social"></BsReddit>
            </a>
            <a href="https://www.youtube.com/@Avalancheavax">
              <BsYoutube className="footer-social"></BsYoutube>
            </a>
            <a href="https://www.linkedin.com/company/avalancheavax">
              <BsLinkedin className="footer-social"></BsLinkedin>
            </a>
            <a href="https://www.facebook.com/avalancheavax">
              <BsFacebook className="footer-social"></BsFacebook>
            </a>
          </div>
          <div className="row" style={{ backgroundColor: "lightpink" }}>
            <div class="col">
              <div class="col-demo">col</div>
            </div>
            <div class="col">
              <div class="col-demo">col</div>
            </div>
            <div class="col">
              <div class="col-demo">col</div>
            </div>
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
