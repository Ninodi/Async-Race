import React, { useEffect, useState } from 'react'

type ColorPickerProps = {
    setCarColor: React.Dispatch<React.SetStateAction<string>>
}

function ColorPicker({setCarColor}: ColorPickerProps) {
    const [color, setColor] = useState<string>('#8320E5')

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value)
    }

    useEffect(() => {
        setCarColor(color)
    }, [color])

    return(
        <div className="color-picker">
            <div className="color-display" style={{backgroundColor: color, width: '20px', height: '20px'}}></div>
            <label htmlFor="color"></label>
            <input type="color" name="color" id="" value={color} onChange={handleColorChange}/>
        </div>
    )
}

export default ColorPicker