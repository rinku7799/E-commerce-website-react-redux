

import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="text-center text-white border " style={{ backgroundColor: '#f1f1f1', boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px" }}>

        <div className="container pt-4">

          <section style={{ height: '90px' }} >
            {/* Facebook */}
            <a className="btn btn-link btn-floating btn-lg text-secondary fs-3 " href="https://www.facebook.com/login/" role="button" data-mdb-ripple-color="dark"><FaFacebookF /></a>
            {/* Twitter */}
            <a className="btn btn-link btn-floating btn-lg text-secondary  fs-3 " href="https://twitter.com/" role="button" data-mdb-ripple-color="dark"><FaTwitter /></a>
            {/* Google */}
            <a className="btn btn-link btn-floating btn-lg text-secondary  fs-3 " href="https://www.google.com/" role="button" data-mdb-ripple-color="dark"><FaGoogle /></a>
            {/* Instagram */}
            <a className="btn btn-link btn-floating btn-lg text-secondary  fs-3 " href="https://www.instagram.com/" role="button" data-mdb-ripple-color="dark">< FaInstagram /></a>
            {/* Linkedin */}
            <a className="btn btn-link btn-floating btn-lg text-secondary  fs-3 " href="https://www.linkedin.com/login" role="button" data-mdb-ripple-color="dark">< FaLinkedin /></a>
            {/* Github */}
            <a className="btn btn-link btn-floating btn-lg text-secondary  fs-3 " href="https://github.com/" role="button" data-mdb-ripple-color="dark"><FaGithub /></a>
          </section>
        </div>
      </footer>


    </>
  );
};

export default Footer;

