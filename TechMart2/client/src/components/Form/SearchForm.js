import React from "react";
import "../style/SearchForm.css";
import axios from "axios";
import { useSearch } from "../../Context/search";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const SearchForm = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        className="d-flex search mt-2"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2 search-bar"
          type="search"
          placeholder="Search for digital products."
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-primary btn-search " type="submit">
          <FaSearch size={22} color="white" />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
