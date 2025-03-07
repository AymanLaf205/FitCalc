import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://fitcalc.com'),
  title: {
    template: '%s | FitCalc',
    default: 'FitCalc - Your Personal Health & Nutrition Calculator'
  },
  description: 'Get personalized nutrition and health advice tailored to your needs. Calculate daily calories, macros, and get custom meal plans.',
  keywords: [
    'fitness calculator',
    'fit calc',
    'diet calculator',
    'calories calculator',
    'macros calculator',
    'حاسبة اللياقة',
    'حاسبة الصحة',
    'حاسبة السعرات',
    'حساب السعرات',
    'حاسبة التغذية'
  ],
  authors: [{ name: 'FitCalc' }],
  openGraph: {
    title: 'FitCalc - Your Personal Health & Nutrition Calculator',
    description: 'Get personalized nutrition and health advice tailored to your needs',
    url: 'https://fitcalc.com',
    siteName: 'FitCalc',
    type: 'website'
  },
  alternates: {
    languages: {
      'en-US': '/en',
      'ar-SA': '/ar'
    }
  }
}
