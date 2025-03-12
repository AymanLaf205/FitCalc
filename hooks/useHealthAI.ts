import { useState } from "react"
import type { UserData, NutritionPlan, BodyType } from "../types/health"

export function useHealthAI() {
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null)

  const calculateBMR = (data: UserData) => {
    // Harris-Benedict Formula
    const { weight, height, age, gender } = data
    if (gender === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    }
  }

  const getActivityMultiplier = (activityLevel: UserData['activityLevel']) => {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    } as const
    return multipliers[activityLevel]
  }

  const getBodyTypeMultiplier = (bodyType: BodyType) => {
    const multipliers = {
      ectomorph: 1.1,  // Higher metabolism, needs more calories
      mesomorph: 1.0,  // Average metabolism
      endomorph: 0.9   // Lower metabolism, needs fewer calories
    } as const
    return multipliers[bodyType]
  }

  const calculateCalories = (bmr: number, data: UserData) => {
    const activityMultiplier = getActivityMultiplier(data.activityLevel)
    const bodyTypeMultiplier = getBodyTypeMultiplier(data.bodyType)
    let calories = bmr * activityMultiplier * bodyTypeMultiplier

    // Adjust calories based on weight goal
    if (data.weightGoal === 'gainWeight' && data.weightChangeAmount) {
      // To gain 1kg/week, need extra 1000 calories/day
      calories += (data.weightChangeAmount * 1000) / 7
    } else if (data.weightGoal === 'loseWeight' && data.weightChangeAmount) {
      // To lose 1kg/week, need deficit of 1000 calories/day
      calories -= (data.weightChangeAmount * 1000) / 7
    }

    return Math.round(calories)
  }

  const calculateMacronutrients = (calories: number, data: UserData) => {
    let proteinRatio, fatRatio, carbRatio

    switch(data.bodyType) {
      case 'ectomorph':
        // Higher carbs for fast metabolism
        proteinRatio = 0.25
        fatRatio = 0.2
        carbRatio = 0.55
        break
      case 'mesomorph':
        // Balanced distribution
        proteinRatio = 0.3
        fatRatio = 0.3
        carbRatio = 0.4
        break
      case 'endomorph':
        // Higher protein and fat, lower carbs
        proteinRatio = 0.35
        fatRatio = 0.35
        carbRatio = 0.3
        break
      default:
        proteinRatio = 0.3
        fatRatio = 0.3
        carbRatio = 0.4
    }

    // Adjust for weight goals
    if (data.weightGoal === 'gainWeight') {
      proteinRatio += 0.05
      carbRatio += 0.05
      fatRatio -= 0.1
    } else if (data.weightGoal === 'loseWeight') {
      proteinRatio += 0.1
      carbRatio -= 0.15
      fatRatio += 0.05
    }

    return {
      protein: Math.round((calories * proteinRatio) / 4),  // 4 calories per gram of protein
      fat: Math.round((calories * fatRatio) / 9),          // 9 calories per gram of fat
      carbohydrates: Math.round((calories * carbRatio) / 4) // 4 calories per gram of carbs
    }
  }

  const calculateMicronutrients = (calories: number, data: UserData) => {
    // Base values scaled by calories and adjusted for body type and goals
    const baseMultiplier = calories / 2000 // Scale based on caloric needs
    const activityMultiplier = getActivityMultiplier(data.activityLevel)
    
    let micronutrients = {
      vitaminA: Math.round(900 * baseMultiplier), // mcg
      vitaminC: Math.round(90 * baseMultiplier), // mg
      vitaminB12: Math.round(2.4 * baseMultiplier * 10) / 10, // mcg
      iron: Math.round(18 * baseMultiplier), // mg
      calcium: Math.round(1000 * baseMultiplier), // mg
      magnesium: Math.round(400 * baseMultiplier), // mg
      potassium: Math.round(3500 * baseMultiplier), // mg
      sodium: Math.round(2300 * baseMultiplier) // mg
    }

    // Adjust based on activity level and goals
    if (data.activityLevel === 'active' || data.activityLevel === 'veryActive') {
      micronutrients.potassium *= 1.2
      micronutrients.magnesium *= 1.2
      micronutrients.sodium *= 1.15
    }

    if (data.weightGoal === 'gainWeight') {
      micronutrients.calcium *= 1.2
      micronutrients.vitaminA *= 1.2  // Changed from vitaminD to vitaminA
    } else if (data.weightGoal === 'loseWeight') {
      micronutrients.iron *= 1.2
      micronutrients.vitaminC *= 1.2
    }

    return micronutrients
  }

  const calculatePlan = (data: UserData) => {
    const bmr = calculateBMR(data)
    const calories = calculateCalories(bmr, data)
    const macronutrients = calculateMacronutrients(calories, data)
    const micronutrients = calculateMicronutrients(calories, data)

    // Calculate hydration (in ml)
    const baseHydration = data.weight * 35 // 35ml per kg of body weight
    const activityMultiplier = getActivityMultiplier(data.activityLevel)
    const hydration = Math.round(baseHydration * activityMultiplier)

    // Calculate sleep duration (in hours)
    let sleepDuration = 8
    if (data.age < 18) sleepDuration = 9
    else if (data.age > 65) sleepDuration = 7.5
    
    if (data.activityLevel === 'active' || data.activityLevel === 'veryActive') {
      sleepDuration += 0.5
    }

    setNutritionPlan({
      calories,
      hydration,
      sleepDuration,
      macronutrients,
      micronutrients
    })
  }

  return { nutritionPlan, calculatePlan }
}

