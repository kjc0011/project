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

        // ✅ OpenShift & AWS API 주소 설정 (배열)
        const API_BASE_URLS = [
            "http://cicd-route-hspark.apps.ocp4.xndks.xyz",   // OpenShift
            "http://new-test-alb-543931512.ap-northeast-2.elb.amazonaws.com" // AWS
        ];

        try {
            // ✅ OpenShift & AWS에 각각 요청 보내기
            const fetchPromises = API_BASE_URLS.map(baseUrl =>
                fetch(`${baseUrl}/api/auth/register`, { // 🔥 URL이 개별적으로 인식되도록 수정!
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

            // ✅ `Promise.race()`를 사용해 먼저 응답 온 서버의 결과를 사용!
            const data = await Promise.race(fetchPromises);
            console.log("📢 [서버 응답] 회원가입 결과:", data);

            if (data.message) {
                alert("✅ 회원가입 성공!\n" + data.message);
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
