import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import axios from "axios";
function TableList() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [visitDatas, setVisitDatas] = useState([]);

  const handlePageClick = (event) => {
    console.log(event.selected);
    setPage(event.selected);
  };
  const getVisit = () => {
    const params = { pageNum: limit, page: page };

    axios.get("/visit", { params }).then((res) => {
      console.log("res==", res);
      setVisitDatas(res.data.content);
      setTotalPage(res.data.totalPages);
    });
  };
  useEffect(() => {
    getVisit();
  }, [page, limit]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">기록리스트</Card.Title>
                {/* <p className="card-category">
                  Here is a subtitle for this table
                </p> */}
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">접속브라우저</th>
                      <th className="border-0">접속경로</th>
                      <th className="border-0">접속 시간</th>
                      <th className="border-0">접속 ip</th>
                      {/* <th className="border-0">접속 OS</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {visitDatas.map((visit, idx) => (
                      <tr key={idx}>
                        <td>{visit.id}</td>
                        <td>{visit.browser}</td>
                        <td>{visit.referer}</td>
                        <td>{visit.sessionlastaccess}</td>
                        <td>{visit.ipaddress}</td>
                        {/* <td>{visit.ostype}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={10}
          pageCount={totalPage}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </Container>
    </>
  );
}

export default TableList;
