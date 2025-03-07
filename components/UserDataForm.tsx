"use client"

import type React from "react"

import { useState } from "react"
import type { UserData } from "../types/health"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, User, Weight, Ruler, Heart } from "lucide-react"
import { useLanguage } from "./LanguageProvider"
import { translations } from "@/utils/translations"

interface UserDataFormProps {
  onSubmit: (data: UserData) => void
}

export function UserDataForm({ onSubmit }: UserDataFormProps) {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    age: 0,
    gender: "male",
    weight: 0,
    height: 0,
    activityLevel: "sedentary",
    healthConditions: [],
    weightGoal: "maintain",
  })

  const { language } = useLanguage()
  const t = translations[language].form

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseFloat(value) || 0 }))
  }

  const handleSelectChange = (name: string, value: string) => {
     if (name === "healthConditions") {
      if (value === "none") {
        setFormData((prev) => ({ ...prev, healthConditions: [] }))
      } else {
        setFormData((prev) => ({
          ...prev,
          healthConditions: [value]
        }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="form-container animate-fade-in" dir={language === "ar" ? "rtl" : "ltr"}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2 text-center mb-8">
          <h2 className="text-3xl font-bold">{t.title}</h2>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              {t.name}
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              placeholder={t.name}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              {t.age}
            </Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age || ""}
              onChange={handleNumberChange}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              placeholder={t.age}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              {t.gender}
            </Label>
            <Select
              name="gender"
              value={formData.gender}
              onValueChange={(value) => handleSelectChange("gender", value)}
            >
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder={t.gender} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{t.male}</SelectItem>
                <SelectItem value="female">{t.female}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight" className="flex items-center gap-2">
              <Weight className="h-4 w-4 text-primary" />
              {t.weight}
            </Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              value={formData.weight || ""}
              onChange={handleNumberChange}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              placeholder={t.weight}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="height" className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-primary" />
              {t.height}
            </Label>
            <Input
              id="height"
              name="height"
              type="number"
              value={formData.height || ""}
              onChange={handleNumberChange}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              placeholder={t.height}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weightGoal" className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              {t.weightGoal}
            </Label>
            <Select
              name="weightGoal"
              value={formData.weightGoal}
              onValueChange={(value) => handleSelectChange("weightGoal", value)}
            >
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder={t.weightGoal} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gain">{t.gainWeight}</SelectItem>
                <SelectItem value="lose">{t.loseWeight}</SelectItem>
                <SelectItem value="maintain">{t.maintainWeight}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activityLevel" className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              {t.activityLevel}
            </Label>
            <Select
              name="activityLevel"
              value={formData.activityLevel}
              onValueChange={(value) => handleSelectChange("activityLevel", value)}
            >
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder={t.activityLevel} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">{t.activityLevels.sedentary}</SelectItem>
                <SelectItem value="light">{t.activityLevels.light}</SelectItem>
                <SelectItem value="moderate">{t.activityLevels.moderate}</SelectItem>
                <SelectItem value="active">{t.activityLevels.active}</SelectItem>
                <SelectItem value="very active">{t.activityLevels.veryActive}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="healthConditions" className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              {t.healthConditions}
            </Label>
            <Select
              name="healthConditions"
              value={formData.healthConditions[0] || "none"}
              onValueChange={(value) => handleSelectChange("healthConditions", value)}
            >
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder={t.healthConditions} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{t.conditions.none}</SelectItem>
                <SelectItem value="diabetes">{t.conditions.diabetes}</SelectItem>
                <SelectItem value="hypertension">{t.conditions.hypertension}</SelectItem>
                <SelectItem value="cholesterol">{t.conditions.cholesterol}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            type="submit"
            className="w-full md:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 px-8"
            size="lg"
          >
            {t.submit}
          </Button>
        </div>
      </form>
    </div>
  )
}

