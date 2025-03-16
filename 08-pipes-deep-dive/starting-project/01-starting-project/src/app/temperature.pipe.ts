import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temp',
    standalone: true,

})
export class TemperaturePipe implements PipeTransform{
    
    transform(value: string | number | null, inputType: 'cel' | 'far', outputType?: 'cel' | 'far') {
        if (!value)
            return value;
        let val: number;
        if (typeof value === 'string'){
            val = parseFloat(value)
        } else {
            val = value??0;
        }
        let outputTemp: number = 0;
        //console.log(`Hello ${value}`)
        if (inputType === 'cel' && outputType === 'far'){
            outputTemp = val * (9/5) + 32;
        } else if (inputType === 'far' && outputType === 'cel'){
            outputTemp = (val - 32) * (5/9);
        } else {
            outputTemp = val;
        }
        let symbol : '°C' | '°F';
        symbol = outputType??outputType==='cel'?'°C':'°F'
        return `${outputTemp.toFixed(2)} ${symbol}`;
    }
}