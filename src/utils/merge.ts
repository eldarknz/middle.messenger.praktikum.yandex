export function merge(lhs: any, rhs: any): any {
    for (const key in rhs) {
        if(!Object.prototype.hasOwnProperty.call(rhs, key)) {
        //if (!rhs.hasOwnProperty(key)) {
            continue;
        }

        try {
            if (rhs[key]?.constructor === Object) {
                rhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
            } else {
                lhs[key] = rhs[key];
            }
        } catch (e) {
            lhs[key] = rhs[key];
        }
    }

    return lhs;
}
