import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text'
})
export class TextPipe implements PipeTransform {

  transform(value: string,num?:number,dots?:string): unknown {
    const limit=num?num:70
    if(value.length>limit){
    return value.substring(0,limit)+'...';
  }else
    return value
  }

}
