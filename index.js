exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const { type } = body;

    switch (type) {
      case "bmi":
        return response(calculateBMI(body));
      case "tdee":
        return response(calculateTDEE(body));
      case "bodyfat":
        return response(calculateBodyFat(body));
      case "ideal":
        return response(calculateIdealWeight(body));
      default:
        return response("Geçersiz hesaplama tipi.");
    }
  };
  
  const response = (result) => ({
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
  });
  
  //BMI Hesabı
  function calculateBMI({ weight, height }) {

    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    const rounded = bmi.toFixed(1);
  
    let yorum = "";
    if (bmi < 18.5) yorum = "Zayıf";
    else if (bmi < 25) yorum = "Normal";
    else if (bmi < 30) yorum = "Fazla Kilolu";
    else yorum = "Obez";
  
    return {
      bmi: `BMI: ${rounded} (${yorum})`,
    };
  }
  
  //TDEE ve BMR Hesabı
  function calculateTDEE({ weight, height, age, activity, gender }) {
  
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  
    const activityFactors = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very: 1.9,
    };
  
    const factor = activityFactors[activity];
    const tdee = Math.round(bmr * factor);
  
    return {
      tdee: `Günlük Kalori İhtiyacınız: ${tdee} kcal<br>BMR: ${Math.round(bmr)} kcal (Bu değerin altına düşmeyin.)`,
    };
  }
  
  //Yağ Oranı Hesabı
  function calculateBodyFat({ weight, waist, neck, height }) {
    
    const log = Math.log10;
    const bodyFatPercentage = 495 / (1.0324 - 0.19077 * log(waist - neck) + 0.15456 * log(height)) - 450;
    const fatMass = (bodyFatPercentage / 100) * weight;
  
    return {
      bodyFat: `Vücut Yağ Oranı: ${bodyFatPercentage.toFixed(1)}%<br>Yağ Kütlesi: ${fatMass.toFixed(1)} kg`,
    };
  }
  
  //İdeal Kilo Hesabı
  function calculateIdealWeight({ height, gender }) {
  
    const base = height - 100;
    const ideal = gender === "male" ? base - base * 0.1 : base - base * 0.15;
  
    return {
      idealWeight: `İdeal Kilo: ${ideal.toFixed(1)} kg`,
    };
  }
  