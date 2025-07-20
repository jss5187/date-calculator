document.addEventListener("DOMContentLoaded", () => {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const calculateBtn = document.getElementById("calculateBtn");
  const resultDiv = document.getElementById("result");

  // 페이지 로드 시 오늘 날짜로 기본값 설정
  const today = new Date().toISOString().split("T")[0];
  startDateInput.value = today;
  endDateInput.value = today;

  // 버튼 상태 관리
  function setButtonLoading(isLoading) {
    if (isLoading) {
      calculateBtn.textContent = "계산 중...";
      calculateBtn.disabled = true;
      calculateBtn.style.opacity = "0.7";
    } else {
      calculateBtn.textContent = "계산하기";
      calculateBtn.disabled = false;
      calculateBtn.style.opacity = "1";
    }
  }

  // 결과 애니메이션과 함께 표시
  function showResult(message) {
    resultDiv.style.opacity = "0";
    setTimeout(() => {
      resultDiv.innerHTML = message;
      resultDiv.style.opacity = "1";
    }, 150);
  }

  // 날짜 차이 계산 및 상세 정보 제공
  function calculateDateDifference() {
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (!startDate || !endDate) {
      showResult("📅 시작일과 종료일을 모두 선택해주세요.");
      return;
    }

    setButtonLoading(true);

    // 실제 계산 시뮬레이션을 위한 약간의 지연
    setTimeout(() => {
      const date1 = new Date(startDate);
      const date2 = new Date(endDate);

      // UTC 기준으로 변환하여 시간대 문제 방지
      const utc1 = Date.UTC(
        date1.getFullYear(),
        date1.getMonth(),
        date1.getDate()
      );
      const utc2 = Date.UTC(
        date2.getFullYear(),
        date2.getMonth(),
        date2.getDate()
      );

      const diffTime = utc2 - utc1;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let resultMessage = "";

      if (diffDays === 0) {
        resultMessage = `
                    <div style="font-size: 1.5rem;">🎯</div>
                    <div style="margin-top: 0.5rem;">두 날짜는 <strong>같은 날</strong>입니다!</div>
                `;
      } else if (diffDays > 0) {
        const weeks = Math.floor(diffDays / 7);
        const remainingDays = diffDays % 7;
        const months = Math.floor(diffDays / 30);
        const years = Math.floor(diffDays / 365);

        let additionalInfo = "";
        if (diffDays >= 7) {
          additionalInfo = `<div style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-light);">`;
          if (years > 0) {
            additionalInfo += `약 ${years}년 `;
          }
          if (months > 0) {
            additionalInfo += `${months}개월 `;
          }
          if (weeks > 0) {
            additionalInfo += `${weeks}주`;
            if (remainingDays > 0) {
              additionalInfo += ` ${remainingDays}일`;
            }
          }
          additionalInfo += `</div>`;
        }

        resultMessage = `
                    <div style="font-size: 1.5rem;">📊</div>
                    <div style="margin-top: 0.5rem;">두 날짜의 차이는 <strong>${diffDays}</strong>일 입니다</div>
                    ${additionalInfo}
                `;
      } else {
        const absDays = Math.abs(diffDays);
        const weeks = Math.floor(absDays / 7);
        const remainingDays = absDays % 7;

        let additionalInfo = "";
        if (absDays >= 7) {
          additionalInfo = `<div style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-light);">`;
          if (weeks > 0) {
            additionalInfo += `${weeks}주`;
            if (remainingDays > 0) {
              additionalInfo += ` ${remainingDays}일`;
            }
          }
          additionalInfo += ` 전</div>`;
        }

        resultMessage = `
                    <div style="font-size: 1.5rem;">⏰</div>
                    <div style="margin-top: 0.5rem;">시작일로부터 <strong>${absDays}</strong>일 전입니다</div>
                    ${additionalInfo}
                `;
      }

      showResult(resultMessage);
      setButtonLoading(false);

      // 결과가 표시되면 부드럽게 스크롤
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          resultDiv.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 200);
      }
    }, 300);
  }

  // 계산 버튼 클릭 이벤트
  calculateBtn.addEventListener("click", calculateDateDifference);

  // Enter 키로도 계산할 수 있도록
  [startDateInput, endDateInput].forEach((input) => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        calculateDateDifference();
      }
    });
  });

  // 날짜 입력 시 실시간 유효성 검사
  startDateInput.addEventListener("change", () => {
    if (startDateInput.value && endDateInput.value) {
      // 자동 계산 옵션 (선택사항)
      // calculateDateDifference();
    }
  });

  endDateInput.addEventListener("change", () => {
    if (startDateInput.value && endDateInput.value) {
      // 자동 계산 옵션 (선택사항)
      // calculateDateDifference();
    }
  });

  // 모바일에서 날짜 선택기 개선을 위한 터치 이벤트
  if ("ontouchstart" in window) {
    [startDateInput, endDateInput].forEach((input) => {
      input.addEventListener("touchstart", () => {
        input.style.transform = "scale(0.98)";
      });

      input.addEventListener("touchend", () => {
        setTimeout(() => {
          input.style.transform = "scale(1)";
        }, 100);
      });
    });
  }

  // 페이지 로드 시 첫 계산 실행 (같은 날짜이므로 데모 효과)
  setTimeout(() => {
    showResult("📅 시작일과 종료일을 선택하고 계산해보세요!");
  }, 500);
});
