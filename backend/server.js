const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const authRoutes = require("./routes/authRoutes"); // ✅ DB 없이 테스트 계정 사용

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ 프론트엔드 정적 파일 제공 (이 부분 추가)
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;  // ✅ 5000번 포트 사용
app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ 서버 실행 중! 포트: ${PORT}`);
});