import type {ChangeEvent} from "react";

export interface FiltersProps {
    data: {
        type: string;
        name: string;
        label: string;
        placeholder: string;
        value: string;
        handleChangeFilter: (e:ChangeEvent<HTMLInputElement>) => void;
    }[];
}