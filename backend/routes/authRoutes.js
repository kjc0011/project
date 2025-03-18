const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

// 🔹 로그인 테스트 계정 (DB 없이 테스트 가능!)
const testUsers = [
    { username: "member", password: "qwe123" },
    { username: "admin", password: "admin123" }
];

// 🔹 회원가입 API (테스트 모드에서는 사용 X)
router.post("/register", (req, res) => {
    return res.status(403).json({ message: "회원가입은 사용할 수 없습니다! (테스트 모드)" });
});

// 🔹 로그인 API (테스트 계정만 지원)
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "아이디와 비밀번호를 입력해주세요!" });
    }

    // ✅ 테스트 계정 확인
    const user = testUsers.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).json({ message: "아이디 또는 비밀번호가 일치하지 않습니다!" });
    }

    res.json({ message: "로그인 성공!", userId: username });
});

module.exports = router;
