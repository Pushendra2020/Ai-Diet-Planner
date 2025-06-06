const calculateBMI = (weight, height) =>
  +(weight / (height / 100) ** 2).toFixed(2);

const calculateBMR = (weight, height, age, gender) =>
  gender === "male"
    ? +(10 * weight + 6.25 * height - 5 * age + 5).toFixed(2)
    : +(10 * weight + 6.25 * height - 5 * age - 161).toFixed(2);


const getActivityFactor = (activityLevel) => {
  const factors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    "very active": 1.9,
  };
  return factors[activityLevel] || 1.2;
};

const calculateTDEE = (bmr, activityLevel) =>
  +(bmr * getActivityFactor(activityLevel)).toFixed(2);

const calculateCalorieNeeds = (tdee, goal) => {
  if (goal === "maintain") return tdee;
  if (goal === "lose") return tdee - 500;
  if (goal === "gain") return tdee + 500;
  return tdee;
};


export {
    calculateBMI,
    calculateBMR,
    calculateTDEE,
    calculateCalorieNeeds
}