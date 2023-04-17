import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Routes, Route, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const BoardDetail = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [gubun, setGubun] = useState("");
  const { detail } = useParams();
  let history = useHistory();

  const getDetailBoard = () => {
    const id = detail;
    axios.get(`/v1/board/detail/${id}`).then((res) => {
      console.log("res=", res);
      setTitle(res.data.title);
      setContent(res.data.content);
      setGubun(res.data.gubun);
    });
  };
  useEffect(() => {
    getDetailBoard();
  }, []);
  const boardUpdateM = () => {
    const param = {
      title: title,
      content: content,
      gubun: gubun,
      id: detail,
    };
    console.log("param=", param);
    axios
      .put("/v1/board", param, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("res=", res);
        alert("수정완료하였습니다.");
        history.push("/admin/boards");
      });
  };
  const deleteBoard = () => {};
  return (
    <div>
      <button onClick={() => boardUpdateM()}>글 수정</button>
      <div style={{ marginTop: 20 }}>
        <Form.Select
          value={gubun}
          onChange={(e) => setGubun(e.target.value)}
          aria-label="Default select example"
        >
          <option value="">게시판 유형</option>
          <option value="1">공지사항</option>
          <option value="2">질문과답변</option>
          <option value="3">고객후기</option>
        </Form.Select>
        <button onClick={deleteBoard}>게시글삭제</button>
      </div>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">제목</InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </InputGroup>
      <div>
        {gubun == "3" ? (
          <></>
        ) : (
          <ReactQuill
            style={{
              height: 500,
              backgroundColor: "#fff",
              paddingBottom: 45,
            }}
            theme="snow"
            value={content}
            onChange={setContent}
          />
        )}
      </div>
    </div>
  );
};

export default BoardDetail;
