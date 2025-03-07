import { useState } from "react"
import type { UserData, NutritionPlan } from "../types/health"
import { generateNutritionPlan } from "../utils/healthCalculations"

export function useHealthAI() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null)

  const calculatePlan = (data: UserData) => {
    setUserData(data)
    const plan = generateNutritionPlan(data)
    setNutritionPlan(plan)
  }

  return { userData, nutritionPlan, calculatePlan }
}

