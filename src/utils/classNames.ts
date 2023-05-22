export const classNames = (...args: any) => {
    const classNameArray: (string | number)[] = [];

    args.forEach((arg: any) => {
        if (arg) {
            if (Array.isArray(arg)) {
                classNameArray.push(classNames(...arg));
            }
            if (typeof arg === 'string' || typeof arg === 'number') {
                classNameArray.push(arg);
            }
            if (
                typeof arg === 'object' &&
                !Array.isArray(arg) &&
                arg !== null
            ) {
                Object.keys(arg).forEach((key) => {
                    if (arg[key]) classNameArray.push(key);
                });
            }
        }
    });

    return classNameArray.join(' ');
};
