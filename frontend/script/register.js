document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");

    if (!form) {
        console.error("❌ registerForm 요소를 찾을 수 없습니다!");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        console.log("📢 [클라이언트 요청] 회원가입 요청:", { username, email, password });

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log("📢 [서버 응답] 회원가입 결과:", data);

            if (response.ok) {
                alert(data.message); // ✅ 회원가입 성공 메시지 표시
                window.location.href = "login.html"; // ✅ 로그인 페이지로 이동
            } else {
                alert(`❌ 오류: ${data.message}`); // ❌ 오류 메시지 표시
            }
        } catch (error) {
            console.error("❌ [회원가입 실패] 서버 요청 오류:", error);
            alert("서버와의 연결에 문제가 발생했습니다!");
        }
    });
});
