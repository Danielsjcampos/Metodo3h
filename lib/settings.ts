/** Config do glossário 2time SEO — lê de env com defaults */
export async function getConfig() {
  return {
    siteName:  process.env.GLOSSARIO_SITE_NAME  || 'Método 3h',
    siteUrl:   process.env.NEXT_PUBLIC_SITE_URL  || process.env.NEXTAUTH_URL || 'https://metodo3horas.com.br',
    siteNiche: process.env.GLOSSARIO_NICHO       || 'criação de sites, no-code e negócios digitais',
    siteCity:  process.env.GLOSSARIO_CIDADE      || '',
    indexNowKey: process.env.INDEXNOW_KEY        || '',
    googleSA:    process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '',
  }
}
