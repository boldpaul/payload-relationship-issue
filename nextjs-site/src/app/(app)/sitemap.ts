import type { MetadataRoute } from 'next'
import { getPayload, PaginatedDocs } from 'payload'
import config from '@payload-config'
import { CaseStudy, Project } from '../../../payload-types'

// ToDo add static pages that dont require payload cms or move them to payload cms

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const payload = await getPayload({ config })
    const projects: PaginatedDocs<Project> = await payload.find({
      collection: 'projects',
      limit: 0,
      where: {}
    })
    const caseStudies: PaginatedDocs<CaseStudy> = await payload.find({
      collection: 'caseStudies',
      limit: 0,
      where: {}
    })
  
    const baseUrl = 'https://www.example.com'
  
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
      ...projects.docs.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(project.updatedAt),
      })),
      ...caseStudies.docs.map((caseStudy) => ({
        url: `${baseUrl}/case-study/${caseStudy.slug}`,
        lastModified: new Date(caseStudy.updatedAt),
      })),
    ]
  }