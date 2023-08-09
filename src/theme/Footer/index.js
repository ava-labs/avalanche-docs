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
          <div className="footer-row">
            <Link
              className="footer-main-list"
              href="https://subnets.avax.network/"
            >
              <h3>Explorer</h3>
            </Link>
          </div>
          <div className="footer-row">
            <Link
              className="footer-main-list"
              href="https://academy.avax.com/?utm_source=avalanche-dev-docs&utm_medium=website&utm_content=footer"
            >
              <h3>Academy</h3>
            </Link>
          </div>
          <div className="footer-row">
            <Link
              className="footer-main-list"
              href="https://support.avax.network/en/"
            >
              <h3>Support</h3>
            </Link>
          </div>
          <div className="footer-row">
            <Link className="footer-main-list" href="https://core.app/en/">
              <h3>Wallet</h3>
            </Link>
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
          <div className="row" style={{ marginTop: "10px" }}>
            <div class="col" style={{}}>
              <h4 className="footer-heading">Developers</h4>
              <a href="https://forum.avax.network/">
                <div className="footer-list">Forum</div>
              </a>
              <a href="https://hackenproof.com/avalanche/avalanche-protocol">
                <div className="footer-list">Bug Bounty</div>
              </a>
              <a href="https://www.avalabs.org/whitepapers">
                <div className="footer-list">Whitepapers</div>
              </a>
            </div>
            <div class="col">
              <h4 className="footer-heading">Community</h4>
              <a href="https://medium.com/avalancheavax">
                <div className="footer-list">Medium</div>
              </a>
              <a href="https://docs.avax.network/community/tutorials-contest">
                <div className="footer-list">Tutorials Contest</div>
              </a>
              <a href="https://shop.avax.network/">
                <div className="footer-list">Merch</div>
              </a>
            </div>
            <div class="col">
              <h4 className="footer-heading">More</h4>
              <a href="https://avacloud.io/">
                <div className="footer-list">Enterprise Solutions</div>
              </a>
              <a href="https://github.com/ava-labs/audits">
                <div className="footer-list">Audits</div>
              </a>
              <a href="https://www.avax.network/terms-of-use">
                <div className="footer-list">Terms of Use</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom text--center">
        <div className="footer__copyright">
          Copyright © {new Date().getFullYear()}{" "}
          <a href="https://avax.network" className="hover:text-yellow">
            Ava Labs, Inc.
          </a>{" "}
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
