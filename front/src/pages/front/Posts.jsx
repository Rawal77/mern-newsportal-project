import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import http from "../../http";
import { imgUrl } from "../../lib";
import { Loading, NewsList, SubmitBtn } from "../../components";
import { useSelector } from "react-redux";
import moment from "moment";

export const Posts = () => {
  const [imgPreview, setImgPreview] = useState("");
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [similar, setSimilar] = useState([]);
  const [form, setForm] = useState({});
  const params = useParams();
  const user = useSelector(state => state.user.value);
  const handleSubmit = ev => {
    ev.preventDefault();
    setLoading(true);
    http
      .post(`post/${params.id}/review`, form)
      .then(() => http.get(`post/${params.id}`))
      .then(({ data }) => {
        setPost(data);
        setImgPreview(data.images[0]);
        ev.target.reset();
      })
      .catch(err => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    http
      .get(`post/${params.id}`)
      .then(({ data }) => {
        setPost(data);
        setImgPreview(data.images[0]);
        return http.get(`post/${params.id}/similar`);
      })
      .then(({ data }) => setSimilar(data))
      .catch(err => {})
      .finally(() => setLoading(false));
  }, [params.id]);

  return loading ? (
    <Loading></Loading>
  ) : (
    <div className="col-12">
      {console.log(post)}
      <main className="row">
        <div className="col-12 bg-white py-3 my-3">
          <div className="row">
            <div className="col-lg-10 col-md-12 mb-3">
              <div className="display-3 text-center">
                Title : `{post.title}`
              </div>
              <div className="col-12 mb-3">
                <div
                  className="img-large border"
                  style={{
                    backgroundImage: `url('${imgUrl(imgPreview)}')`,
                  }}></div>
              </div>
              <div className="col-12">
                <div className="row">
                  {post.images &&
                    post.images.map((image, i) => (
                      <div className="col-sm-2 col-3">
                        <div
                          className="img-small border"
                          style={{
                            backgroundImage: `url('${imgUrl(image)}')`,
                          }}
                          onMouseEnter={() => setImgPreview(image)}></div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mb-3 py-3 bg-white text-justify">
          <div className="row">
            <div className="col-md-7">
              <div className="col-12">
                <div className="row">
                  <div className="col-12 text-uppercase">
                    <h2>
                      <u>Details</u>
                    </h2>
                  </div>
                  <div className="col-12" id="details">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.description,
                      }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <div className="col-12 px-md-4 sidebar h-100">
                <div className="row">
                  <div className="col-12 mt-md-0 mt-3 text-uppercase">
                    <h2>
                      <u>Ratings & Reviews</u>
                    </h2>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 px-md-3 px-0">
                    <hr />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <h4>Add Review</h4>
                  </div>
                  <div className="col-12">
                    {Object.keys(user).length ? (
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <textarea
                            name="comment"
                            className="form-control"
                            placeholder="Give your review"
                            required
                            onChange={ev =>
                              setForm({
                                ...form,
                                comment: ev.target.value,
                              })
                            }></textarea>
                        </div>
                        <div className="mb-3">
                          <SubmitBtn
                            label="Add Comment"
                            icon="fa-comment-dots"></SubmitBtn>
                        </div>
                      </form>
                    ) : (
                      <div className="col-12 text-center fst-italic py-2 px-3 mb-2 bg-gray">
                        Please <Link to="/login">login</Link> to add your review
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 px-md-3 px-0">
                    <hr />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    {post.reviews && post.reviews.length ? (
                      post.reviews.map(review => (
                        <div className="col-12 text-justify py-2 px-3 mb-3 bg-gray">
                          <div className="row">
                            <div className="col-12">
                              <strong className="me-2">
                                {review.user.name}
                              </strong>
                            </div>
                            <div className="col-12">{review.comment}</div>
                            <div className="col-12">
                              <small>
                                <i className="fas fa-clock me-2"></i>
                                {moment(review.createdAt).fromNow()}
                              </small>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-12 text-center fst-italic py-2 px-3 mb-3 bg-gray">
                        No review given for this product
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NewsList news={similar} title="Similar News"></NewsList>
      </main>
    </div>
  );
};
