import React from "react";

import classes from "./FooterAddress.module.css";
function FooterAddress() {
  return (
    <div className={classes.addressCol}>
      <p> Justyna Góra </p>
      <address > Ptaszkowa 20 </address>
      <address>33-333 Ptaszkowa</address>
      <a href="tel:123-456-789">Nr telefonu :123-456-789</a>
      <br />
      <a href="mailto:kontakt@aroundherbeauty.com.pl">
        kontakt@aroundherbeauty.com
      </a>
    </div>
  );
}

export default FooterAddress;
