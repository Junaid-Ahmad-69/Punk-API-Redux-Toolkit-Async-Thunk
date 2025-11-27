import type {ChangeEvent} from "react";

export interface InputType {
    label?: string;
    type?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    classStyle?: string;
    handleChange?: (e: ChangeEvent<HTMLInputElement>) => void ;
    inputRef?: React.Ref<HTMLInputElement>;
}