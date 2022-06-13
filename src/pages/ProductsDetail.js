import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { filterCategory } from "../store/slices/products.slice";
import { addToCart } from "../store/slices/cart.slice";

const ProductsDetail = () => {
  const [product, setProduct] = useState({});

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsList = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState();

  useEffect(() => {
    axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/`)
      .then((res) => {
        const productsSearched = res.data.data.products.find(
          (productsItem) => productsItem.id === Number(id)
        );
        setProduct(productsSearched);
        dispatch(filterCategory(productsSearched.category.id));
      });
  }, [dispatch, id]);

  const addProduct = () => {
    const product = {
      id,
      quantity,
    };
    dispatch(addToCart(product));
  };

  return (
    <div>
      <Row>
        <Col>
          <h2>{product.title}</h2>
          <input
            type="text"
            placeholder="quantity"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
          />
          <Button onClick={addProduct}>Add</Button>
        </Col>
        <Col lg={2}>
          {productsList.map((productsItem) => (
            <li onClick={() => navigate(`/products/${productsItem.id}`)}>
              {productsItem.title}
            </li>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default ProductsDetail;
