import { FaFacebook, FaInstagram } from "react-icons/fa";
import {
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdSmartphone,
} from "react-icons/md";
import classes from "./ContactDetail.module.css";
export const contactConfiguration = [
  {
    render: (
      <p>
        <span>
          <MdOutlineLocationOn className={classes.icons} />
        </span>
        Ptaszkowa 20, 33-333 PTASZKOWA,
      </p>
    ),
  },
  {
    render: (
      <div>
        <MdSmartphone className={classes.icons} />
        <a href="tel:123-456-789">123-456-789</a>
      </div>
    ),
  },
  {
    render: (
      <div>
        <MdOutlineEmail className={classes.icons} />
        <a href="mailto:kontakt@aroundherbeauty.com.pl">
          kontakt@aroundherbeauty.com
        </a>
      </div>
    ),
  },
  {
    text: " Znajdziesz nas również tutaj!",
  },
  {
    renderActions: (
      <div className={classes.contactIconsContainer}>
        <a href="https://www.facebook.com/aroundherbeauty/">
          <FaFacebook className={classes.icons} />
        </a>
        <a href="https://www.instagram.com/aroundherbeauty/">
          <FaInstagram className={classes.icons} />
        </a>
      </div>
    ),
  },
];
