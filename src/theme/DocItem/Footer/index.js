import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import {DocItemDivider} from "../../../components/DocItemDivider";

export default function FooterWrapper(props) {
  return (
    <>
      <DocItemDivider />
      <Footer {...props} />
    </>
  );
}
