const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const authRoutes = require("./routes/authRoutes"); // ✅ DB 없이 테스트 계정 사용

const app = express();

// ✅ CORS 설정 (프론트엔드에서 접근 가능하도록 설정)
const allowedOrigins = ["http://localhost:3000", "http://your-frontend-url.com"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// ✅ JSON 요청을 처리할 수 있도록 설정
app.use(bodyParser.json());

// ✅ 프론트엔드 정적 파일 제공 (React/Vue 빌드된 파일 제공)
app.use(express.static(path.join(__dirname, "public")));

// ✅ API 테스트 엔드포인트 추가
app.get("/api/test", (req, res) => {
    res.json({ message: "✅ 백엔드 서버 정상 작동 중!" });
});

// ✅ 로그인 관련 라우트 연결
app.use("/api/auth", authRoutes);

// ✅ 프론트엔드 모든 요청을 index.html로 리디렉션 (SPA 새로고침 대응)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ 서버 실행 (환경 변수 활용 가능)
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ 서버 실행 중! 포트: ${PORT} (테스트 모드)`);
});
