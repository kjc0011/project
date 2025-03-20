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

        // OpenShift & AWS API 경로 설정
        const API_BASE_URLS = [
            "http://cicd-route-hspark.apps.ocp4.xndks.xyz",  // OpenShift
            "new-test-alb-543931512.ap-northeast-2.elb.amazonaws.com" // AWS
        ];

        try {
            // OpenShift와 AWS API에 동시에 요청을 보냄
            const fetchPromises = API_BASE_URLS.map(baseUrl =>
                fetch(`${baseUrl}/api/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                }).then(async response => {
                    if (!response.ok) {
                        throw new Error(`⚠️ [오류] ${baseUrl}: ${response.statusText}`);
                    }
                    return response.json();
                })
            );

            // 먼저 응답을 받은 API의 데이터를 사용
            const data = await Promise.race(fetchPromises);
            console.log("📢 [서버 응답] 로그인 결과:", data);

            if (data.token) {
                alert("로그인 성공!");
                localStorage.setItem("authToken", data.token); // ✅ JWT 토큰 저장 (옵션)
                window.location.href = "menu/login.html"; // ✅ 로그인 성공 후 페이지 이동
            } else {
                alert("❌ 로그인 실패: 응답 데이터가 올바르지 않습니다.");
            }

        } catch (error) {
            console.error("❌ [로그인 실패] 서버 요청 오류:", error);
            alert("서버와의 연결에 문제가 발생했습니다!");
        }
    });
});
