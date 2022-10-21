import { FieldError, ReportFieldError } from "../generated/graphql";

// Map error for User field
export const toErrorMap = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ field, message }) => {
        errorMap[field] = message;
    });
    return errorMap;
};

// Map error for Report field
export const toErrorMapReport = (errors: ReportFieldError[]) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ field, message }) => {
        errorMap[field] = message;
    });
    return errorMap;
};
