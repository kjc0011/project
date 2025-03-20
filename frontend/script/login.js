document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        console.error("❌ loginForm 요소를 찾을 수 없습니다!");
        return;
    }

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // 기본 폼 제출 방지

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        console.log("📢 [클라이언트 요청] 로그인 요청:", { username, password });

        try {
            const API_BASE_URL = "http://cicd-route-hspark.apps.ocp4.xndks.xyz";  // ✅ OpenShift Route 주소 사용!
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log("📢 [서버 응답] 로그인 결과:", data);

            if (response.ok) {
                alert("로그인 성공!");
                window.location.href = "menu/login.html"; // ✅ 로그인 성공 후 페이지 이동
            } else {
                alert(`❌ 오류: ${data.message}`); // 로그인 실패 시 오류 메시지 출력
            }
        } catch (error) {
            console.error("❌ [로그인 실패] 서버 요청 오류:", error);
            alert("서버와의 연결에 문제가 발생했습니다!");
        }
    });
});