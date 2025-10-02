// import { Container, Row, Col, Form, InputGroup, Navbar } from "react-bootstrap";
// import logo from "../assets/logo.png";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { IoSearch, IoCloseCircle } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "./Header.css";

// const Header = () => {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (search.trim() !== "") {
//       navigate(`/?search=${encodeURIComponent(search.trim())}`);
//     }
//   };

//   const handleClear = () => {
//     setSearch("");
//     navigate("/");
//   };

//   return (
//     <header className="custom-header border-bottom">
//       <Navbar className="w-100" expand="md" style={{ background: "transparent" }}>
//         <Container fluid>
//           <Row className="align-items-center w-100">
//             <Col md={4} className="d-flex align-items-center">
//               <Link to="/">
//                 <img src={logo} alt="Blinkit Logo" className="logo-img" />
//               </Link>
//               <div className="vertical-line" />
//               <div className="delivery-location">
//                 <div className="delivery-text">
//                   <span className="delivery-bold">
//                     Delivery in <strong className="fw-bold">11</strong>
//                   </span>
//                   <span className="delivery-mins fw-bold"> minutes</span>
//                 </div>
//                 <div className="location-text">
//                   Surat, Gujarat, India <IoMdArrowDropdown className="fs-4 mb-1" />
//                 </div>
//               </div>
//             </Col>

//             <Col md={5}>
//               <form onSubmit={handleSearch}>
//                 <InputGroup className="search-group" style={{ background: "#f8f8f8" }}>
//                   <InputGroup.Text
//                     className="bg-transparent border-0"
//                     onClick={handleSearch}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <IoSearch className="fs-5 search" />
//                   </InputGroup.Text>
//                   <Form.Control
//                     type="text"
//                     placeholder="Search by title, price or desc"
//                     className="border-0 ps-0 search-input"
//                     style={{ background: "#f8f8f8" }}
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                   />
//                   <InputGroup.Text
//                     className="bg-transparent border-0"
//                     onClick={handleClear}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <IoCloseCircle className="fs-5 text-secondary clear" />
//                   </InputGroup.Text>
//                 </InputGroup>
//               </form>
//             </Col>

//             <Col md={3} className="d-flex justify-content-end align-items-center">
//               <Link to="/profile" className="login-text">
//                 Login
//               </Link>
//               <Link to="/add-product" className="add-products-btn">
//                 Add Product
//               </Link>
//             </Col>
//           </Row>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Header;


import { Container, Row, Col, Navbar, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutAsync } from "../Services/Actions/userAction";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  const handleLogOut = () => {
    dispatch(logOutAsync());
  };

  return (
    <header className="custom-header border-bottom">
      <Navbar className="w-100" expand="md" style={{ background: "transparent" }}>
        <Container fluid>
          <Row className="align-items-center w-100">
            {/* Left Section: Logo + Location */}
            <Col md={6} className="d-flex align-items-center">
              <Link to="/">
                <img src={logo} alt="Blinkit Logo" className="logo-img" />
              </Link>
              <div className="vertical-line" />
              <div className="delivery-location">
                <div className="delivery-text">
                  <span className="delivery-bold">
                    Delivery in <strong className="fw-bold">11</strong>
                  </span>
                  <span className="delivery-mins fw-bold"> minutes</span>
                </div>
                <div className="location-text">
                  Surat, Gujarat, India <IoMdArrowDropdown className="fs-4 mb-1" />
                </div>
              </div>
            </Col>

            {/* Right Section: Auth + Add Product */}
<Col md={6} className="d-flex justify-content-end align-items-center gap-3">
  {user ? (
    <div className="auth-section">
      <span className="user-email">{user.email}</span>
      <Button className="logout-btn" size="sm" onClick={handleLogOut}>
        LogOut
      </Button>
    </div>
  ) : (
    <Link className="signin-btn" to="/signIn">
      SignIn
    </Link>
  )}
  <Link to="/add-product" className="add-products-btn">
    Add Product
  </Link>
</Col>

          </Row>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
