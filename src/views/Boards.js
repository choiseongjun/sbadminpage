import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import axios from "axios";
import ReactPaginate from "react-paginate";

const Boards = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const getBoardData = () => {
    const params = { pageNum: limit, page: page };

    axios.get("/v1/board", { params }).then((res) => {
      setBoardList(res.data.content);
      setTotalPage(res.data.totalPages);
    });
  };

  useEffect(() => {
    getBoardData();
  }, [page, limit]);
  const boardType = (type) => {
    switch (type) {
      case "1":
        return "공지사항";
      case "2":
        return "질문과 답변";
      case "3":
        return "고객후기";
    }
  };
  const handlePageClick = (event) => {
    setPage(event.selected);
  };
  return (
    <div>
      <Link to="/admin/detail/boards/write">
        <button>게시판 글쓰기</button>
      </Link>
      <Card.Body className="table-full-width table-responsive px-0">
        <Table id="table-to-xls" className="table-hover">
          <thead>
            <tr>
              <th className="border-0">ID</th>
              <th className="border-0">유형</th>
              <th className="border-0">제목</th>
              <th className="border-0">글작성날짜</th>
            </tr>
          </thead>
          <tbody>
            {boardList.length > 0 &&
              boardList.map((board, idx) => (
                <tr key={idx}>
                  <td>{board.id}</td>
                  <td>{boardType(board.gubun)}</td>
                  <td>
                    <Link to={`/admin/detail/boards/${board.id}`}>
                      {board.title}
                    </Link>
                  </td>
                  <td>{board.createdDate}</td>
                </tr>
              ))}
          </tbody>
        </Table>
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
      </Card.Body>
    </div>
  );
};

export default Boards;
