import { getPayload } from "payload";
import config from '../../../../payload.config'
import Link from "next/link";
import { extractPlainText } from "@/utils/extractText";

async function getProjects() {
    const payload = await getPayload({ config })
    const projects = await payload.find({
        collection: 'projects',
    })

    return projects.docs.map((project) => ({
        id: project.slug,
        title: project.title,
        leadText: project.leadText
    }));   
}

export default async function Projects() {
    const projects = await getProjects()
    
    return (
        <div className="min-h-screen container mx-auto ">
            <div className="mt-28 mb-12 pt-(--header-height)">
                <h1 className="text-4xl font-bold mb-8">Our Projects</h1>
                <div className="prose prose-lg max-w-none lg:max-w-2xl">
                    <p>
                        We are proud to have worked with a wide range of clients, from corporations to government agencies and non-profits.
                    </p>
                </div>
            </div>
            <ul>
                {projects.map((project, index) => (
                    <li key={index}>
                        <div className="flex flex-col gap-4 border-l border-gray-400 pl-4 max-w-md">
                            <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                            {project.leadText && (
                                <p className="text-gray-600 line-clamp-3">
                                    {extractPlainText(project.leadText).substring(0, 200)}
                                    {extractPlainText(project.leadText).length > 200 ? '...' : ''}
                                </p>
                            )}
                            <Link className="text-red-500 hover:text-red-700" href={`/projects/${project.id}`}>
                                Learn more
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}