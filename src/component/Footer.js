import React from "react";

export default function Footer() {
  return (
    <div>
      <div className="footer_div">
        <div>
          <div className="inner">
            <div className="column1">
              <h4 className="heading">About Us</h4>
              <p className="text">
                We are making esports information more accessible to the lovers
                of esports by providing them with latest updates about
                tournaments, live matches, new gaming gear (tech), and updates
                form famous YT content creators. Our goal is to make the pain to
                find things go away by providing them into single platform{" "}
                <br />
                <br />
              </p>
            </div>
            <div className="column2">
              <h4 className="heading">Our Departments</h4>
              <h4 className="department">Management</h4>
              <h4 className="mails">management@afterplay.xyz</h4>
            </div>
            <div className="column3">
              <h4 className="heading">Useful Links</h4>
              <h4 className="links">►&nbsp;&nbsp;Home</h4>
            </div>
          </div>
          <p className="copyright_name">
            © 2021 AFTERPLAY
            <br />
          </p>
        </div>
      </div>
    </div>
  );
}
