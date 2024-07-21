import { Pipe, PipeTransform } from '@angular/core';

export interface TranslateParams {
  prefix?: string;
  variables?: {[key: string]: string};
}

@Pipe({
  name: 'translate',
  standalone: true
})
export class TranslatePipe implements PipeTransform {

  static data = new Map<string, string>();

  transform(value: string, params?:string | TranslateParams): string {
    let translated!: string | undefined;
    let prefix;
    let variables;
    if(typeof params === 'string') {
      prefix = params;
    } else if(typeof params === 'object') {
      prefix = params.prefix;
      variables = params.variables;
    }
    if(prefix) {
      translated = TranslatePipe.data.get(`${prefix}.${value.toLocaleLowerCase()}`);
    } else {
      translated = TranslatePipe.data.get(value as string);
    }
    if(translated && variables) {
      for(const key in variables) {
        if(variables.hasOwnProperty(key)) {
          translated = translated.replace(new RegExp(`{${key}}`, 'g'), variables[key]);
        }
      }
    }
    return translated ? translated : value;
  }

}
