
export interface IStorage {

    upload(image_name: string, image: Buffer): Promise<{ success: boolean, code: number, message: string | null, data: any }>;
    download(image_name: string): Promise<{ success: boolean, code: number, message: string | null, data: any }>;
    getImageUrlByName(name: string): string
}