import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductAsync, getAllProductAsync } from "../Services/Actions/productAction";
import { Button, Container, Row, Col, Spinner, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { IoSearch, IoCloseCircle } from "react-icons/io5";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { products, loading: isLoading } = useSelector((state) => state.productReducer);
  const { user } = useSelector((state) => state.userReducer);

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // 6 cards per page

  // Load products
  useEffect(() => {
    dispatch(getAllProductAsync());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(products);
  }, [products]);

  const handleEdit = (id) => {
    if (!user) return navigate("/signIn");
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    if (!user) return navigate("/signIn");
    dispatch(deleteProductAsync(id));
  };

  const handleView = (id) => navigate(`/product/${id}`);

  // SEARCH
  const handleSearch = () => {
    const q = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const desc = product.desc?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";
      const price = String(product.price || "");

      return (
        name.includes(q) ||
        desc.includes(q) ||
        category.includes(q) ||
        price.includes(q)
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearch("");
    setFilteredData(products);
    setCurrentPage(1);
  };

  const handleClearSort = () => setSortOption("");

  // SORT
  let sortedProducts = [...filteredData];
  if (sortOption === "priceLowHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "nameAZ") {
    sortedProducts.sort((a, b) =>
      (a.name || "").trim().toLowerCase().localeCompare((b.name || "").trim().toLowerCase())
    );
  } else if (sortOption === "nameZA") {
    sortedProducts.sort((a, b) =>
      (b.name || "").trim().toLowerCase().localeCompare((a.name || "").trim().toLowerCase())
    );
  }

  // PAGINATION
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);
  const changePage = (pageNum) => setCurrentPage(pageNum);

  return (
    <Container className="my-4 page-wrapper">
      {/* Header */}
      <div className="list-header">
        <h2 className="page-title text-center">PRODUCT LISTING</h2>

        <Row className="w-100 g-3 align-items-stretch">
          {/* SEARCH */}
          <Col xs={12} md={6}>
            <Form
              className="ps-search"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <InputGroup className="ps-search-group">
                <button type="button" className="ps-search-icon" onClick={handleSearch}>
                  <IoSearch className="fs-5" />
                </button>
                <Form.Control
                  type="text"
                  placeholder="Search by name, price or category"
                  className="ps-search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="button" className="ps-clear-icon" onClick={handleClear}>
                  <IoCloseCircle className="fs-5" />
                </button>
              </InputGroup>
            </Form>
          </Col>

          {/* SORT */}
          <Col xs={12} md={6} className="d-flex">
            <div className="sort-controls ms-md-auto w-100 d-flex align-items-center justify-content-md-end">
              <Form.Select
                className="sort-dropdown"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="nameAZ">Name: A to Z</option>
                <option value="nameZA">Name: Z to A</option>
              </Form.Select>
              <Button className="clear-btn ms-2" onClick={handleClearSort}>
                Clear
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Product Listing */}
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Row className="products-grid gx-3">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Col key={product.id} lg={2} md={3} sm={6} xs={12} className="mb-4">
                  <div className="product-card">
                    <img
                      src={product.image || "https://via.placeholder.com/150"}
                      alt={product.name}
                      className="product-img"
                    />
                    <h5 className="product-title">{product.name}</h5>
                    <div className="product-desc">{product.desc}</div>
                    <div className="product-meta">{product.category}</div>
                    <div className="product-price">₹{product.price}</div>
                    <div className="edit-delete-btns">
                      <Button size="sm" className="view-btn" onClick={() => handleView(product.id)}>
                        View
                      </Button>
                      <Button size="sm" className="edit-btn" onClick={() => handleEdit(product.id)}>
                        Edit
                      </Button>
                      <Button size="sm" className="delete-btn" onClick={() => handleDelete(product.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <p className="text-center text-muted">No products found.</p>
            )}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination mt-4 text-center">
              <Button
                size="sm"
                className="me-2"
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </Button>
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <Button
                    key={pageNum}
                    className={`me-1 ${currentPage === pageNum ? "active" : ""}`}
                    size="sm"
                    onClick={() => changePage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              <Button
                size="sm"
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
