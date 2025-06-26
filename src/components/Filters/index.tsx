import * as React from "react";
import {InputWithLabel} from "@/components/Input";
import type {FiltersProps} from "@/components/Filters/type.ts";

const Filters: React.FC<FiltersProps> = ({data}) => {
    return (
        <>{data.map((item) => {
            if (item.type === 'number' || item.type === 'text') {
                return (
                    <div className="mb-8" key={item.name}>
                        <InputWithLabel label={item.label} placeholder={item.placeholder} type={item.type} name={item.name} value={item.value} handleChange={(e)=>item.handleChangeFilter(e)}/>
                    </div>
                )
            }
        })}
        </>
    )
}
export default Filters;