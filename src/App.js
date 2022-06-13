import "./App.css";
import { Home, Purchase, Login, ProductsDetail } from "./pages";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { LoadingScreen, NavBar, ProtectedRoutes } from "./components";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        <Container>
          {isLoading && <LoadingScreen />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products/:id" element={<ProductsDetail />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/purchase" element={<Purchase />} />
            </Route>
          </Routes>
        </Container>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
