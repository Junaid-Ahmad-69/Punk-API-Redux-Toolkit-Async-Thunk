export interface IPagination {
    limit: number;
    defaultPage: number;
    totalCount: number;
    handleChange: (page: number) => void;
}