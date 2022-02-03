import React, { useState } from 'react'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

function emoji() {
    const [inputValue, setInputValue] = useState('')
    const [emojiModal, setEmojiModal] = useState(false)
    const emojiToggle = () => setEmojiModal(!emojiModal)

    const addEmoji = (e) => {
        let sym = e.unified.split('-')
        let codesArray = []
        sym.forEach((el) => codesArray.push('0x' + el))
        let emoji = String.fromCodePoint(...codesArray)
        setInputValue(inputValue + emoji)
    }

    return (
        <>
            <div>
                <input
                    name="inputValue"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <p onClick={emojiToggle}>이모티콘</p>
                {/* <div> */}
                {emojiModal && (
                    <Picker
                        onSelect={addEmoji}
                        autoFocus={true}
                        style={{ width: '498px', height: '350px' }}
                    />
                )}
                {/* </div> */}
            </div>
        </>
    )
}

export default emoji
