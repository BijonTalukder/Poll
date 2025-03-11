export const debounce = (fn:(...args:any[])=>void, delay:number) => {
    let timer:NodeJS.Timeout;

    //closer
    return (...args:any[]) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn(...args)
        }, delay);
    }
}