import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  FormControl,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  filterCategory,
  fiterProductId,
  getProducts,
} from "../store/slices/products.slice";
import "../styles/home.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [categorys, setCategorys] = useState([]);

  const products = useSelector((state) => state.products);

  const filterProducts = () => {
    dispatch(fiterProductId(search));
  };

  const selectCategory = (id) => {
    dispatch(filterCategory(id));
  };

  useEffect(() => {
    dispatch(getProducts());

    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategorys(res.data.data.categories));
  }, [dispatch]);

  return (
    <div className="pruduct-card">
      <Row className="g-4">
        <Col lg={3} className="mb-4">
          <div className="categorys">
            <ListGroup className="cat">
              {categorys.map((category) => (
                <ListGroup.Item
                  key={category.id}
                  onClick={() => selectCategory(category.id)}
                >
                  <p className="cat"> {category.name}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>

        <Col>
          <div className="input-search">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={filterProducts}
              >
                Button
              </Button>
            </InputGroup>
          </div>

          <div className="products-container">
            <Row xs={1} md={2} lg={3} className="g-4">
              {products.map((productItem) => (
                <Col>
                  <Card
                    style={{ cursor: "pointer" }}
                    className="product"
                    onClick={() => navigate(`/products/${productItem.id}`)}
                  >
                    <div className="img-card">
                      <Card.Img
                        variant="top"
                        className="img-card_img"
                        src={productItem.productImgs}
                      />
                    </div>

                    <Card.Body className="body">
                      <Card.Title className="title-home">
                        {productItem.title}
                      </Card.Title>
                      <p className="price-home">{productItem.price}</p>
                      <Button className="button-home">Add to Cart</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
