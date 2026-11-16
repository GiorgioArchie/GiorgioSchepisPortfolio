import { portfolio } from './data'

const PAGE_WIDTH = 612
const PAGE_HEIGHT = 792
const MARGIN = 46
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2
const INK: [number, number, number] = [16, 29, 34]
const MUTED: [number, number, number] = [79, 99, 104]
const AQUA: [number, number, number] = [25, 143, 155]

function pdfSafeText(value: string) {
  return value
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/·/g, '|')
    .replace(/•/g, '-')
}

export async function createResumePdf() {
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF({ format: 'letter', unit: 'pt', compress: true })
  let y = 44

  const ensureSpace = (height: number) => {
    if (y + height > PAGE_HEIGHT - MARGIN) {
      pdf.addPage()
      y = MARGIN
    }
  }

  const sectionHeading = (title: string) => {
    ensureSpace(32)
    y += 7
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(10)
    pdf.setTextColor(...AQUA)
    pdf.text(title.toUpperCase(), MARGIN, y)
    y += 5
    pdf.setDrawColor(...AQUA)
    pdf.setLineWidth(0.7)
    pdf.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
    y += 13
  }

  const bodyText = (text: string, size = 8.6, color = INK, lineHeight = 11) => {
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(size)
    pdf.setTextColor(...color)
    const lines = pdf.splitTextToSize(pdfSafeText(text), CONTENT_WIDTH) as string[]
    ensureSpace(lines.length * lineHeight + 3)
    pdf.text(lines, MARGIN, y, { lineHeightFactor: lineHeight / size })
    y += lines.length * lineHeight + 3
  }

  const entryHeading = (title: string, subtitle: string, period: string) => {
    ensureSpace(34)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(9)
    pdf.setTextColor(...INK)
    pdf.text(pdfSafeText(title), MARGIN, y)
    pdf.setFont('helvetica', 'italic')
    pdf.setFontSize(8)
    pdf.setTextColor(...MUTED)
    pdf.text(pdfSafeText(period), PAGE_WIDTH - MARGIN, y, { align: 'right' })
    y += 11
    pdf.setFont('helvetica', 'italic')
    pdf.setFontSize(8)
    pdf.setTextColor(...MUTED)
    const lines = pdf.splitTextToSize(pdfSafeText(subtitle), CONTENT_WIDTH) as string[]
    pdf.text(lines, MARGIN, y)
    y += lines.length * 10 + 3
  }

  const bullet = (text: string) => {
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8.2)
    const indent = 11
    const lines = pdf.splitTextToSize(pdfSafeText(text), CONTENT_WIDTH - indent) as string[]
    ensureSpace(lines.length * 10 + 2)
    pdf.setFillColor(...AQUA)
    pdf.circle(MARGIN + 2, y - 2.5, 1.5, 'F')
    pdf.setTextColor(...INK)
    pdf.text(lines, MARGIN + indent, y, { lineHeightFactor: 1.2 })
    y += lines.length * 10 + 2
  }

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(21)
  pdf.setTextColor(...INK)
  pdf.text(portfolio.name.toUpperCase(), PAGE_WIDTH / 2, y, { align: 'center' })
  y += 15

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(8.5)
  pdf.setTextColor(...MUTED)
  const contactLine = `${portfolio.email}  |  ${portfolio.phone}  |  ${portfolio.location}`
  pdf.text(pdfSafeText(contactLine), PAGE_WIDTH / 2, y, { align: 'center' })
  y += 12
  const linkedin = portfolio.links.linkedin.replace(/^https:\/\//, '')
  pdf.setTextColor(...AQUA)
  pdf.text(linkedin, PAGE_WIDTH / 2, y, { align: 'center' })
  pdf.link(PAGE_WIDTH / 2 - pdf.getTextWidth(linkedin) / 2, y - 8, pdf.getTextWidth(linkedin), 10, { url: portfolio.links.linkedin })
  y += 8

  sectionHeading('Professional Summary')
  bodyText('AI/ML-focused Computer Science student at the University of Colorado Boulder with two-time top intern recognition at Pure Fishing. Experienced delivering AI systems that supported projected annual savings of 1,300+ design hours and $1M+ in manual labor. Bilingual in English and Italian; quick to learn enterprise tools and lead work from idea to delivery.')

  sectionHeading('Experience & Leadership')
  for (const role of portfolio.experience) {
    entryHeading(role.role, role.organization, role.period)
    bullet(role.detail)
  }

  sectionHeading('Selected Projects')
  for (const project of portfolio.projects) {
    ensureSpace(28)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(8.7)
    pdf.setTextColor(...INK)
    pdf.text(pdfSafeText(project.name), MARGIN, y)
    y += 11
    bullet(project.description)
  }

  sectionHeading('Education')
  entryHeading(portfolio.education.school, portfolio.education.degree, portfolio.education.period)
  bodyText(portfolio.education.detail, 8.2, INK, 10)

  sectionHeading('Skills')
  for (const group of portfolio.skills) {
    bodyText(`${group.category}: ${group.items.join(', ')}`, 8.1, INK, 10)
  }

  const pageCount = pdf.getNumberOfPages()
  for (let page = 1; page <= pageCount; page += 1) {
    pdf.setPage(page)
    pdf.setDrawColor(225, 233, 235)
    pdf.setLineWidth(0.5)
    pdf.line(MARGIN, PAGE_HEIGHT - 30, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 30)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(7)
    pdf.setTextColor(...MUTED)
    pdf.text(`${portfolio.name} | Resume`, MARGIN, PAGE_HEIGHT - 18)
    pdf.text(`${page} / ${pageCount}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 18, { align: 'right' })
  }

  return pdf
}

export function downloadResume() {
  const url = `${import.meta.env.BASE_URL}Giorgio-Schepis-Resume.pdf`
  const link = document.createElement('a')
  link.href = url
  link.download = 'Giorgio-Schepis-Resume.pdf'
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  link.remove()
}
