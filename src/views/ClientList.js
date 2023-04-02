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
import ReactHTMLTableToExcel from "react-html-table-to-excel-3";

function TableList() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  // const [visitDatas, setVisitDatas] = useState([]);
  const [clients, setClients] = useState([]);
  const handlePageClick = (event) => {
    setPage(event.selected);
  };
  const getVisit = () => {
    const params = { pageNum: limit, page: page };

    axios.get("/client", { params }).then((res) => {
      console.log("res==", res);
      setClients(res.data.content);
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
                <Card.Title as="h4">고객리스트</Card.Title>
                {/* <p className="card-category">
                  Here is a subtitle for this table
                </p> */}
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button"
                  table="table-to-xls"
                  filename="고객리스트"
                  sheet="tablexls"
                  filetype="xls"
                  buttonText="고객리스트 다운로드"
                />
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table id="table-to-xls" className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">고객명</th>
                      <th className="border-0">폰번호</th>
                      <th className="border-0">신청시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((visit, idx) => (
                      <tr key={idx}>
                        <td>{visit.id}</td>
                        <td>{visit.name}</td>
                        <td>{visit.phoneNumber}</td>
                        <td>{visit.applyTime}</td>
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
