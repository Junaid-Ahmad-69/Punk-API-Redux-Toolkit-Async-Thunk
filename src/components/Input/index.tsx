import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import type {InputType} from "@/components/Input/type.ts";

export function InputWithLabel({label, type, name, value, placeholder, handleChange}: InputType) {
    return (
        <div className="grid w-full max-w-sm items-center gap-3">
            {label && <Label htmlFor="email">{label}</Label>}
            <Input type={type} id={type} name={name} placeholder={placeholder} value={value}
                   onChange={(e) => handleChange(e.target.value)}/>
        </div>
    )
}
