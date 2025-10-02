import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductAsync, updateProductAsync } from "../Services/Actions/productAction";
import { uploadImage } from "../Services/imageUpload";

import "./AddProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isUpdated } = useSelector((state) => state.productReducer);

  const initialState = {
    id: "",
    title: "",
    desc: "",
    price: "",
    category: "",
    image: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const handleFileChanged = async (e) => {
      let imagePath = await uploadImage(e.target.files[0]);
      setInputForm({
        ...inputForm,
        image: imagePath,
      });
    };
  

  const validateForm = () => {
    let newErrors = {};
    if (!inputForm.title.trim()) newErrors.title = "Please enter a title.";
    if (!inputForm.desc.trim()) newErrors.desc = "Please enter a description.";
    if (!inputForm.price || Number(inputForm.price) <= 0) {
      newErrors.price = "Please enter a valid price greater than 0.";
    }
    if (!inputForm.category) newErrors.category = "Please select a category.";
    if (!inputForm.image.trim()) newErrors.image = "Please enter an image URL.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(updateProductAsync(inputForm));
  };

  useEffect(() => {
    if (isUpdated) {
      navigate("/");
    }
  }, [isUpdated, navigate]);

  useEffect(() => {
    if (product) {
      setInputForm(product);
    }
  }, [product]);

  useEffect(() => {
    if (id) {
      dispatch(getProductAsync(id));
    }
  }, [id, dispatch]);

  return (
    <div className="product-form-container">
      <div className="product-form-card">
        <h1>EDIT PRODUCT</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter Title"
              value={inputForm.title}
              onChange={handleChanged}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="desc"
              placeholder="Enter Description"
              value={inputForm.desc}
              onChange={handleChanged}
              isInvalid={!!errors.desc}
            />
            <Form.Control.Feedback type="invalid">
              {errors.desc}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter Price"
              value={inputForm.price}
              onChange={handleChanged}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={inputForm.category}
              onChange={handleChanged}
              isInvalid={!!errors.category}
            >
              <option value="">Select Category</option>
              <option value="Cold Drinks & Juices">Cold Drinks & Juices</option>
              <option value="Candies & Gums">Candies & Gums</option>
              <option value="Snacks & Munchies">Snacks & Munchies</option>
              <option value="Dairy & Bread">Dairy & Bread</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>

           <Form.Group className="mb-4">
  <Form.Label>Image File</Form.Label>

  <div className="d-flex align-items-center">
    {/* Choose File Input */}
    <Form.Control
      type="file"
      name="image"
      onChange={handleFileChanged}
      isInvalid={!!errors.image}
      style={{ maxWidth: "250px" }}
    />

    {/* Preview instead of "No file chosen" */}
    {inputForm.image && (
      <img
        src={inputForm.image}
        alt="preview"
        style={{
          width: "60px",
          height: "60px",
          objectFit: "cover",
          borderRadius: "6px",
          marginLeft: "10px",
          border: "1px solid #ccc",
        }}
      />
    )}
  </div>

  <Form.Control.Feedback type="invalid">
    {errors.image}
  </Form.Control.Feedback>
</Form.Group>


          <Button type="submit" variant="dark" className="w-100">
            Update Product
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditProduct;
