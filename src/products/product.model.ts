import {} from '@nestjs/common'


export class Product{
    constructor(  
        public  id: string,
        public title: String,
        public description: string,
        public price: number,
        )
        {};
}