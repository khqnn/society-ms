import { array, boolean, number, object, string } from 'zod';


export const getPlotParams = object({
    params: object({
        id: string(),
    }).strict(),
})

export const indexPlotParams = object({
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
})

export const createPlotParams = object({
    body: object({
        number_of_owners: number(),
        block: string(),
        plot_type: string().optional(),
        size_category: string().optional(),
        note_number: string().optional(),
        plot_number: string().optional(),
        kanal: string().optional(),
        marla: string().optional(),
        square_yard: string().optional(),
        corner: boolean().optional(),
        completion_certificate: boolean().optional(),
        court_case: boolean().optional(),
        attachment: string().optional().nullable(),


    }).strict(),
})

export const updatePlotParams = object({
    body: object({
        number_of_owners: number(),
        block: string(),
        plot_type: string().optional(),
        size_category: string().optional(),
        note_number: string().optional(),
        plot_number: string().optional(),
        kanal: string().optional(),
        marla: string().optional(),
        square_yard: string().optional(),
        corner: boolean().optional(),
        completion_certificate: boolean().optional(),
        court_case: boolean().optional(),
        attachment: string().optional().nullable(),

    }).strict(),
    params: object({
        id: string(),
    }).strict(),
})

export const deletePlotParams = object({
    params: object({
        id: string(),
    }).strict(),
})


