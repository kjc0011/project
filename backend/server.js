const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ 현재 실행 디렉토리 로그 출력 (디버깅용)
console.log("📂 현재 실행 디렉토리:", __dirname);

// ✅ authRoutes를 올바른 경로로 불러오기
const authRoutes = require("./routes/authRoutes"); 

// ✅ 프론트엔드 정적 파일 제공
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api/auth", authRoutes);

// ✅ 서버 실행
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ 서버 실행 중! 포트: ${PORT} (테스트 모드)`);
});
