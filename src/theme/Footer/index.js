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
import { translate } from "@docusaurus/Translate";
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
import { FaGraduationCap } from "react-icons/fa";

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
    <footer className="footer">
      <div className="container">
        <div class="row footer-container">
          <div className="col col--8">
            <div className="row" style={{ marginTop: "10px" }}>
              <div class="col" style={{}}>
                <h4 className="footer-heading">
                  {translate({ message: "Developers" })}
                </h4>
                <a href={translate({ message: "https://forum.avax.network/" })}>
                  <div className="footer-list">
                    {translate({ message: "Forum" })}
                  </div>
                </a>
                <a
                  href={translate({
                    message: "https://stats.avax.network/dashboard/overview/",
                  })}
                >
                  <div className="footer-list">
                    {translate({ message: "Network Stats" })}
                  </div>
                </a>
                <a
                  href={translate({
                    message:
                      "https://www.youtube.com/playlist?list=PLRHl-ulWK4-GTJhSLF9omG2x_qn7E1O7n",
                  })}
                >
                  <div className="footer-list">
                    {translate({ message: "Video Tutorials" })}
                  </div>
                </a>
                <a
                  href={translate({
                    message:
                      "https://hackenproof.com/avalanche/avalanche-protocol",
                  })}
                >
                  <div className="footer-list">
                    {translate({ message: "Bug Bounty" })}
                  </div>
                </a>
              </div>
              <div class="col">
                <h4 className="footer-heading">
                  {translate({ message: "Community" })}
                </h4>
                <a href="https://medium.com/@avaxdevelopers">
                  <div className="footer-list">Medium</div>
                </a>
                <a href="https://www.avax.network/blog">
                  <div className="footer-list">Blog</div>
                </a>
                <a href="https://shop.avax.network/">
                  <div className="footer-list">Merch</div>
                </a>
                <a href="/deprecated/tutorials-contest">
                  <div className="footer-list">Tutorials Contest</div>
                </a>
              </div>
              <div class="col">
                <h4 className="footer-heading">
                  {translate({ message: "More" })}
                </h4>
                <a href="https://www.avalabs.org/whitepapers">
                  <div className="footer-list">Whitepapers</div>
                </a>
                <a href="https://avacloud.io/">
                  <div className="footer-list">Enterprise Solutions</div>
                </a>
                <a href="https://github.com/ava-labs/audits">
                  <div className="footer-list">Audits</div>
                </a>
                <a href="https://www.avax.network/legal">
                  <div className="footer-list">Legal</div>
                </a>
              </div>
            </div>
          </div>

          <div class="col col--4">
            <div className="footer-row" style={{marginBottom: '16px'}}>
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
            </div>
            <div className="footer-row">
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
            <div className="footer__bottom text--center">
              <div
                className="footer__copyright"
                style={{ fontSize: "small" }}
              >
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.avax.network/terms-of-use"
                  className="hover"
                >
                  Ava Labs, Inc.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
