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

        // ✅ OpenShift & AWS API 주소 설정
        const API_BASE_URLS = [
            "http://cicd-route-hspark.apps.ocp4.xndks.xyz",  // OpenShift
            "new-test-alb-543931512.ap-northeast-2.elb.amazonaws.com"  // AWS
        ];

        try {
            // OpenShift & AWS 동시에 요청
            const fetchPromises = API_BASE_URLS.map(baseUrl =>
                fetch(`${baseUrl}/api/auth/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password }),
                }).then(async response => {
                    if (!response.ok) {
                        throw new Error(`⚠️ [오류] ${baseUrl}: ${response.statusText}`);
                    }
                    return response.json();
                })
            );

            // ✅ 먼저 응답한 서버 사용 (Promise.race)
            const data = await Promise.race(fetchPromises);
            console.log("📢 [서버 응답] 회원가입 결과:", data);

            if (data.message) {
                alert(data.message); // ✅ 회원가입 성공 메시지 표시
                window.location.href = "login.html"; // ✅ 로그인 페이지로 이동
            } else {
                alert("❌ 회원가입 실패: 응답 데이터가 올바르지 않습니다.");
            }

        } catch (error) {
            console.error("❌ [회원가입 실패] 서버 요청 오류:", error);
            alert("서버와의 연결에 문제가 발생했습니다!");
        }
    });
});
