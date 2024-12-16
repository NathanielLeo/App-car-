import React, { useEffect, useState } from "react";
import { GET_ALL, SEARCH_PRODUCTS } from "../api/apiService"; // Ensure SEARCH_PRODUCTS is imported from your API service
import { Link, useNavigate } from "react-router-dom";
import us from "../assets/images/icons/flags/US.png";
import logo from "../assets/images/logo.svg";

function Header() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const params = {
      pageNumber: 0,
      pageSize: 5,
      sortBy: "categoryId",
      sortOrder: "asc",
    };
    GET_ALL("categories", params)
      .then((response) => {
        setCategories(response.content);
        console.log("Fetched categories:", response.content);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    setError(null);

    try {
      const response = await SEARCH_PRODUCTS(searchTerm);
      console.log(response) // Call the search API with the search term
      navigate('/search-results', { state: { searchResults: response.data } }); // Navigate to SearchResult and pass searchResults via state
    } catch (error) {
      setError(error);
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="section-header">
      <nav className="navbar d-none d-md-flex p-md-0 navbar-expand-sm navbar-light border-bottom">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTop4"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTop4">
            <ul className="navbar-nav mr-auto">
              <li>
                <span className="nav-link">
                  Xin chào, <Link to="/Login">Đăng nhập</Link> hoặc
                  <Link to="/Register"> Đăng ký</Link>
                </span>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Khuyến mãi
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Bán hàng
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Trợ giúp
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li>
                <a href="#" className="nav-link">
                  <img src={us} alt="us" height="16" /> Giao hàng tới
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Danh sách theo dõi
                </a>
                <ul className="dropdown-menu small">
                  <li>
                    <a className="dropdown-item" href="#">
                      Sản phẩm thứ nhất
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sản phẩm thứ hai
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sản phẩm thứ ba
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="nav-link">
                  Cửa hàng của tôi
                </a>
              </li>
              <li>
                <a href="#" className="nav-link">
                  <i className="fa fa-bell"></i>
                </a>
              </li>
              <li>
                <Link to="cart" className="nav-link">
                  <i className="fa fa-shopping-cart"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <section className="header-main border-bottom">
          <div className="row row-sm">
            <div className="col-6 col-sm col-md col-lg flex-grow-0">
              <Link to="/" className="brand-wrap">
                <img className="logo" src={logo} alt="Logo" />
              </Link>
            </div>
            <div className="col-6 col-sm col-md col-lg flex-md-grow-0">
              <div className="d-md-none float-right">
                <a href="#" className="btn btn-light">
                  <i className="fa fa-bell"></i>
                </a>
                <a href="#" className="btn btn-light">
                  <i className="fa fa-user"></i>
                </a>
                <a href="#" className="btn btn-light">
                  <i className="fa fa-shopping-cart"></i> 2
                </a>
              </div>
              <div className="category-wrap d-none dropdown d-md-inline-block">
                <button
                  type="button"
                  className="btn btn-light dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Mua sắm theo
                </button>
                <div className="dropdown-menu">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <a
                        className="dropdown-item"
                        href={`/ListingGrid?categoryId=${category.categoryId}`}
                        key={category.categoryId}
                      >
                        {category.categoryName}
                      </a>
                    ))
                  ) : (
                    <a className="dropdown-item" href="#">
                      No categories available
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl col-md-5 col-sm-12 flex-grow-1">
              <form onSubmit={handleSearch} className="search-header">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <select
                    className="custom-select border-left"
                    name="category_name"
                  >
                    <option value="">Tất cả loại</option>
                    <option value="codex">Đặc biệt</option>
                    <option value="comments">Chỉ tốt nhất</option>
                    <option value="content">Mới nhất</option>
                  </select>
                  <button className="btn btn-primary" type="submit">
                    Tìm kiếm
                  </button>
                </div>

              </form>
              {loading && <div>Loading...</div>}
              {error && <div>Error: {error.message}</div>}
              {searchResults.length > 0 && (
                <div>
                  <h3>Kết quả tìm kiếm:</h3>
                  <ul>
                    {searchResults.map((product) => (
                      <li key={product.id}>
                        <Link to={`/product/${product.id}`}>
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        <nav className="navbar navbar-main navbar-expand pl-0">
          <ul className="navbar-nav flex-wrap">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Trang chủ
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Danh sách sản phẩm
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <a
                      className="dropdown-item"
                      href={`/ListingGrid?categoryId=${category.categoryId}`}
                      key={category.categoryId}
                    >
                      {category.categoryName}
                    </a>
                  ))
                ) : (
                  <a className="dropdown-item" href="#">
                    No categories available
                  </a>
                )}
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/ListingGrid">
                  Tất cả sản phẩm
                </a>
              </div>
            </li>
            {categories.length > 0 ? (
              categories.map((category) => (
                <li className="nav-item" key={category.categoryId}>
                  <a
                    className="nav-link"
                    href={`/ListingGrid?categoryId=${category.categoryId}`}
                  >
                    {category.categoryName}
                  </a>
                </li>
              ))
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="#">
                  No categories available
                </a>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link" href="/ListingGrid">
                Tất cả sản phẩm
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
