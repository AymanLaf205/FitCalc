import type { UserData, NutritionPlan } from "../types/health"

export function calculateBMR(userData: UserData): number {
  const { gender, weight, height, age } = userData
  if (gender === "male") {
    return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
  } else {
    return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
  }
}

export function calculateTDEE(userData: UserData): number {
  const bmr = calculateBMR(userData)
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  }
  return bmr * activityMultipliers[userData.activityLevel]
}

export function generateNutritionPlan(userData: UserData): NutritionPlan {
  const tdee = calculateTDEE(userData)

  // This is a simplified calculation. In a real AI system, these would be more sophisticated.
  const plan: NutritionPlan = {
    calories: Math.round(tdee),
    macronutrients: {
      protein: Math.round((tdee * 0.3) / 4), // 30% of calories from protein
      fat: Math.round((tdee * 0.3) / 9), // 30% of calories from fat
      carbohydrates: Math.round((tdee * 0.4) / 4), // 40% of calories from carbs
    },
    micronutrients: {
      vitaminA: 900, // in mcg
      vitaminC: 90, // in mg
      vitaminB12: 2.4, // in mcg
      iron: 18, // in mg
      calcium: 1000, // in mg
      magnesium: 400, // in mg
      potassium: 3500, // in mg
      sodium: 2300, // in mg
    },
    hydration: Math.round(userData.weight * 0.033 * 1000), // 33 ml per kg of body weight
    sleepDuration: userData.age > 18 ? 8 : 9, // 8 hours for adults, 9 for younger
  }

  // Adjust for health conditions (simplified)
  if (userData.healthConditions.includes("diabetes")) {
    plan.macronutrients.carbohydrates = Math.round(plan.macronutrients.carbohydrates * 0.8)
    plan.macronutrients.protein = Math.round(plan.macronutrients.protein * 1.1)
  }

  if (userData.healthConditions.includes("hypertension")) {
    plan.micronutrients.sodium = 1500
    plan.micronutrients.potassium = 4700
  }

  if (userData.healthConditions.includes("cholesterol")) {
    plan.macronutrients.fat = Math.round(plan.macronutrients.fat * 0.8)
    plan.macronutrients.protein = Math.round(plan.macronutrients.protein * 1.1)
  }

  return plan
}

