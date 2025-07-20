document.addEventListener("DOMContentLoaded", () => {
  // DOM 요소들
  const presetSelect = document.getElementById("presetSelect");
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const startLabel = document.getElementById("startLabel");
  const endLabel = document.getElementById("endLabel");
  const calculateBtn = document.getElementById("calculateBtn");
  const resultDiv = document.getElementById("result");
  const shareButtons = document.getElementById("shareButtons");
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.querySelector(".theme-icon");

  // 다크모드 관리
  function initTheme() {
    // localStorage에서 저장된 테마 확인
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // 저장된 테마가 있으면 우선, 없으면 시스템 설정 따라감
    const isDark = savedTheme ? savedTheme === "dark" : systemPrefersDark;

    applyTheme(isDark);
  }

  function applyTheme(isDark) {
    console.log("테마 적용:", isDark ? "dark" : "light");
    if (isDark) {
      document.body.classList.add("dark-mode");
      themeIcon.textContent = "☀️";
      console.log("다크모드 클래스 추가됨");
    } else {
      document.body.classList.remove("dark-mode");
      themeIcon.textContent = "🌙";
      console.log("라이트모드로 변경됨");
    }
  }

  function toggleTheme() {
    const isDark = document.body.classList.contains("dark-mode");
    const newTheme = !isDark;

    applyTheme(newTheme);

    // localStorage에 저장
    localStorage.setItem("theme", newTheme ? "dark" : "light");

    // 버튼 애니메이션
    themeToggle.style.transform = "scale(0.9)";
    setTimeout(() => {
      themeToggle.style.transform = "scale(1)";
    }, 150);
  }

  // 테마 토글 이벤트
  themeToggle.addEventListener("click", toggleTheme);

  // 시스템 테마 변경 감지
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      // 수동 설정이 없을 때만 시스템 설정 따라감
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        applyTheme(e.matches);
      }
    });

  // 초기 테마 설정
  initTheme();

  // 프리셋 설정
  const presets = {
    general: {
      startLabel: "시작일",
      endLabel: "종료일",
      buttonText: "계산하기",
      calculateDays: (rawDays) => rawDays, // 일반 계산은 그대로
      getMessage: (days, isPositive) => {
        if (days === 0)
          return {
            icon: "🎯",
            text: "두 날짜는 <strong>같은 날</strong>입니다!",
          };
        if (isPositive)
          return {
            icon: "📊",
            text: `두 날짜의 차이는 <strong>${days}</strong>일 입니다`,
          };
        return {
          icon: "⏰",
          text: `시작일로부터 <strong>${Math.abs(days)}</strong>일 전입니다`,
        };
      },
    },
    couple: {
      startLabel: "사귀기 시작한 날",
      endLabel: "계산할 날짜",
      buttonText: "사랑의 날수 계산하기 💕",
      calculateDays: (rawDays) => (rawDays >= 0 ? rawDays + 1 : rawDays), // 시작한 날부터 1일째
      getMessage: (days, isPositive) => {
        if (days === 1)
          return {
            icon: "💕",
            text: "오늘이 바로 <strong>사귄 첫날</strong>이에요!",
          };
        if (isPositive) {
          let milestone = checkCoupleMilestone(days);
          return {
            icon: "💕",
            text: `사귄 지 <strong>${days}</strong>일째예요!${
              milestone
                ? `<br/><span class="special-milestone">🎉 ${milestone}!</span>`
                : ""
            }`,
          };
        }
        return { icon: "💔", text: "아직 사귀기 전이네요!" };
      },
    },
    baby: {
      startLabel: "아기 태어난 날",
      endLabel: "계산할 날짜",
      buttonText: "아기 성장일수 계산하기 👶",
      calculateDays: (rawDays) => (rawDays >= 0 ? rawDays + 1 : rawDays), // 태어난 날부터 1일째
      getMessage: (days, isPositive) => {
        if (days === 1)
          return {
            icon: "🎉",
            text: "오늘이 바로 <strong>출생 첫날</strong>이에요!",
          };
        if (isPositive) {
          let milestone = checkBabyMilestone(days);
          return {
            icon: "👶",
            text: `아기가 태어난 지 <strong>${days}</strong>일째예요!${
              milestone
                ? `<br/><span class="special-milestone">🎉 ${milestone}!</span>`
                : ""
            }`,
          };
        }
        return {
          icon: "🤰",
          text: `출산까지 <strong>${Math.abs(days)}</strong>일 남았어요!`,
        };
      },
    },
    military: {
      startLabel: "입대한 날",
      endLabel: "전역 예정일",
      buttonText: "전역까지 계산하기 🎖️",
      calculateDays: (rawDays) => rawDays, // 일반 계산
      getMessage: (days, isPositive) => {
        if (days === 0)
          return {
            icon: "🎉",
            text: "오늘이 바로 <strong>전역일</strong>입니다!",
          };
        if (isPositive)
          return {
            icon: "🎖️",
            text: `전역까지 <strong>${days}</strong>일 남았습니다!`,
          };
        return {
          icon: "👨‍✈️",
          text: `전역한 지 <strong>${Math.abs(days)}</strong>일 지났습니다!`,
        };
      },
    },
    exam: {
      startLabel: "오늘 날짜",
      endLabel: "시험 날짜",
      buttonText: "D-day 계산하기 📚",
      calculateDays: (rawDays) => rawDays, // 일반 계산
      getMessage: (days, isPositive) => {
        if (days === 0)
          return {
            icon: "🔥",
            text: "오늘이 바로 <strong>시험날</strong>입니다!",
          };
        if (isPositive)
          return {
            icon: "📚",
            text: `시험까지 <strong>${days}</strong>일 남았습니다!`,
          };
        return {
          icon: "😅",
          text: `시험이 <strong>${Math.abs(days)}</strong>일 전에 끝났네요!`,
        };
      },
    },
    anniversary: {
      startLabel: "기념일",
      endLabel: "계산할 날짜",
      buttonText: "기념일 계산하기 🎂",
      calculateDays: (rawDays) => rawDays, // 일반 계산
      getMessage: (days, isPositive) => {
        if (days === 0)
          return {
            icon: "🎉",
            text: "오늘이 바로 <strong>기념일</strong>이에요!",
          };
        if (isPositive)
          return {
            icon: "🎂",
            text: `기념일로부터 <strong>${days}</strong>일 지났어요!`,
          };
        return {
          icon: "⏰",
          text: `기념일까지 <strong>${Math.abs(days)}</strong>일 남았어요!`,
        };
      },
    },
    project: {
      startLabel: "프로젝트 시작일",
      endLabel: "마감일",
      buttonText: "마감까지 계산하기 💼",
      calculateDays: (rawDays) => rawDays, // 일반 계산
      getMessage: (days, isPositive) => {
        if (days === 0)
          return {
            icon: "🔥",
            text: "오늘이 바로 <strong>마감일</strong>입니다!",
          };
        if (isPositive)
          return {
            icon: "💼",
            text: `마감까지 <strong>${days}</strong>일 남았습니다!`,
          };
        return {
          icon: "⏰",
          text: `마감일이 <strong>${Math.abs(days)}</strong>일 지났습니다!`,
        };
      },
    },
  };

  // 커플 마일스톤 체크 (1일째부터 시작하므로 기존 값 유지)
  function checkCoupleMilestone(days) {
    const milestones = {
      100: "100일",
      200: "200일",
      365: "1주년",
      500: "500일",
      730: "2주년",
      1000: "1000일",
      1095: "3주년",
      1460: "4주년",
      1825: "5주년",
    };
    return milestones[days] || null;
  }

  // 아기 마일스톤 체크 (1일째부터 시작하므로 기존 값 유지)
  function checkBabyMilestone(days) {
    const milestones = {
      100: "백일",
      365: "돌",
      730: "두 돌",
    };
    return milestones[days] || null;
  }

  // 페이지 로드 시 초기 설정
  const today = new Date().toISOString().split("T")[0];
  startDateInput.value = today;
  endDateInput.value = today;

  // 프리셋 변경 시 UI 업데이트
  presetSelect.addEventListener("change", () => {
    const selectedPreset = presets[presetSelect.value];
    startLabel.textContent = selectedPreset.startLabel;
    endLabel.textContent = selectedPreset.endLabel;
    calculateBtn.textContent = selectedPreset.buttonText;

    // 결과 초기화
    showResult("📅 날짜를 선택하고 계산해보세요!");
    shareButtons.style.display = "none";
  });

  // 버튼 상태 관리
  function setButtonLoading(isLoading) {
    if (isLoading) {
      calculateBtn.textContent = "계산 중...";
      calculateBtn.disabled = true;
      calculateBtn.style.opacity = "0.7";
    } else {
      const preset = presets[presetSelect.value];
      calculateBtn.textContent = preset.buttonText;
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

  // 추가 정보 생성 (주, 월, 년 단위)
  function getAdditionalInfo(days) {
    if (Math.abs(days) < 7) return "";

    const absDays = Math.abs(days);
    const weeks = Math.floor(absDays / 7);
    const months = Math.floor(absDays / 30);
    const years = Math.floor(absDays / 365);

    let info =
      '<div style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-light);">';

    if (years > 0) {
      info += `약 ${years}년 `;
    }
    if (months > 0 && years === 0) {
      info += `${months}개월 `;
    }
    if (weeks > 0 && months === 0) {
      info += `${weeks}주 `;
      const remainingDays = absDays % 7;
      if (remainingDays > 0) {
        info += `${remainingDays}일 `;
      }
    }

    info += "</div>";
    return info;
  }

  // 날짜 차이 계산
  function calculateDateDifference() {
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (!startDate || !endDate) {
      showResult("📅 날짜를 모두 선택해주세요!");
      shareButtons.style.display = "none";
      return;
    }

    setButtonLoading(true);

    setTimeout(() => {
      const date1 = new Date(startDate);
      const date2 = new Date(endDate);

      // UTC 기준으로 변환
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
      const rawDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const selectedPreset = presets[presetSelect.value];
      // 프리셋별 계산 방식 적용
      const calculatedDays = selectedPreset.calculateDays(rawDays);

      const result = selectedPreset.getMessage(
        calculatedDays,
        calculatedDays >= 0
      );
      const additionalInfo = getAdditionalInfo(calculatedDays);

      const resultMessage = `
                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${result.icon}</div>
                <div style="margin-bottom: 0.5rem;">${result.text}</div>
                ${additionalInfo}
            `;

      showResult(resultMessage);
      setButtonLoading(false);

      // 공유 버튼 표시
      if (calculatedDays !== null) {
        shareButtons.style.display = "flex";
      }

      // 모바일에서 스크롤
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

  // 공유 기능들
  function copyToClipboard() {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("링크가 복사되었습니다!");
      })
      .catch(() => {
        // 복사 실패 시 fallback
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("링크가 복사되었습니다!");
      });
  }

  function shareNative() {
    const resultText = resultDiv.textContent || "날짜 차이를 계산해보세요!";
    const shareData = {
      title: "📅 날짜 차이 계산기",
      text: resultText,
      url: window.location.href,
    };

    // Web Share API 지원 확인 (주로 모바일에서 지원)
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("공유 성공"))
        .catch((error) => {
          console.log("공유 취소 또는 실패:", error);
          // 공유 실패 시 링크 복사로 fallback
          fallbackShare();
        });
    } else {
      // Web Share API 미지원 시 다른 방법 시도
      fallbackShare();
    }
  }

  function fallbackShare() {
    const resultText = resultDiv.textContent || "날짜 차이를 계산해보세요!";
    const shareText = `${resultText}\n\n${window.location.href}`;

    // 클립보드 복사 시도
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          alert("결과와 링크가 복사되었습니다!\n원하는 곳에 붙여넣기 하세요.");
        })
        .catch(() => {
          // 클립보드 실패 시 수동 복사
          manualCopy(shareText);
        });
    } else {
      manualCopy(shareText);
    }
  }

  function manualCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      alert("결과와 링크가 복사되었습니다!\n원하는 곳에 붙여넣기 하세요.");
    } catch (err) {
      // 모든 복사 방법 실패 시
      alert(
        `공유 링크: ${window.location.href}\n\n수동으로 복사해서 공유해주세요!`
      );
    }

    document.body.removeChild(textArea);
  }

  function saveResult() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 300;

    // 배경 그라데이션
    const gradient = ctx.createLinearGradient(0, 0, 400, 300);
    gradient.addColorStop(0, "#667eea");
    gradient.addColorStop(1, "#764ba2");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 300);

    // 텍스트
    ctx.fillStyle = "white";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("날짜 차이 계산기", 200, 50);

    ctx.font = "18px Arial";
    const resultText = resultDiv.textContent || "결과가 없습니다";
    ctx.fillText(resultText, 200, 150);

    // 다운로드
    const link = document.createElement("a");
    link.download = "date-calculator-result.png";
    link.href = canvas.toDataURL();
    link.click();
  }

  // 이벤트 리스너들
  calculateBtn.addEventListener("click", calculateDateDifference);

  // Enter 키 지원
  [startDateInput, endDateInput].forEach((input) => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        calculateDateDifference();
      }
    });
  });

  // 공유 버튼 이벤트
  document
    .getElementById("copyLinkBtn")
    .addEventListener("click", copyToClipboard);
  document
    .getElementById("shareKakaoBtn")
    .addEventListener("click", shareNative);
  document
    .getElementById("saveResultBtn")
    .addEventListener("click", saveResult);

  // 모바일 터치 효과
  if ("ontouchstart" in window) {
    [startDateInput, endDateInput, presetSelect].forEach((input) => {
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

  // 초기 설정 적용
  presetSelect.dispatchEvent(new Event("change"));

  // 초기 메시지 표시
  setTimeout(() => {
    showResult("📅 계산 유형을 선택하고 날짜를 입력해보세요!");
  }, 500);
});
