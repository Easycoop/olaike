import Button from "../../../components/ui/button/Button";
import donation from "../../../assets/images/main/donate.jpg";
import "./donation.css";

function Donation() {
  return (
    <div className="donation">
      <img src={donation} alt="donation" />
      <p>
        Join us in empowering our community! Your generous donations help
        sustain and expand our cooperative society's efforts to provide
        financial support, educational programs, and community development
        initiatives. With your contribution, we can continue to uplift members
        through low-interest loans, skill-building opportunities, and resources
        that promote self-reliance.
        {/* <br />
        <br /> */}
        Every donation, big or small, makes a difference. Together, we can
        create a stronger, more resilient society where everyone thrives.
        <br />
        <br />
        Donate today and be a part of the change!
      </p>
      <Button className="modal__withdraw1__button">Donate now!</Button>
    </div>
  );
}

export default Donation;
