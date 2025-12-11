"use client";

import React from "react";
import { h2Variants, pVariants } from "@/lib/variants";
import { SerializedEditorState, SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@/components/RichText"

interface TextBlockProps {
  heading?: string | null;
  richText?: SerializedLexicalNode;
}

export function TextColumn({ heading, richText }: TextBlockProps) {

    return (
        <div className="col-span-12 lg:col-span-6">
            {heading && <h2 className={h2Variants({ })}>{heading}</h2>}
            {richText && <RichText data={richText as unknown as SerializedEditorState<SerializedLexicalNode>} className={pVariants({ })} />}
        </div>
    );
}