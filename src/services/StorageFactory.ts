import { SupabaseStorage } from "./SupabaseStorage";


export class StorageFactory {

    init(type: string) {
        return new SupabaseStorage()
    }
}