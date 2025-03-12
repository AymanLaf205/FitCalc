/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
import type { UserData } from "../types/health"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useLanguage } from "./LanguageProvider"
import { translations } from "@/utils/translations"
import { Card, CardContent } from "@/components/ui/card"

interface UserDataFormProps {
  onSubmit: (data: UserData) => void
}

export function UserDataForm({ onSubmit }: UserDataFormProps) {
  const { language } = useLanguage()
  const t = translations[language].form
  const [formData, setFormData] = useState<UserData>({
    name: '',
    age: 0,
    gender: 'male',
    weight: 0,
    height: 0,
    bodyType: 'mesomorph',
    weightGoal: 'maintainWeight',
    weightChangeAmount: 0,
    activityLevel: 'moderate',
    healthConditions: []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleInputChange = <K extends keyof UserData>(field: K, value: UserData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2 text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">{t.title}</h2>
            <p className="text-muted-foreground text-sm sm:text-base">{t.subtitle}</p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">{t.name}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                placeholder={t.name}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">{t.age}</Label>
              <Input
                id="age"
                type="number"
                min="0"
                value={formData.age || ''}
                onChange={e => handleInputChange('age', Number(e.target.value))}
                placeholder={t.age}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">{t.gender}</Label>
              <Select
                value={formData.gender}
                onValueChange={value => handleInputChange('gender', value as UserData['gender'])}
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
              <Label htmlFor="weight">{t.weight}</Label>
              <Input
                id="weight"
                type="number"
                min="0"
                step="0.1"
                value={formData.weight || ''}
                onChange={e => handleInputChange('weight', Number(e.target.value))}
                placeholder={t.weight}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">{t.height}</Label>
              <Input
                id="height"
                type="number"
                min="0"
                value={formData.height || ''}
                onChange={e => handleInputChange('height', Number(e.target.value))}
                placeholder={t.height}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bodyType">{t.bodyType}</Label>
              <Select
                value={formData.bodyType}
                onValueChange={value => handleInputChange('bodyType', value as UserData['bodyType'])}
              >
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder={t.bodyType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ectomorph">{t.bodyTypes.ectomorph}</SelectItem>
                  <SelectItem value="mesomorph">{t.bodyTypes.mesomorph}</SelectItem>
                  <SelectItem value="endomorph">{t.bodyTypes.endomorph}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weightGoal">{t.weightGoal}</Label>
              <Select
                value={formData.weightGoal}
                onValueChange={value => {
                  handleInputChange('weightGoal', value as UserData['weightGoal'])
                  if (value === 'maintainWeight') {
                    handleInputChange('weightChangeAmount', 0)
                  }
                }}
              >
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder={t.weightGoal} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gainWeight">{t.gainWeight}</SelectItem>
                  <SelectItem value="loseWeight">{t.loseWeight}</SelectItem>
                  <SelectItem value="maintainWeight">{t.maintainWeight}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weightChangeAmount">{t.weightChangeAmount}</Label>
              <Input
                id="weightChangeAmount"
                type="number"
                min="0"
                max="20"
                step="0.5"
                value={formData.weightChangeAmount || ''}
                onChange={e => handleInputChange('weightChangeAmount', Number(e.target.value))}
                placeholder={`${formData.weightGoal === 'gainWeight' ? 'Gain' : 'Lose'} kg`}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                disabled={formData.weightGoal === 'maintainWeight'}
                required={formData.weightGoal !== 'maintainWeight'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="activityLevel">{t.activityLevel}</Label>
              <Select
                value={formData.activityLevel}
                onValueChange={value => handleInputChange('activityLevel', value as UserData['activityLevel'])}
              >
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder={t.activityLevel} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">{t.activityLevels.sedentary}</SelectItem>
                  <SelectItem value="light">{t.activityLevels.light}</SelectItem>
                  <SelectItem value="moderate">{t.activityLevels.moderate}</SelectItem>
                  <SelectItem value="active">{t.activityLevels.active}</SelectItem>
                  <SelectItem value="veryActive">{t.activityLevels.veryActive}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="healthConditions">{t.healthConditions}</Label>
              <Select
                value={formData.healthConditions[0] || 'none'}
                onValueChange={value => {
                  const newConditions = value === 'none' ? [] : [value]
                  handleInputChange('healthConditions', newConditions)
                }}
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
        </CardContent>
      </Card>

      <div className="flex justify-center px-4 sm:px-0">
        <Button
          type="submit"
          className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 px-6 sm:px-8"
          size="lg"
        >
          {t.submit}
        </Button>
      </div>
    </form>
  )
}

