import { Pipe, PipeTransform } from '@angular/core';
type TimeUnits = 'min' | 'hour' | 'day' | 'week' | 'month' | 'greatest';

const msToMonths = (ms: number): number => msToDays(ms) / 30;
const msToWeeks = (ms: number): number => msToDays(ms) / 7;
const msToDays = (ms: number): number => ms / (3600000 * 24);
const msToHours = (ms: number): number => ms / 3600000;
const msToMins = (ms: number): number => ms / 60000;

const msMappers = {
  min: msToMins,
  hour: msToHours,
  day: msToDays,
  week: msToWeeks,
  month: msToMonths,
}

function stringifyTime(unit: string, value) {
  // Add a plural to the string if necesary
  if (value >= 2) unit += 's';
  return `${value} ${unit}`;
}

@Pipe({
  name: 'msTo'
})
export class MilisecondsMapperPipe implements PipeTransform {

  transform(ms: number, unit: TimeUnits, maxDecimals: number = 0): string {
    if (!ms || !unit || ms < 0) return '';

    if (unit !== 'greatest') {
      const value = msMappers[unit](ms).toFixed(maxDecimals)
      return stringifyTime(unit, value);
    }

    const maxUnit = ['month', 'week', 'day', 'hour', 'min']
      .map((u) => (
        {
          unit: u,
          value: msMappers[u](ms)
        }
      ))
      .filter(({ value }) => value >= 1)
      .sort((a, b) => a.value - b.value)[0]

    return stringifyTime(maxUnit.unit, maxUnit.value.toFixed(maxDecimals))
  }
}
