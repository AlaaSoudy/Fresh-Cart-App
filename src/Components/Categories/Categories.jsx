import { useNavigate } from 'react-router-dom';
import { useCategory } from '../../Context/CategoryContext';
import { Helmet } from 'react-helmet';
import './Categories.css';
function Categories() {
  const navigate = useNavigate();
  const { categories, setSelectedCategory } = useCategory();

  function goToCategory(category) {
    setSelectedCategory(category);
    navigate(`/category/${category._id}`);
  }

  return (
    <>
      <Helmet>
        <title> Categories - Fresh Cart </title>
        <meta name="description" content="Explore a wide range of categories at Fresh Cart." />
        <meta
          name="keywords"
          content="categories, fresh cart, grocery categories, online shopping  "
        />
      </Helmet>

      <div className="container my-5 mt-3">
        <div className="row g-4 ">
          <h2 className="mb-4">📂 All Categories</h2>
          {categories.map((category) => (
            <div className="col-md-3" key={category._id}>
              <div
                onClick={() => goToCategory(category)}
                style={{ cursor: 'pointer' }}
                className="border p-2 rounded text-center"
              >
                <img src={category.image} className="w-100" height={200} alt={category.name} />
                <h6>{category.name}</h6>
              </div>
              <div className="mt-2">
                <button className="btn btn-outline-primary" onClick={() => goToCategory(category)}>
                  View Products
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
