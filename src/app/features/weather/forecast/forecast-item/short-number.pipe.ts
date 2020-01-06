import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'fixed'
})
export class ShortenPipe implements PipeTransform{
    transform(value : any){
        return value.toFixed(0)
    }
}