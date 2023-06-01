import { array, boolean, number, object, string } from 'zod';

const params = {

    params: object({
        id: string(),
    }).strict(),
};

const query = {

    query: object({
        plot_type: string().optional(),
        size_category: string().optional(),
        plot_number: string().optional(),
        block: string().optional(),
        kanal: string().optional(),
        marla: string().optional(),
        square_yard: string().optional(),
        corner: boolean().optional(),
        completion_certificate: boolean().optional(),
        court_case: boolean().optional(),

    }).strict(),
}

const body = {
    body: object({
        plot_type: string(),
        size_category: string(),
        note_number: string(),
        plot_number: string(),
        block: string().optional(),
        kanal: string().optional(),
        marla: string().optional(),
        square_yard: string().optional(),
        corner: boolean().optional(),
        completion_certificate: boolean().optional(),
        court_case: boolean().optional(),

    }).strict(),
}


export const getPlotParams = object({
    ...params
});
export const indexPlotParams = object({
    ...query
});
export const createPlotParams = object({
    ...body
});
export const updatePlotParams = object({
    ...body,
    ...params
})
export const deletePlotParams = object({
    ...params
})


