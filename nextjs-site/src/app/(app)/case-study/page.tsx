import { getPayload } from "payload";
import config from '../../../../payload.config'
import Link from "next/link";
import { extractPlainText } from "@/utils/extractText";

async function getCaseStudies() {
    const payload = await getPayload({ config })
    const caseStudies = await payload.find({
        collection: 'caseStudies',
    })
    
    return caseStudies.docs.map((caseStudy) => ({
        id: caseStudy.slug,
        title: caseStudy.title,
        leadText: caseStudy.leadText
    }));
}

export default async function CaseStudies() {
    const caseStudies = await getCaseStudies()
    
    return (
        <div className="min-h-screen container mx-auto ">
            <div className="mt-28 mb-12 pt-(--header-height)">
                <h1 className="text-4xl font-bold mb-8">Case Studies</h1>
                <div className="prose prose-lg max-w-none lg:max-w-2xl">
                    <p>
                        Our case studies dive into the details of our work with our clients. Learn more about how we helped our clients achieve their goals.
                    </p>
                </div>
            </div>
            <ul>
                {caseStudies.map((caseStudy, index) => (
                    <li key={index}>
                        <div className="flex flex-col gap-4 border-l border-gray-400 pl-4 max-w-md">
                            <h2 className="text-2xl font-bold mb-4">{caseStudy.title}</h2>
                            {caseStudy.leadText && (
                                <p className="text-gray-600 line-clamp-3">
                                    {extractPlainText(caseStudy.leadText).substring(0, 200)}
                                    {extractPlainText(caseStudy.leadText).length > 200 ? '...' : ''}
                                </p>
                            )}
                            <Link className="text-red-500 hover:text-red-700" href={`/case-study/${caseStudy.id}`}>
                                Learn more
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}