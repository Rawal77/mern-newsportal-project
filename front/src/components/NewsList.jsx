import { Loading } from "./Loading";
import { NewsCard } from "./NewsCard";

export const NewsList = ({ title, news, latest = false, loading = false }) => {
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12 py-3">
          <div className="row">
            <div className="col-12 text-center text-uppercase">
              <h2>{title}</h2>
            </div>
          </div>
          {loading ? (
            <Loading></Loading>
          ) : (
            <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 justify-content-center">
              {news.map(newz => (
                <NewsCard news={newz} latest={latest} key={news._id}></NewsCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
