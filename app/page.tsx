"use client"

import { useState } from "react"
import { UserDataForm } from "../components/UserDataForm"
import { NutritionPlanResults } from "../components/NutritionPlanResults"
import { useHealthAI } from "../hooks/useHealthAI"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Brain, Sparkles, Salad, Activity } from "lucide-react"
import { useLanguage } from "@/components/LanguageProvider"
import { translations } from "@/utils/translations"

export default function Home() {
  const { userData, nutritionPlan, calculatePlan } = useHealthAI()
  const [showResults, setShowResults] = useState(false)
  const { language } = useLanguage()
  const t = translations[language]

  const handleFormSubmit = (data) => {
    calculatePlan(data)
    setShowResults(true)
    // Scroll to top when showing results
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      className={`container mx-auto py-8 px-4 md:py-12 ${language === "ar" ? "font-cairo" : ""}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl mx-auto">
        {!showResults ? (
          <>
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                <Sparkles className="h-6 w-6 text-primary animate-pulse-slow" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-heading">{t.title}</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t.description}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-primary/5 border border-primary/10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">{t.features.analysis.title}</h3>
                <p className="text-muted-foreground text-sm">{t.features.analysis.description}</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-primary/5 border border-primary/10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Salad className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">{t.features.nutrition.title}</h3>
                <p className="text-muted-foreground text-sm">{t.features.nutrition.description}</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-primary/5 border border-primary/10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">{t.features.lifestyle.title}</h3>
                <p className="text-muted-foreground text-sm">{t.features.lifestyle.description}</p>
              </div>
            </div>

            <UserDataForm onSubmit={handleFormSubmit} />
          </>
        ) : (
          <div className="space-y-6">
            {nutritionPlan && <NutritionPlanResults plan={nutritionPlan} />}
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => setShowResults(false)}
                variant="outline"
                className="flex items-center gap-2"
                size="lg"
              >
                <ArrowLeft className="h-4 w-4" />
                {t.results.backToForm}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

