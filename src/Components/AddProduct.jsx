import { Button, Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import generateUniqueId from "generate-unique-id";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync } from "../Services/Actions/productAction";
import { uploadImage } from "../Services/imageUpload";
import "./AddProduct.css";

const AddProduct = () => {
  const { isCreated, isError } = useSelector((state) => state.productReducer);
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    setInputForm({ ...inputForm, [name]: value });
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
    if (!inputForm.image) newErrors.image = "Please select an image file.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    let id = generateUniqueId({ length: 6, useLetters: false });
    inputForm.id = id;
    dispatch(addProductAsync(inputForm));
  };

  // ✅ Redirect if product created
  useEffect(() => {
    if (isCreated) {
      navigate("/");
    }
  }, [isCreated, navigate]);

  // ✅ Redirect to signin if no user
  useEffect(() => {
    if (!user) {
      navigate("/signIn");
    }
  }, [user, navigate]);

  return (
    <div className="product-form-container">
      <div className="product-form-card">
        <h1>ADD NEW PRODUCT</h1>
        {isError && (
          <div
            className="form-error"
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontWeight: "bold",
              margin: "20px 0",
              color: "red",
            }}
          >
            {isError}
          </div>
        )}
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
              <option value="Cold Drinks & Juices">
                Cold Drinks & Juices
              </option>
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
            <Form.Control
              type="file"
              name="image"
              onChange={handleFileChanged}
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">
              {errors.image}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100">
            Add Product
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
