import { Carousel } from "react-bootstrap";
import landscape from "/landscape.jpg";
import culture from "/culture.jpg";
import temple from "/temple.jpg";
import politics from "/politics.jpg";
import sportsnepal from "/sportsnepal.jpg";
import { NewsList } from "../../components";
import { useEffect, useState } from "react";
import http from "../../http";

export const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    http
      .get("post/featured")
      .then(({ data }) => {
        setFeatured(data);
        return http.get("post/latest");
      })
      .then(({ data }) => {
        setLatest(data);
      })
      .catch(err => {})
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="col-12">
      <main className="row">
        <div className="col-12 px-0">
          <Carousel>
            <Carousel.Item>
              <img src={landscape} className="d-block w-100 img-fluid" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={culture} className="d-block w-100 img-fluid" />
            </Carousel.Item>
          </Carousel>
        </div>

        <NewsList
          title="Latest News"
          news={latest}
          loading={loading}
          latest></NewsList>
        <div className="col-12">
          <hr />
        </div>
        <NewsList
          title="Featured News"
          news={featured}
          loading={loading}></NewsList>
        <div className="col-12">
          <hr />
        </div>

        <div className="col-12 py-3 bg-light d-sm-block d-none">
          <div className="row">
            <div className="col-lg-3 col ms-auto large-holder">
              <div className="row">
                <div className="col-auto ms-auto large-icon">
                  <i className="fas fa-money-bill"></i>
                </div>
                <div className="col-auto me-auto large-text">Best Price</div>
              </div>
            </div>
            <div className="col-lg-3 col large-holder">
              <div className="row">
                <div className="col-auto ms-auto large-icon">
                  <i className="fas fa-truck-moving"></i>
                </div>
                <div className="col-auto me-auto large-text">Fast Delivery</div>
              </div>
            </div>
            <div className="col-lg-3 col me-auto large-holder">
              <div className="row">
                <div className="col-auto ms-auto large-icon">
                  <i className="fas fa-check"></i>
                </div>
                <div className="col-auto me-auto large-text">
                  Genuine Products
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
