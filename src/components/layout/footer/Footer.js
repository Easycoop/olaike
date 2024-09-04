import "./Footer.css";
import logo__white from "../../../../assets/icons/logo__white.png";
import facebook from "../../../../assets/icons/facebook.png";
import instagram from "../../../../assets/icons/instagram.png";
import twitter from "../../../../assets/icons/twitter.png";
import tiktok from "../../../../assets/icons/tiktok.png";
import apple from "../../../../assets/icons/apple.png";
import android from "../../../../assets/icons/android.png";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__start">
        <img src={logo__white} alt="" />
        <div className="footer__start__socials">
          <img src={facebook} alt="" />
          <img src={instagram} alt="" />
          <img src={twitter} alt="" />
          <img src={tiktok} alt="" />
        </div>
        <div className="footer__start__app">
          <h1>GET THE APP</h1>
          <span>
            <img alt="" src={android} />
            <img alt="" src={apple} />
          </span>
        </div>
      </div>
      <div className="footer__end">
        <div className="footer__end__block">
          <h1>About</h1>
          <p>About us</p>
          <p>Terms of use</p>
          <p>Privacy policy</p>
        </div>
        <div className="footer__end__block">
          <h1>Contact us</h1>
          <p>Help and suggestion</p>
          <p>Businesses</p>
        </div>
        <div className="footer__end__block">
          <h1>Resources</h1>
          <p>Tags</p>
          <p>Download App</p>
          <p>Be an Author</p>
          <p>Help Center</p>
          <p>Privacy policy</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
