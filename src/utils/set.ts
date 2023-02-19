type Indexed<T = unknown> = {
    [key in string]: T;
};

function set(object: Indexed, path: string, value: unknown): Indexed | unknown {
    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    if (typeof object === 'object' && object !== null) {
        let currObj = object;
        path.split('.').forEach((key: string, index, arr) => {
            if (index === arr.length - 1) {
                currObj[key as keyof object] = value;
                return;
            }
            if (currObj[key as keyof object] === undefined) {
                currObj[key as keyof object] = {};
            }
            currObj = currObj[key as keyof object] as Indexed;
        });
    }

    return object;
}

export default set
