"use strict";

const BMI_CATEGORIES = [
  { max: 18.5, label: "저체중" },
  { max: 23, label: "정상" },
  { max: 25, label: "비만 전단계" },
  { max: 30, label: "1단계 비만" },
  { max: 35, label: "2단계 비만" },
  { max: Infinity, label: "3단계 비만" },
];

function getBmiCategory(bmi) {
  return BMI_CATEGORIES.find((category) => bmi < category.max).label;
}

function formatWeight(weight) {
  return new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(weight);
}

const form = document.querySelector("#bmi-form");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const errorMessage = document.querySelector("#form-error");
const result = document.querySelector("#result");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const heightCm = Number(heightInput.value);
  const weightKg = Number(weightInput.value);

  if (!Number.isFinite(heightCm) || heightCm <= 0 ||
      !Number.isFinite(weightKg) || weightKg <= 0) {
    errorMessage.textContent = "키와 몸무게를 0보다 큰 숫자로 입력해 주세요.";
    errorMessage.hidden = false;
    result.hidden = true;
    return;
  }

  errorMessage.hidden = true;
  const heightMeters = heightCm / 100;
  const bmi = weightKg / (heightMeters * heightMeters);
  const lowerWeight = 18.5 * heightMeters * heightMeters;
  const upperWeight = 22.9 * heightMeters * heightMeters;

  document.querySelector("#bmi-value").textContent = bmi.toFixed(1);
  document.querySelector("#bmi-category").textContent = getBmiCategory(bmi);
  document.querySelector("#weight-range").textContent =
    `${formatWeight(lowerWeight)}–${formatWeight(upperWeight)} kg`;
  result.hidden = false;
});

for (const input of [heightInput, weightInput]) {
  input.addEventListener("input", () => {
    errorMessage.hidden = true;
  });
}
