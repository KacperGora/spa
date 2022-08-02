import React from "react";

import classes from "./FooterAddress.module.css";
function FooterAddress() {
  return (
    <div className={classes.addressCol}>
      <p>
        Justyna Góra <br />
        Ptaszkowa 20 <br />
        33-333 Ptaszkowa
      </p>
      <p>
        <a href="tel:123-456-789">Nr telefonu :123-456-789</a>
      </p>

      <a href="mailto:kontakt@aroundherbeauty.com.pl">
        kontakt@aroundherbeauty.com
      </a>
    </div>
  );
}

export default FooterAddress;
