"use client";

import { cn } from "@/lib/utils";
import { getLayoutClasses, LayoutProps } from "@/lib/layoutUtils";
import Image from "next/image";

interface SingleImageProps extends LayoutProps { 
    type: "image"; 
    src: string;
    alt?: string;
    imgWidth?: number;
    imgHeight?: number;
    aspectRatio?: string;
}

interface SingleVideoProps extends LayoutProps {
    type: "video";
    src: string;
    aria?: string;
}

type SingleMediaProps = SingleImageProps | SingleVideoProps;

export function SingleMedia(props: SingleMediaProps) {
    const { colSpan, colStart } = props;
    const { childClass } = getLayoutClasses({ colSpan, colStart });

    // Get aspect ratio for images
    const aspectRatio = props.type === "image" ? props.aspectRatio : undefined;
    const hasCustomAspect = aspectRatio && aspectRatio !== 'auto';

    // Render content
    return (
        <div className={cn("", childClass, hasCustomAspect ? aspectRatio : '')}>
            {props.type === "image" && props.imgWidth && props.imgHeight ? (
                <Image 
                    src={props.src} 
                    alt={props.alt || ''} 
                    width={props.imgWidth}
                    height={props.imgHeight}
                    className={cn("my-12 lg:my-0 object-cover w-full", hasCustomAspect ? "h-full" : "")}
                />
            ) : props.type === "video" ? (
                <video 
                    src={props.src} 
                    aria-label={props.aria} 
                    controls
                    className="aspect-video"
                />
            ) : null}
        </div>
    );
}

export function FullWidthImage(props: SingleMediaProps) {
    return (
        <div className={cn("relative w-full h-screen max-h-[900px]")}>
            {props.type === "image" ? (
                <Image 
                    src={props.src} 
                    alt={props.alt || ''} 
                    fill
                    className={cn("object-cover")}
                />
            ) : props.type === "video" ? (
                <video 
                    src={props.src} 
                    aria-label={props.aria} 
                    controls
                    className="aspect-video"
                />
            ) : null}
        </div>
    );
}