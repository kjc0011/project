document.addEventListener("DOMContentLoaded", function () {
    // 오늘 날짜 표시
    const today = new Date();
    const formattedDate = today.getFullYear() + "/" + (today.getMonth() + 1).toString().padStart(2, "0") + "/" + today.getDate().toString().padStart(2, "0");
    document.getElementById("currentDate").textContent = formattedDate;
    document.getElementById("attendance-date").textContent = formattedDate;

    // 출석 버튼 및 진행률 바
    const attendanceBtn = document.getElementById("attendance-btn");
    const progressFill = document.getElementById("progress-fill");
    const progressPercent = document.getElementById("progress-percent");

    let attendanceCount = 0;
    const totalDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); // 이번 달 총 일수
    let isAttended = false; // 출석 여부 체크

    attendanceBtn.addEventListener("click", function () {
        if (isAttended) {
            alert("이미 출석 완료되었습니다!");
            return;
        }

        if (attendanceCount < totalDays) {
            attendanceCount++;
            let progress = (attendanceCount / totalDays) * 100;
            progressFill.style.width = progress + "%";
            progressFill.textContent = Math.round(progress) + "%";
            progressPercent.textContent = Math.round(progress) + "%";

            alert("출석이 완료되었습니다!");
            isAttended = true;
            attendanceBtn.disabled = true;

            markAttendance(today.getDate()); // ✅ 출석한 날짜 강조
        } else {
            alert("이번 달 출석이 완료되었습니다!");
        }
    });

    // ✅ 달력 생성 함수
    function createCalendar() {
        const calendarContainer = document.getElementById("calendar");
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); // 이번 달 총 일수
        let calendarHTML = "<table class='calendar-table'><tr>";

        // 요일 헤더 추가
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        for (let day of daysOfWeek) {
            calendarHTML += `<th>${day}</th>`;
        }
        calendarHTML += "</tr><tr>";

        // 1일이 무슨 요일인지 확인
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
        for (let i = 0; i < firstDay; i++) {
            calendarHTML += "<td></td>";
        }

        // 날짜 추가
        for (let day = 1; day <= daysInMonth; day++) {
            if ((firstDay + day - 1) % 7 === 0) {
                calendarHTML += "</tr><tr>"; // 새로운 주 시작
            }

            // ✅ 오늘 날짜인지 확인해서 강조
            let todayClass = (day === today.getDate()) ? "highlight-today" : "";

            calendarHTML += `<td class="calendar-day ${todayClass}" data-day="${day}">${day}</td>`;
        }

        calendarHTML += "</tr></table>";
        calendarContainer.innerHTML = calendarHTML;
    }

    // ✅ 출석한 날짜를 달력에 표시
    function markAttendance(day) {
        const dayCells = document.querySelectorAll(".calendar-day");
        dayCells.forEach(cell => {
            if (parseInt(cell.dataset.day) === day) {
                cell.classList.add("attended"); // 출석한 날짜 강조
            }
        });
    }

    // ✅ 달력 생성 실행
    createCalendar();
});
