import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fromStorage, removeStorage } from "../lib";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import http from "../http";
import { setUser } from "../store";
import { Loading } from "../components";

export const PrivateRoute = ({ element }) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(user).length == 0) {
      const token = fromStorage("fronttoken");
      if (token) {
        setLoading(true);
        http
          .get("profile/detail")
          .then(({ data }) => {
            dispatch(setUser(data));
          })
          .catch(err => {
            removeStorage("fronttoken");
            toast.error("Please log in to continue");
            navigate("/login");
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        toast.error("Please log in to continue");
        navigate("/login");
      }
    } else {
    }
  }, [user]);
  return loading ? <Loading></Loading> : element;
};
