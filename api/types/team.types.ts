export interface TeamMember {
  id: string
  name: string
  designation: string
  department: string
  photo: string
  social_links: { platform: string; url: string }[]
  type: string
}
