import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text'
})
export class TextPipe implements PipeTransform {

  transform(value: string,num?:number): unknown {
    const limit=num?num:70
    if(value.length>limit){
    return value.substring(0,limit)+'....';}
    return value
  }

}
