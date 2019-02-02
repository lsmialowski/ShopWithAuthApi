import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post, Put,
    Res,
    UploadedFile,
    UseBefore,
} from 'routing-controllers';
import {Inject} from 'typedi';
import ProductDto from '../dtos/ProductDto';
import {AuthMiddleware} from '../middlewares/AuthMiddleware';
import FileService from '../services/FileService';
import ProductService from '../services/ProductService';

@UseBefore(AuthMiddleware)
@Controller('/product')
export default class ProductController {
    @Inject()
    private productService: ProductService;

    @Inject()
    private fileService: FileService;

    @Get('/:id')
    public async get(@Param('id') id: string) {
        return this.productService.get(id);
    }

    @Delete('/:id')
    public async delete(@Param('id') id: string) {
        return this.productService.delete(id);
    }

    @Put('/:id')
    public async update(@Param('id') id: string, @Body({validate: {groups: ['ProductEdit']}}) data: ProductDto) {
        return this.productService.update(id, data);
    }

    @Get('/')
    public async getAll() {
        return this.productService.getAll();
    }

    @Get('/image/:imageName')
    public async getImage(@Param('imageName') imageName: string, @Res() res: any) {
        res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename=' + imageName,
        });

        return this.fileService.getImage(imageName, res);
    }

    @Post('/')
    public async create(@UploadedFile('image') file: Express.Multer.File, @Body() data: ProductDto) {
        if (file.size > 10000) {
            throw new Error('File size cannot be bigger then 1000 bytes');
        }

        if (file.mimetype !== 'image/jpeg') {
            throw new Error('Only jpg extension is accepted');
        }
        const savedFileName = this.fileService.saveOnDisc(file);

        return this.productService.save(data, savedFileName);
    }
}
