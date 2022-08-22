export interface SelectOptions {
    value: number;
    label: string;
}
export const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'];
const tempArray = [] as Array<SelectOptions>;
months.forEach((month, index) => tempArray.push({ value: index + 1, label: month }))
export const monthOptions = tempArray;


export const createYearOptions = (firstOrderYear: number): Array<SelectOptions> => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const yearsArray = [];
    const yearOptions = [] as Array<SelectOptions>;
    for (let year = firstOrderYear; year <= currentYear + 1; year++) {
        yearsArray.push(year);
    };
    yearsArray.forEach(year => yearOptions.push({ value: year, label: `${year}` }));
    return yearOptions;
};

