/* eslint-disable prettier/prettier */
export class FileRepository {
    private file: any

    async saveFile(file: any) {
        this.file = file;
    }

    async getFile() {
        return this.file;
    }
}