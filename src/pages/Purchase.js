import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchase } from "../store/slices/pruchase.slice";
import "../styles/purchase.css";

const Purchase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchase());
  }, [dispatch]);

  return (
    <div>
      <h1 className="title">Esto es Purchase</h1>

      <ul>
        {purchases.map((purchase) => (
          <li>
            {purchase.cart.products.map((product) => (
              <p onClick={() => navigate(`/product/${product.id}`)}>
                {product.title}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Purchase;
