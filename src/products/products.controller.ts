import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

//Decorator's are attached to classes, to indicate the type of classes, @Controller is the decorator that makes this file a controller.
//This controller filters for domain path /products, and it executes for the following http methods get,post,patch, delete.
@Controller('products')
export class ProductsController {
    //To use the service, we have to inject it, aka dependency injection
    constructor(private readonly productsService: ProductsService){}
    @Post()
    addProduct
        (
        @Body('title') prodTitle:string,
        @Body('description') prodDescription:string,
        @Body('price') prodPrice:number
        )
        {
       const generatedId = this.productsService.insertProduct(prodTitle, prodDescription, prodPrice);
       return {id: generatedId};
    }

    @Get()
    getAllProducts(){
        return this.productsService.getProducts();
    }

    //Getting a single product
    @Get(':id')
    getProduct(@Param('id')prodId: string,){
        return this.productsService.getSingleproduct(prodId);   
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string, 
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number 
        ){
            this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice);
            return null;
        }

    @Delete(':id')
    //Delete dosen't accept requests from the request.body.
    removeProduct(
        @Param('id') prodId: string,
    ){
        this.productsService.deleteProduct(prodId);
        return null;
    }
    }


