export const generateSlug = (strings: string[]): string => {
  const slugifiedStrings = strings.map((str) =>
    str
      .toLowerCase()
      .replace(/[^\w\s\d-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50)
      .replace(/-$/, ''),
  )

  const slug = slugifiedStrings.join('-')

  return slug
}
