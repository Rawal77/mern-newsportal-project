import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";

export const List = () => {
  const [journalists, setJournalists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    http
      .get("cms/journalist")
      .then(({ data }) => {
        setJournalists(data);
      })
      .catch(err => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = id => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to delete this item",
      buttons: [
        {
          label: "Yes",
          style: { backgroundColor: "var(--bs-danger)" },
          onClick: () => {
            setLoading(true);
            http
              .delete(`cms/journalist/${id}`)
              .then(() => http.get("cms/journalist"))
              .then(({ data }) => setJournalists(data))
              .catch(err => {})
              .finally(() => setLoading(false));
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} className="my-3 py-3 shadow-sm bg-body">
          <Row>
            <Col>
              <h1>Journalist</h1>
            </Col>
            <Col xs="auto">
              <Link className="btn btn-dark" to="/journalist/create">
                <i className="fa-solid fa-plus me-2"></i>Add Journalist
              </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              {loading ? (
                <Loading></Loading>
              ) : (
                <DataTable
                  searchable={[
                    "Name",
                    "Email",
                    "Phone",
                    "Address",
                    "Status",
                    "Created At",
                    "Updated At",
                  ]}
                  sortable={[
                    "Name",
                    "Email",
                    "Phone",
                    "Address",
                    "Status",
                    "Created At",
                    "Updated At",
                  ]}
                  data={journalists.map(journalist => {
                    return {
                      Name: journalist.name,
                      Email: journalist.email,
                      Phone: journalist.phone,
                      Address: journalist.address,
                      Status: journalist.status ? "Active" : "Inactive",
                      "Created At": moment(journalist.createdAt).format("lll"),
                      "Updated At": moment(journalist.updatedAt).format("lll"),
                      Actions: (
                        <>
                          <Link
                            to={`${journalist._id}/edit`}
                            className="btn btn-dark btn-sm me-2">
                            <i className="fa-solid fa-edit me-2"></i>Edit
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={ev => handleDelete(journalist._id)}>
                            <i className="fa-solid fa-trash me-2"></i>Delete
                          </Button>
                        </>
                      ),
                    };
                  })}></DataTable>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
