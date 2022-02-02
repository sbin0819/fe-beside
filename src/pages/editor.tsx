import React, { useMemo, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'
// import CustomToolbar from '@components/CustomToolbar'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'

function editor() {
    const [content, setContent] = useState('')

    const ContentChange = (e) => {
        setContent(content)
        // setContent(e.target.value)
        // console.log(e.target.value)
    }
    const QuillWrapper = dynamic(import('react-quill'), {
        ssr: false,
        loading: () => <p>Loading ...</p>,
    })

    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: '1' }, { header: '2' }, { font: [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' },
                ],
                ['link', 'image', 'video'],
                ['clean'],
            ],
            clipboard: {
                matchVisual: false,
            },
        }),
        []
    )
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
    ]

    return (
        <>
            <QuillWrapper
                theme="snow"
                modules={modules}
                formats={formats}
                style={{ height: '300px' }}
                id={'content'}
                placeholder={'설명을 입력해주세요'}
                value={content}
                onChange={ContentChange}
                // onchange 값 html태그로 적용안됨 수정필요
            />
        </>
    )
}

export default editor
