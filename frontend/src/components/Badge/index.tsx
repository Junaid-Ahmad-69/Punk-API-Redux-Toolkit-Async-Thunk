import {Badge} from "@/components/ui/badge.tsx";

const BadgeItem = ({children}: {children: React.ReactNode}) => {
    return <Badge className="text-sm">{children}</Badge>
}

export default BadgeItem