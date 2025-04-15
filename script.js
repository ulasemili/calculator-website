document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const forms = document.querySelectorAll("form");
  const formTitle = document.getElementById("formTitle");
  const resultBox = document.getElementById("result");

  const titles = {
    bmi: "BMI Hesaplayıcı",
    tdee: "Günlük Kalori İhtiyacı Hesaplayıcı",
    bodyfat: "Vücut Yağ Oranı Hesaplayıcı",
    ideal: "İdeal Kilo Hesaplayıcı",
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const selectedForm = tab.dataset.form;
      forms.forEach((form) => form.classList.remove("active"));
      document.getElementById(selectedForm).classList.add("active");

      formTitle.textContent = titles[selectedForm];
      resultBox.textContent = "";
    });
  });
});

const API_URL = "https://j8inyto8bb.execute-api.eu-north-1.amazonaws.com/prod/bmi";

async function sendToApi(payload, resultKey) {
  const resultBox = document.getElementById("result");
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data[resultKey]) {
      resultBox.innerHTML = data[resultKey];
    } else {
      resultBox.textContent = "Geçerli bir sonuç alınamadı.";
    }
  } catch (err) {
    resultBox.textContent = "Bir hata oluştu.";
    console.error(err);
  }
}

// BMI
document.getElementById("bmi").addEventListener("submit", function (e) {
  e.preventDefault();
  const weight = +document.getElementById("weight").value;
  const height = +document.getElementById("height").value;
  sendToApi({ type: "bmi", weight, height }, "bmi");
});

// TDEE
document.getElementById("tdee").addEventListener("submit", function (e) {
  e.preventDefault();
  const weight = +document.getElementById("tdeeWeight").value;
  const height = +document.getElementById("tdeeHeight").value;
  const age = +document.getElementById("age").value;
  const activity = document.getElementById("activity").value;
  const gender = document.getElementById("tdeeGender").value;
  sendToApi({ type: "tdee", weight, height, age, activity, gender }, "tdee");
});

// Yağ Oranı
document.getElementById("bodyfat").addEventListener("submit", function (e) {
  e.preventDefault();
  const weight = +document.getElementById("bfWeight").value;
  const waist = +document.getElementById("waist").value;
  const neck = +document.getElementById("neck").value;
  const height = +document.getElementById("bfHeight").value;
  sendToApi({ type: "bodyfat", weight, waist, neck, height }, "bodyFat");
});

// İdeal Kilo
document.getElementById("ideal").addEventListener("submit", function (e) {
  e.preventDefault();
  const height = +document.getElementById("idealHeight").value;
  const gender = document.getElementById("idealGender").value;
  sendToApi({ type: "ideal", height, gender }, "idealWeight");
});
