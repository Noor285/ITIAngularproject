import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return null;
    if(!args) return value;

    args = args.toLowerCase();
    return value.filter(function(user:any){
        return JSON.stringify(user).toLowerCase().includes(args);
    })

  }

}
