export interface FiltersProps {
    data: {
        type: string;
        name: string;
        label: string;
        placeholder: string;
        value: string;
        handleChangeFilter: (value: string) => void;
    }[];
}