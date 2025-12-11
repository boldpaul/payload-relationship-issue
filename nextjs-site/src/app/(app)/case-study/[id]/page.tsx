import { getPayload } from 'payload'
import config from '../../../../../payload.config'
import { RichText } from '@/components/RichText'
import { TextColumn } from '@/components/ui/text'
import { SingleMedia, FullWidthImage } from '@/components/ui/media'
import { getColorValue } from '@/lib/layoutUtils'
import type { Project } from '../../../../../payload-types'
import { SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'

// Define types for content blocks
type ContentBlocks = NonNullable<Project['content']>;
type NestedContentBlocks = NonNullable<Extract<ContentBlocks[number], { blockType: 'recursiveComponent' }>['content']>;
type AllContentBlocks = ContentBlocks | NestedContentBlocks;

// Helper function to render recursive blocks with proper typing
function renderBlocks(blocks: AllContentBlocks, projectTitle: string, insideGrid = false): React.ReactNode[] {
    if (!blocks) return [];
    
    return blocks.map((block, index) => {
        if (!block) return null;
        
        switch (block.blockType) {
            case 'textBlock': {
                const textBlock = (
                    <TextColumn
                        key={index}
                        heading={block.heading}
                        richText={block.text as unknown as SerializedLexicalNode}
                    />
                );
                
                return insideGrid ? textBlock : (
                    <div key={index} className="container grid grid-cols-12">
                        {textBlock}
                    </div>
                );
            }
            case 'singleMedia': {
                const media = typeof block.singleMedia === 'object' ? block.singleMedia : null;
                if (!media) return null;
                
                const type = media.mimeType?.startsWith('video/') ? 'video' : 'image'; // Payload media type check
                
                const mediaBlock = (
                    <SingleMedia
                        key={index}
                        type={type}
                        src={media.url || ''}
                        alt={media.alt || projectTitle}
                        {...(type === 'image' && media.width && media.height && { 
                            imgWidth: media.width, 
                            imgHeight: media.height 
                        })}
                        {...(type === 'image' && block.aspectRatio && {
                            aspectRatio: block.aspectRatio
                        })}
                        colSpan={block.colSpan ?? undefined}
                        colStart={block.colStart ?? undefined}
                    />
                );
                
                return insideGrid ? mediaBlock : (
                    <div key={index} className="container grid grid-cols-12">
                        {mediaBlock}
                    </div>
                );
            }
            case 'recursiveComponent': {
                if (!block.content || block.content.length === 0) return null;

                const backgroundColor = block.backgroundColor ?? undefined;
                const textColor = backgroundColor ? getColorValue(backgroundColor) : undefined;
                
                
                // With background color
                if (backgroundColor) {
                    return(
                        <div key={index} style={{ backgroundColor, color: textColor }}>
                            <div className="py-18 container grid grid-cols-12">
                                {renderBlocks(block.content, projectTitle, true)}
                            </div>
                        </div>
                    );
                }
                
                // No background color
                return(
                    <div key={index} className="container grid grid-cols-12">
                        {renderBlocks(block.content, projectTitle, true)}
                    </div>
                );
            }
            case 'fullWidthImage': {
                const media = typeof block.fullWidthImage === 'object' ? block.fullWidthImage : null;
                if (!media) return null;
                
                const type = media.mimeType?.startsWith('video/') ? 'video' : 'image'; // Payload media type check
                
                return(
                    <FullWidthImage
                        key={index}
                        type={type}
                        src={media.url || ''}
                        alt={media.alt || projectTitle}
                    />
                )
            }
            default:
                return null
        }
    });
}

// Generate static params for the project page
export async function generateStaticParams() {
    const payload = await getPayload({ config })
    const caseStudies = await payload.find({
        collection: 'caseStudies',
    })
    
    return caseStudies.docs.map((caseStudy) => ({
        id: caseStudy.slug  
    }));
}

// Pass url params to the project page
export default async function CaseStudy({ params }: { params: Promise<{ id: string }> }) {

    // Await the params before using them
    const { id } = await params;
    
    // Fetch project from Payload CMS
    const payload = await getPayload({ config })
    const caseStudiesData = await payload.find({
        collection: 'caseStudies',
        where: {
            slug: {
                equals: id
            }
        }
    })
    
    const caseStudy = caseStudiesData.docs[0];
    
    if (!caseStudy) {
        return <div className="min-h-screen flex items-center justify-center">Case Study not found</div>;
    }

    return (
        <main id="main-content" className="min-h-screen">
            <div className="container mt-28 mb-12 pt-(--header-height)">
                <h1 className="text-4xl font-bold mb-8">{caseStudy.title}</h1>
                
                {/* Render the rich text content */}
                {caseStudy.leadText && (
                    <RichText 
                        data={caseStudy.leadText} 
                        className="prose prose-lg max-w-none lg:max-w-2xl"
                    />
                )}
            </div>
            {/* Render all blocks (including recursive ones) */}
            {caseStudy.content && caseStudy.content.length > 0 && (
                <div className="grid grid-cols-1">
                    {renderBlocks(caseStudy.content, caseStudy.title)}
                </div>
            )}
        </main>
    );
}