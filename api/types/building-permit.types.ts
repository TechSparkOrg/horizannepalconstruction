export interface BuildingPermitConfig {
  id: string
  title: string
  description?: string
  steps?: BuildingPermitStep[]
  workflow_steps?: WorkflowStep[]
  doc_categories?: DocCategory[]
  regulations?: Regulation[]
  municipalities?: Municipality[]
}

export interface BuildingPermitStep {
  title: string
  description: string
  order: number
}

export interface WorkflowStep {
  title: { en: string }
  description: { en: string }
  order: number
  num: number
  duration?: string
  desc?: { en: string }
  docs?: string[]
}

export interface DocCategory {
  label: { en: string }
  items: { en: string }[]
}

export interface Regulation {
  title: { en: string }
  description: { en: string }
  items?: { en: string }[]
}

export interface Municipality {
  name: string
  district?: string
  phone?: string
}
