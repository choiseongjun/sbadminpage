import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const BoardWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [gubun, setGubun] = useState("");
  let history = useHistory();
  const boardWriteM = () => {
    const param = {
      title: title,
      content: content,
      gubun: gubun,
    };
    console.log();
    if (gubun === "") {
      return alert("게시판 유형을 선택해주세요.");
    }
    axios.post("/v1/board", param).then((res) => {
      alert("글 작성 되었습니다");
      history.push("/admin/boards");
    });
  };
  return (
    <div>
      <button onClick={() => boardWriteM()}>글 작성</button>
      <div style={{ marginTop: 20 }}>
        <Form.Select
          onChange={(e) => setGubun(e.target.value)}
          aria-label="Default select example"
        >
          <option value="">게시판 유형</option>
          <option value="1">공지사항</option>
          <option value="2">질문과답변</option>
          <option value="3">고객후기</option>
        </Form.Select>
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

export default BoardWrite;
