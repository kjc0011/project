document.addEventListener("DOMContentLoaded", function () {
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    const calendarContainer = document.getElementById("calendar");
    const currentDateText = document.getElementById("currentDate");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");
    const attendanceBtn = document.getElementById("attendance-btn");
    const progressFill = document.getElementById("progress-fill");
    const progressPercent = document.getElementById("progress-percent");

    let attendanceCount = 0;
    let isAttended = false;

    // ✅ 출석 버튼 클릭 이벤트
    attendanceBtn.addEventListener("click", function () {
        if (isAttended) {
            alert("이미 출석 완료되었습니다!");
            return;
        }
        attendanceCount++;
        let progress = (attendanceCount / 30) * 100;
        progressFill.style.width = progress + "%";
        progressPercent.textContent = Math.round(progress) + "%";
        alert("출석이 완료되었습니다!");
        isAttended = true;
        attendanceBtn.disabled = true;
        markAttendance(today.getDate());
    });

    // ✅ 이전 달 보기 버튼
    prevMonthBtn.addEventListener("click", function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    // ✅ 다음 달 보기 버튼
    nextMonthBtn.addEventListener("click", function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    // ✅ 달력 업데이트 함수
    function updateCalendar() {
    let today = new Date(); // 현재 날짜 가져오기
    let formattedDate = `${currentYear} / ${(currentMonth + 1).toString().padStart(2, "0")} / ${today.getDate().toString().padStart(2, "0")}`;
    
    currentDateText.textContent = formattedDate;
    createCalendar(currentYear, currentMonth);
}

    // ✅ 달력 생성 함수
    function createCalendar(year, month) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let firstDay = new Date(year, month, 1).getDay();
        let calendarHTML = "<table class='calendar-table'><tr>";

        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        for (let day of daysOfWeek) {
            calendarHTML += `<th>${day}</th>`;
        }
        calendarHTML += "</tr><tr>";

        for (let i = 0; i < firstDay; i++) {
            calendarHTML += "<td></td>";
        }

        for (let day = 1; day <= daysInMonth; day++) {
            if ((firstDay + day - 1) % 7 === 0) {
                calendarHTML += "</tr><tr>";
            }

            let todayClass = (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) ? "highlight-today" : "";
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
                cell.classList.add("attended");
            }
        });
    }

    updateCalendar();
});
