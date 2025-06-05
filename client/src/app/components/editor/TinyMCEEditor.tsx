'use client';

import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEEditorProps {
    value: string;
    onContentChange: (content: string) => void;
    height?: number;
}

export default function TinyMCEEditor({ value, onContentChange, height = 500 }: TinyMCEEditorProps) {

    return (
        <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            value={value}
            onEditorChange={(content) => onContentChange(content)}
            init={{
                height: height,
                menubar: true,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                formats: {
                    p: { block: 'p' },
                    div: { block: 'div' }
                },
                forced_root_block: 'p',
                remove_linebreaks: true,
                convert_urls: false,
                entity_encoding: 'raw',
                browser_spellcheck: true,
                contextmenu: false,
                branding: false,
                promotion: false,
                setup: (editor) => {
                    editor.on('init', () => {
                        editor.getContainer().style.transition = "border-color 0.15s ease-in-out";
                    });
                }
            }}
        />
    );
}