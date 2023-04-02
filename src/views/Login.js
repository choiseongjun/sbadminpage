import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const Login = () => {
  const history = useHistory();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const Login = () => {
    if (userId === "admin" && password == "123") {
      alert("로그인성공하였습니다");
      localStorage.setItem("admin", 1);
      history.push("/admin/dashboard");
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 100,
      }}
    >
      <div style={{ width: "80vw" }}>
        <div style={{ width: "80vw" }} class="form-outline mb-4">
          <input
            type="text"
            id="form2Example1"
            class="form-control"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <label class="form-label" for="form2Example1">
            아이디
          </label>
        </div>

        <div class="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            class="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label class="form-label" for="form2Example2">
            비밀번호
          </label>
        </div>

        <div class="row mb-4">
          <div class="col d-flex justify-content-center">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="form2Example31"
                checked
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          class="btn btn-primary btn-block mb-4"
          onClick={(e) => Login()}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
