import { useEffect, useState } from "react";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import moment from "moment";

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    http
      .get("profile/reviews")
      .then(({ data }) => {
        setReviews(data);
      })
      .catch(err => {})
      .finally(() => setLoading(false));
  }, []);
  return loading ? (
    <Loading></Loading>
  ) : (
    <DataTable
      searchable={["Post", "Comment", "Created At", "Updated At"]}
      data={reviews.map(review => {
        return {
          Post: review.post.title,
          Comment: review.comment,
          "Created At": moment(review.createdAt).format("lll"),
          "Updated At": moment(review.updatedAt).format("lll"),
        };
      })}></DataTable>
  );
};
