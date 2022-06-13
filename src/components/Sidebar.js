import React from "react";
import { ListGroup, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { buy } from "../store/slices/cart.slice";
const Sidebar = ({ show, handleClose }) => {
  const purchases = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectProduct = (purchase) => {
    handleClose();
    navigate(`/products/${purchase.id}`);
  };

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Purchase</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            {purchases.map((purchase) => (
              <ListGroup.Item onClick={() => selectProduct(purchase)}>
                {purchase.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
        <Button onClick={() => dispatch(buy())}>Checkout</Button>
      </Offcanvas>
    </div>
  );
};

export default Sidebar;
