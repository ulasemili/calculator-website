// Sekme kontrolü
const tabs = document.querySelectorAll('.tab');
const forms = document.querySelectorAll('form');
const formTitle = document.getElementById('formTitle');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    forms.forEach(form => form.classList.remove('active'));
    document.getElementById(tab.dataset.form).classList.add('active');

    switch (tab.dataset.form) {
      case 'bmi':
        formTitle.textContent = 'BMI Hesaplayıcı';
        break;
      case 'tdee':
        formTitle.textContent = 'TDEE Hesaplayıcı';
        break;
      case 'bodyfat':
        formTitle.textContent = 'Vücut Yağ Oranı Hesaplayıcı';
        break;
      case 'ideal':
        formTitle.textContent = 'İdeal Kilo Hesaplayıcı';
        break;
    }

    document.getElementById("result").textContent = "";
  });
});

const API_URL = "https://j8inyto8bb.execute-api.eu-north-1.amazonaws.com/prod/bmi";

// BMI Hesaplama
document.getElementById("bmi").addEventListener("submit", async function (event) {
  event.preventDefault();
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "bmi", weight, height })
    });

    const data = await response.json();
    document.getElementById("result").textContent = `BMI Sonucunuz: ${data.bmi}`;
  } catch (error) {
    document.getElementById("result").textContent = "Bir hata oluştu.";
  }
});

// TDEE Hesaplama
document.getElementById("tdee").addEventListener("submit", async function (event) {
  event.preventDefault();
  const weight = document.getElementById("tdeeWeight").value;
  const height = document.getElementById("tdeeHeight").value;
  const age = document.getElementById("age").value;
  const activity = document.getElementById("activity").value;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "tdee", weight, height, age, activity })
    });

    const data = await response.json();
    document.getElementById("result").textContent = `TDEE Sonucunuz: ${data.tdee} kcal`;
  } catch (error) {
    document.getElementById("result").textContent = "Bir hata oluştu.";
  }
});

// Body Fat Hesaplama
document.getElementById("bodyfat").addEventListener("submit", async function (event) {
  event.preventDefault();
  const weight = document.getElementById("bfWeight").value;
  const waist = document.getElementById("waist").value;
  const neck = document.getElementById("neck").value;
  const height = document.getElementById("bfHeight").value;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "bodyfat", weight, waist, neck, height })
    });

    const data = await response.json();
    document.getElementById("result").textContent = `Vücut Yağ Oranınız: ${data.bodyFat}`;
  } catch (error) {
    document.getElementById("result").textContent = "Bir hata oluştu.";
  }
});

// Ideal Weight Hesaplama
document.getElementById("ideal").addEventListener("submit", async function (event) {
  event.preventDefault();
  const height = document.getElementById("idealHeight").value;
  const gender = document.getElementById("gender").value.toLowerCase();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "ideal", height, gender })
    });

    const data = await response.json();
    document.getElementById("result").textContent = `İdeal Kilonuz: ${data.idealWeight}`;
  } catch (error) {
    document.getElementById("result").textContent = "Bir hata oluştu.";
  }
});
