const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const authRoutes = require("./routes/authRoutes"); // ✅ DB 없이 테스트 계정 사용

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ 프론트엔드 정적 파일 제공 (Docker에서도 인식 가능하게 수정)
app.use(express.static(path.resolve(__dirname, "..", "frontend")));

// ✅ 기본 페이지(index.html) 응답 설정
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "frontend", "index.html"));
});

app.use("/api/auth", authRoutes);

// ✅ 포트 변경 (8080으로 통일)
const PORT = process.env.PORT || 8080;  

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ 서버 실행 중! 포트: ${PORT}`);
});
