import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import type {InputType} from "@/components/Input/type.ts";
import type {ChangeEvent} from "react";

export function InputWithLabel({label, type, name, value, classStyle, placeholder, handleChange, inputRef}: InputType) {
    return (
        <div className="grid w-full max-w-sm items-center gap-3">
            {label && <Label htmlFor="email">{label}</Label>}
            <Input className={classStyle} type={type} id={type} name={name} ref={inputRef} placeholder={placeholder} value={value}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange?.(e)}/>
        </div>
    )
}
