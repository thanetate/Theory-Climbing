//Footer Component
export default function Footer() {
  return (
    <div className="footer-content">
      <div className="footer-main">
        <h2>Website created by Thane Tate</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          officiis expedita doloremque dolorem saepe doloribus iure explicabo
          deserunt at, velit ut? Vel ratione inventore, soluta facilis explicabo
          maxime enim odio! Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Aliquid perferendis, numquam fugit voluptatum consectetur illo
          sed rem amet, labore cumque consequatur iure laborum odio error
          perspiciatis saepe et, nesciunt cupiditate?
        </p>
        {/*Maybe make these links better*/}
        <div className="social-links">
          <a href="#">
            <img src="./Images/new-profile.png" alt="" />
          </a>
          <a href="#">
            <img src="./Images/new-profile.png" alt="" />
          </a>
          <a href="#">
            <img src="./Images/new-profile.png" alt="" />
          </a>
          <a href="#">
            <img src="./Images/new-profile.png" alt="" />
          </a>
        </div>
      </div>
      <div className="links">
        <p>Information</p>
        <a href="" className="link">
          Our Company
        </a>
        <a href="" className="link">
          About Us
        </a>
        <a href="" className="link">
          Blog
        </a>
      </div>
      <div className="links">
        <p>Helpful Links</p>
        <a href="" className="link">
          Services
        </a>
        <a href="" className="link">
          Support
        </a>
        <a href="" className="link">
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
