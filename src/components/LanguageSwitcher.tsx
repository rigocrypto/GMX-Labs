import { languageLabels, languageNames, supportedLanguages, type Language } from '../i18n'

type LanguageSwitcherProps = {
  language: Language
  label: string
  onChange: (language: Language) => void
}

const LanguageSwitcher = ({ language, label, onChange }: LanguageSwitcherProps) => {
  return (
    <div className="language-switcher" role="group" aria-label={label}>
      {supportedLanguages.map((option) => {
        const isActive = option === language

        return (
          <button
            key={option}
            type="button"
            className={`language-switcher__button ${isActive ? 'is-active' : ''}`}
            aria-pressed={isActive}
            aria-label={`${label}: ${languageNames[option]}`}
            title={languageNames[option]}
            onClick={() => onChange(option)}
          >
            {languageLabels[option]}
          </button>
        )
      })}
    </div>
  )
}

export default LanguageSwitcher
