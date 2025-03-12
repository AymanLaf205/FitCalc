export type BodyType = 'ectomorph' | 'mesomorph' | 'endomorph'

export interface UserData {
  name: string
  age: number
  gender: 'male' | 'female'
  weight: number // in kg
  height: number // in cm
  bodyType: BodyType
  weightGoal: 'gainWeight' | 'loseWeight' | 'maintainWeight'
  weightChangeAmount?: number  // Optional as it's only needed for gain/lose
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive'
  healthConditions: string[] // Now includes weight goals
}

export interface Macronutrients {
  protein: number
  fat: number
  carbohydrates: number
}

export interface Micronutrients {
  vitaminA: number
  vitaminC: number
  vitaminB12: number
  iron: number
  calcium: number
  magnesium: number
  potassium: number
  sodium: number
}

export interface NutritionPlan {
  calories: number
  hydration: number
  sleepDuration: number
  macronutrients: Macronutrients
  micronutrients: Micronutrients
}

