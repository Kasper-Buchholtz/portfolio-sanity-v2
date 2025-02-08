
export function iconByLocale(locale: string) {
  switch (locale) {
    case 'da':
      return () => '🇩🇰'
    case 'en':
      return () => '🇬🇧'
    case 'es':
      return () => '🇪🇸'
    case 'no':
      return () => '🇳🇴'
    case 'sv':
      return () => '🇸🇪'
    case 'de':
      return () => '🇩🇪'
    case 'fi':
      return () => '🇫🇮'
    case 'fr':
      return () => '🇫🇷'
    case 'it':
      return () => '🇮🇹'
    case 'nl':
      return () => '🇳🇱'
    case 'pl':
      return () => '🇵🇱'
    case 'pt':
      return () => '🇵🇹'
    case 'ru':
      return () => '🇷🇺'
    case 'zh':
    default:
      return () => '🌍'
  }
}
