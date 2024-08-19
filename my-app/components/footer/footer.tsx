//Footer Component
import Image from "next/image"; // Import Image component

export default function Footer() {
  return (
    <div className="footer-content">
      <div className="footer-main">
        <div className="footer-top">
          <h2>Website created by Thane Tate</h2>
          <p>
            This website was created by Thane Tate, a student studying Computer
            Science at the Universtiy of North Texas and a devoted climber. If
            you have any questions or concerns, please feel free to reach out to
            me at my email linked below in the Support link or DM us on
            Instagram.
          </p>
        </div>
        <p className="extra"> </p>
        {/*Maybe make these links better*/}

        <div className="social-links">
          <a href="https://www.instagram.com/theory_climbing/">
            <Image
              src="/icons/instagram.png"
              alt="Instagram"
              width={32} // Adjust based on your image dimensions
              height={32} // Adjust based on your image dimensions
            />
          </a>
          <a href="https://www.linkedin.com/in/thane-tate-940302227/">
            <Image
              src="/icons/linkedin.png"
              alt="LinkedIn"
              width={32} // Adjust based on your image dimensions
              height={32} // Adjust based on your image dimensions
            />
          </a>
          <a href="https://github.com/thanetate">
            <Image
              src="/icons/github.png"
              alt="GitHub"
              width={32} // Adjust based on your image dimensions
              height={32} // Adjust based on your image dimensions
            />
          </a>
        </div>
      </div>
      <div className="links">
        <p>Information</p>
        <a href="https://www.instagram.com/theory_climbing/" className="link">
          Our Company
        </a>
        <a href="https://www.instagram.com/theory_climbing/" className="link">
          About Us
        </a>
        <a href="https://www.instagram.com/theory_climbing/" className="link">
          Blog
        </a>
      </div>
      <div className="links">
        <p>Helpful Links</p>
        <a href="mailto:thaneallantate@gmail.com" className="link">
          Services
        </a>
        <a href="mailto:thaneallantate@gmail.com" className="link">
          Support
        </a>
        <a href="mailto:thaneallantate@gmail.com" className="link">
          Terms &amp; Conditions
        </a>
      </div>
      <div className="links">
        <p>Navigation</p>
        <a href="" className="link">
          Home
        </a>
        <a href="" className="link">
          Products
        </a>
        <a href="" className="link">
          About
        </a>
        <a href="" className="link">
          Cart
        </a>
      </div>
      <div className="copyright-container">
        <p className="copyright">
          Copyright © 2024 - All rights reserved by Theory Climbing
        </p>
      </div>
    </div>
  );
}
