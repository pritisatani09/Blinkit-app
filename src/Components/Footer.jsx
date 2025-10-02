import './Footer.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiAtBold } from 'react-icons/pi';
import { Link } from 'react-router';


const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="mb-5">
                    <Col md={6}>
                        <Row>
                            <Col md={12}>
                                <h5 className='text-start'>Useful Links</h5>
                            </Col>
                            <Col md={4} >
                                <ul className="list-unstyled">
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">Privacy</a></li>
                                    <li><a href="#">Terms</a></li>
                                    <li><a href="#">FAQs</a></li>
                                    <li><a href="#">Security</a></li>
                                    <li><a href="#">Contact</a></li>
                                </ul>
                            </Col>
                            <Col md={4}>
                                <ul className="list-unstyled">
                                    <li><a href="#">Partner</a></li>
                                    <li><a href="#">Franchise</a></li>
                                    <li><a href="#">Seller</a></li>
                                    <li><a href="#">Warehouse</a></li>
                                    <li><a href="#">Deliver</a></li>
                                    <li><a href="#">Resources</a></li>
                                </ul>
                            </Col>
                            <Col md={4}>
                                <ul className="list-unstyled">
                                    <li><a href="#">Recipes</a></li>
                                    <li><a href="#">Bistro</a></li>
                                </ul>
                            </Col>
                        </Row>
                    </Col>

                    <Col md={6}>
                        <Row>
                            <Col md={12}>
                                <h5 className="text-sm-start text-center">
                                    Categories <a href="#" className="text-success ms-2">see all</a>
                                </h5>
                            </Col>
                            <Col md={4}>
                                <ul className="list-unstyled">
                                    <li><a href="#">Vegetables & Fruits</a></li>
                                    <li><a href="#">Cold Drinks & Juices</a></li>
                                    <li><a href="#">Bakery & Biscuits</a></li>
                                    <li><a href="#">Dry Fruits, Masala & Oil</a></li>
                                    <li><a href="#">Paan Corner</a></li>
                                    <li><a href="#">Pharma & Wellness</a></li>
                                    <li><a href="#">Ice Creams & Frozen Desserts</a></li>
                                    <li><a href="#">Beauty & Cosmetics</a></li>
                                    <li><a href="#">Stationery Needs</a></li>
                                    <li><a href="#">Print Store</a></li>
                                </ul>
                            </Col>
                            <Col md={4}>
                                <ul className="list-unstyled">
                                    <li><a href="#">Dairy & Breakfast</a></li>
                                    <li><a href="#">Instant & Frozen Food</a></li>
                                    <li><a href="#">Sweet Tooth</a></li>
                                    <li><a href="#">Sauces & Spreads</a></li>
                                    <li><a href="#">Organic & Premium</a></li>
                                    <li><a href="#">Cleaning Essentials</a></li>
                                    <li><a href="#">Personal Care</a></li>
                                    <li><a href="#">Fashion & Accessories</a></li>
                                    <li><a href="#">Books</a></li>
                                    <li><a href="#">E-Gift Cards</a></li>
                                </ul>
                            </Col>
                            <Col md={4}>
                                <ul className="list-unstyled">
                                    <li><a href="#">Munchies</a></li>
                                    <li><a href="#">Tea, Coffee & Health Drinks</a></li>
                                    <li><a href="#">Atta, Rice & Dal</a></li>
                                    <li><a href="#">Chicken, Meat & Fish</a></li>
                                    <li><a href="#">Baby Care</a></li>
                                    <li><a href="#">Home & Office</a></li>
                                    <li><a href="#">Pet Care</a></li>
                                    <li><a href="#">Electronics & Electricals</a></li>
                                    <li><a href="#">Toys & Games</a></li>
                                    <li><a href="#">Rakhi Gifts</a></li>
                                </ul>
                            </Col>
                        </Row>
                    </Col>
                </Row>


                <Row className="align-items-center text-center bg-light text-md-start py-3">
                    <Col md={4}>
                        <p className="text-secondary mb-0">© Blink Commerce Private Limited, 2016-2025</p>
                    </Col>
                    <Col md={4} className="text-center my-2 my-md-0">
                        <span className="fw-bold">Download App</span>
                        <div className="d-inline-block ms-3">
                            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" height="35" className="me-2" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" height="35" />
                        </div>
                    </Col>
                    <Col md={4}>
                        <Link><FaFacebookF className="social-icon" /></Link>
                        <Link><FaXTwitter className="social-icon" /></Link>
                        <Link><FaInstagram className="social-icon" /></Link>
                        <Link><FaLinkedinIn className="social-icon" /></Link>
                        <Link><PiAtBold className="social-icon" /></Link>


                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <p className="text-secondary text-md-start mb-0 fs-6">
                            “Blinkit” is owned & managed by "Blink Commerce Private Limited" and is not related to “GROFFR.COM” which is a real estate services business operated by “Redstone Consultancy Services Private Limited”.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;