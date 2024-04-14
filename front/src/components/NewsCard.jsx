import { Link } from "react-router-dom";
import { imgUrl } from "../lib";

export const NewsCard = ({ news, latest = false }) => {
  return (
    <div className="col">
      <div className="col-12 bg-white text-center h-100 product-item">
        {latest ? <span className="new">New</span> : null}
        <div className="row h-100">
          <div className="col-12 p-0 mb-3">
            <Link to={`/post/${news._id}`}>
              <img src={imgUrl(news.images[0])} className="img-fluid" />
            </Link>
          </div>
          <div className="col-12 mb-3">
            <Link to={`/post/${news._id}`} className="product-name">
              {news.title}
            </Link>
          </div>
          <div className="col-12 mb-3">
            <div
              dangerouslySetInnerHTML={{
                __html: news.description.substr(0, 10) + `......`,
              }}></div>
          </div>
          {/* <div className="col-12 mb-3 align-self-end">
            <button className="btn btn-outline-dark" type="button">
              <i className="fas fa-cart-plus me-2"></i>Add to cart
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
