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
  }, []);

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
                  <td>{board.gubun == "1" ? "공지사항" : "질문과 답변"}</td>
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
      </Card.Body>
    </div>
  );
};

export default Boards;
