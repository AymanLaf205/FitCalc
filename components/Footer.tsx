import { useLanguage } from "./LanguageProvider"
import { translations } from "@/utils/translations"

export function Footer() {
  const { language } = useLanguage()
  const t = translations[language].footer
  const currentYear = new Date().getFullYear()

  const copyrightText = language === "ar" 
    ? `© ${currentYear} حاسبة اللياقة. جميع الحقوق محفوظة.`
    : `© ${currentYear} FitCalc. All rights reserved.`;

  return (
    <footer className="bg-background border-t border-border/40 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">{t.thankYou}</p>
          <p className="text-sm text-muted-foreground" dir={language === "ar" ? "rtl" : "ltr"}>
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  )
}

