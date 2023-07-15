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
        scheme: string(),
        block: string().optional(),
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
        // block: string(),
        plot_type: string().optional(),
        size_category: string().optional(),
        note_number: string().optional(),
        // plot_number: string().optional(),
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

export const updateAllotteeParams = object({
    body: object({
        "member_share": string().optional(),
        "full_name": string().optional(),
        "cnic_no": string().optional(),
        "relationship_type": string().optional(),
        "guardian_name": string().optional(),
        "date_of_birth": string().optional(),
        "gender": string().optional(),
        "address": string().optional(),
        "city": string().optional(),
        "email": string().optional(),
        "phone_no": string().optional(),
        "photo": string().optional().nullable(),
        "cnic_front": string().optional().nullable(),
        "cnic_back": string().optional().nullable(),

    }).strict(),
    params: object({
        id: string(),
    }).strict(),
})

export const updateCostingParams = object({
    body: object({
        "rate_per_marla": string().optional(),
        "development_charges": string().optional(),
        "special_adjustment": string().optional(),
        "rebait_amount": string().optional(),
        "dealer_commision": string().optional(),
        "installment_calculator": string().optional(),
        "next_installment_date": string().optional(),
        "installments": array(object({
            "installment": string()
        }))

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


