// import { useSelector } from "react-redux";
import Cart from "../components/Cart";
import Search from "../components/Search";
import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [prod, setProd] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const searchData = async () => {
    setLoading(true);
    if (search.trim().length > 0) {
      const res = await axios.get(
        `https://mobile-order-backend.onrender.com/api/products/search/${search.trim()}`
      );
      setProd(res.data);
      console.log(res.data)
      setLoading(false);
    }
    else {
      const res = await axios.get(
        "https://mobile-order-backend.onrender.com/api/products"
      );
      setProd(res.data);
      console.log(res.data)
      setLoading(false);
    }
  }

  useEffect(() => {
    searchData();
    // eslint-disable-next-line
  }, [search])
  return (
    <>
      <div>
        <Search searchData={searchData} setSearch={setSearch} />
      </div>
      <div className="products-section container mx-auto py-5">
        <h2 className="products-title uppercase font-bold text-xl text-center mb-5 space-font">
          browse all products
        </h2>
        <div className="products-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {loading && <p className="col-span-full text-center">{"Loading"}</p>}

          {prod.map((product) => (
            <Cart key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
