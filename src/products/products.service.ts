import { Injectable, NotFoundException } from "@nestjs/common";

import {Product} from "./product.model";

@Injectable()
export class ProductsService{
    //Private means the product acessible to only service, and service is the only way of interacting with it.
    //Managing a list of products from our product type defined in our model.
   private products: Product[] = [];
    insertProduct(title: string, description: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product( prodId, title, description, price)
        this.products.push(newProduct);
        return prodId;
    }

    getProducts(){
        return [...this.products];
	
    }

    getSingleproduct(productId: string){
        const product = this.findProduct(productId)[0];
        return {...product}
    }

    updateProduct(productId: string, title: string, description: string, price: number){
        const [product,index] = this.findProduct(productId);
        const updatedProduct = {...product}
        if(title){
            updatedProduct.title =title;
        }
        if(description){
            updatedProduct.description =description;
        }
        if(price){
            updatedProduct.price =price;
        }
        this.products[index] = updatedProduct;
    }


    deleteProduct(prodId: string){
            //getting our products
        const index = this.findProduct(prodId)[1];
        this.products.splice(index, 1);
    }


    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        const product = this.products[productIndex];
        if (!product){
            //Not Found Exception for throwing an error.
            throw new NotFoundException('Could not find product.');
        }
        return [product, productIndex ];
    }
}