import {Service} from 'typedi';

const fs = require('fs');

@Service()
export default class FileService {

    public saveOnDisc(file: Express.Multer.File): string {
        const fileExtension = this.getFileExtension(file.originalname);
        const newfileName = this.generateNewFileName(file.originalname);

        const newFileName = this.generateNewFileName(file.originalname);

        fs.writeFileSync(`${__dirname}/../../data/images/${newfileName + fileExtension}`, file.buffer);

        return (newFileName + fileExtension);
    }

    public getImage(imageName: string, response: any) {
        return  fs.createReadStream(`${__dirname}/../../data/images/${imageName}`).pipe(response);
    }

    private generateNewFileName(originalName: string): string {
        return `${originalName.substring(0, originalName.length - 4)}-${new Date().getTime()}`;
    }

    private getFileExtension(fileName: string): string {
        return fileName.substring(fileName.length - 4, fileName.length);
    }
}
