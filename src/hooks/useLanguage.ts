import { useEffect, useMemo, useState } from 'react'
import { defaultLanguage, supportedLanguages, translations, type Language } from '../i18n'

const STORAGE_KEY = 'gmx-language'

const isLanguage = (value: string | null): value is Language =>
  value !== null && supportedLanguages.includes(value as Language)

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return defaultLanguage
  }

  const savedLanguage = window.localStorage.getItem(STORAGE_KEY)
  return isLanguage(savedLanguage) ? savedLanguage : defaultLanguage
}

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, language)
    }

    document.documentElement.lang = language
  }, [language])

  const t = useMemo(() => translations[language], [language])

  return {
    language,
    setLanguage,
    t,
  }
}
