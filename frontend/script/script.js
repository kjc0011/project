function checkAttendance() {
    document.getElementById("attendance-status").innerText = "출석 여부: 체크 완료 ✅";
}

// 공지사항 목록 불러오기 (API 연동 가능)
document.addEventListener("DOMContentLoaded", function() {
    let noticeList = document.getElementById("notice-list");
    noticeList.innerHTML = "<li> 오늘부터 출석 체크 시스템 사용 시작!</li>";
});

document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    alert(`로그인 시도: 아이디 - ${username}, 비밀번호 - ${password}`);
});

document.getElementById("registerForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    const newUsername = document.getElementById("newUsername").value;
    const email = document.getElementById("email").value;
    const newPassword = document.getElementById("newPassword").value;
    alert(`회원가입 시도: 아이디 - ${newUsername}, 이메일 - ${email}`);
});

document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        alert(`로그인 성공!`);
        window.location.href = "dashboard.html"; // 출석 체크 화면으로 이동
    } else {
        alert("아이디와 비밀번호를 입력하세요.");
    }
});

function checkAttendance() {
    document.getElementById("attendance-status").innerHTML = "출석 여부: 체크 완료 ✅";
}

// 공지사항 목록 불러오기
document.addEventListener("DOMContentLoaded", function() {
    let noticeList = document.getElementById("notice-list");
    noticeList.innerHTML = "<li>🚀 오늘부터 출석 체크 시스템 사용 시작!</li>";
});

