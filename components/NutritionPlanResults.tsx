import type { NutritionPlan } from "../types/health"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Apple, Droplets, Moon, Salad, Utensils } from "lucide-react"
import { useLanguage } from "./LanguageProvider"
import { translations } from "@/utils/translations"

interface NutritionPlanResultsProps {
  plan: NutritionPlan
}

export function NutritionPlanResults({ plan }: NutritionPlanResultsProps) {
  const { language } = useLanguage()
  const t = translations[language].results

  // Calculate percentages for macronutrients
  const totalMacros = plan.macronutrients.protein + plan.macronutrients.fat + plan.macronutrients.carbohydrates
  const proteinPercentage = Math.round((plan.macronutrients.protein / totalMacros) * 100)
  const fatPercentage = Math.round((plan.macronutrients.fat / totalMacros) * 100)
  const carbsPercentage = Math.round((plan.macronutrients.carbohydrates / totalMacros) * 100)

  return (
    <div className="results-container animate-fade-in" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="grid gap-4 sm:gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold gradient-heading">{t.title}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Utensils className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                {t.calories}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <span className="text-3xl sm:text-4xl font-bold">{plan.calories}</span>
                <span className="text-sm sm:text-base text-muted-foreground mb-1">{language === "ar" ? "سعرة حرارية" : "calories"}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                {t.hydration}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <span className="text-3xl sm:text-4xl font-bold">{Math.round((plan.hydration / 1000) * 10) / 10}</span>
                <span className="text-sm sm:text-base text-muted-foreground mb-1">{language === "ar" ? "لتر" : "liters"}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                {t.sleep}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <span className="text-3xl sm:text-4xl font-bold">{plan.sleepDuration}</span>
                <span className="text-sm sm:text-base text-muted-foreground mb-1">{language === "ar" ? "ساعات" : "hours"}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Salad className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              {t.macronutrients}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <span>{t.protein}</span>
                  </div>
                  <span className="font-medium">
                    {plan.macronutrients.protein}g ({proteinPercentage}%)
                  </span>
                </div>
                <Progress value={proteinPercentage} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span>{t.fat}</span>
                  </div>
                  <span className="font-medium">
                    {plan.macronutrients.fat}g ({fatPercentage}%)
                  </span>
                </div>
                <Progress value={fatPercentage} className="h-2 bg-muted [&>div]:bg-yellow-500" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>{t.carbohydrates}</span>
                  </div>
                  <span className="font-medium">
                    {plan.macronutrients.carbohydrates}g ({carbsPercentage}%)
                  </span>
                </div>
                <Progress value={carbsPercentage} className="h-2 bg-muted [&>div]:bg-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Apple className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              {t.micronutrients}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
              <div className="stat-card p-2 sm:p-3">
                <div className="text-xs sm:text-sm text-muted-foreground">{t.vitamins.vitaminA}</div>
                <div className="text-lg sm:text-xl font-bold mt-1">
                  {plan.micronutrients.vitaminA} <span className="text-xs sm:text-sm font-normal">{t.units.mcg}</span>
                </div>
              </div>

              <div className="stat-card p-2 sm:p-3">
                <div className="text-xs sm:text-sm text-muted-foreground">{t.vitamins.vitaminC}</div>
                <div className="text-lg sm:text-xl font-bold mt-1">
                  {plan.micronutrients.vitaminC} <span className="text-xs sm:text-sm font-normal">{t.units.mg}</span>
                </div>
              </div>

              <div className="stat-card p-2 sm:p-3">
                <div className="text-xs sm:text-sm text-muted-foreground">{t.vitamins.vitaminB12}</div>
                <div className="text-lg sm:text-xl font-bold mt-1">
                  {plan.micronutrients.vitaminB12} <span className="text-xs sm:text-sm font-normal">{t.units.mcg}</span>
                </div>
              </div>

              <div className="stat-card p-2 sm:p-3">
                <div className="text-xs sm:text-sm text-muted-foreground">{t.minerals.iron}</div>
                <div className="text-lg sm:text-xl font-bold mt-1">
                  {plan.micronutrients.iron} <span className="text-xs sm:text-sm font-normal">{t.units.mg}</span>
                </div>
              </div>

              <div className="stat-card p-2 sm:p-3">
                <div className="text-xs sm:text-sm text-muted-foreground">{t.minerals.calcium}</div>
                <div className="text-lg sm:text-xl font-bold mt-1">
                  {plan.micronutrients.calcium} <span className="text-xs sm:text-sm font-normal">{t.units.mg}</span>
                </div>
              </div>

              <div className="stat-card p-2 sm:p-3">
                <div className="text-xs sm:text-sm text-muted-foreground">{t.minerals.magnesium}</div>
                <div className="text-lg sm:text-xl font-bold mt-1">
                  {plan.micronutrients.magnesium} <span className="text-xs sm:text-sm font-normal">{t.units.mg}</span>
                </div>
              </div>

              <div className="stat-card p-2 sm:p-3">
                <div className="text-xs sm:text-sm text-muted-foreground">{t.minerals.potassium}</div>
                <div className="text-lg sm:text-xl font-bold mt-1">
                  {plan.micronutrients.potassium} <span className="text-xs sm:text-sm font-normal">{t.units.mg}</span>
                </div>
              </div>

              <div className="stat-card p-2 sm:p-3">
                <div className="text-xs sm:text-sm text-muted-foreground">{t.minerals.sodium}</div>
                <div className="text-lg sm:text-xl font-bold mt-1">
                  {plan.micronutrients.sodium} <span className="text-xs sm:text-sm font-normal">{t.units.mg}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

