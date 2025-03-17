const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const authRoutes = require("./routes/authRoutes"); // ✅ DB 없이 테스트 계정 사용

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ 프론트엔드 정적 파일 제공
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8080;  // ✅ 환경 변수에서 포트 가져오기 (기본값: 8080)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ 서버 실행 중! 포트: ${PORT} (테스트 모드)`);
});
