export interface UserData {
  name: string
  age: number
  gender: "male" | "female" | "none"
  weight: number // in kg
  height: number // in cm
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very active"
  healthConditions: string[] // Now includes weight goals
  weightGoal: "gain" | "lose" | "maintain"
}

export interface NutritionPlan {
  calories: number
  macronutrients: {
    protein: number
    fat: number
    carbohydrates: number
  }
  micronutrients: {
    vitaminA: number
    vitaminC: number
    vitaminB12: number
    iron: number
    calcium: number
    magnesium: number
    potassium: number
    sodium: number
  }
  hydration: number
  sleepDuration: number
}

