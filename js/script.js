document.addEventListener('DOMContentLoaded', () => {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    // 페이지 로드 시 오늘 날짜로 기본값 설정
    const today = new Date().toISOString().split('T')[0];
    startDateInput.value = today;
    endDateInput.value = today;

    calculateBtn.addEventListener('click', () => {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        if (!startDate || !endDate) {
            resultDiv.innerHTML = '시작일과 종료일을 모두 선택해주세요.';
            return;
        }

        const date1 = new Date(startDate);
        const date2 = new Date(endDate);

        // UTC 기준으로 변환하여 시간대 문제 방지
        const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
        
        const diffTime = utc2 - utc1;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays === 0) {
             resultDiv.innerHTML = '두 날짜는 같은 날입니다.';
        } else if (diffDays > 0) {
            resultDiv.innerHTML = `두 날짜의 차이는 <strong>${diffDays}</strong>일 입니다.`;
        } else {
            resultDiv.innerHTML = `시작일로부터 <strong>${Math.abs(diffDays)}</strong>일 전입니다.`;
        }
    });
});
