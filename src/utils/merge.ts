export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const key in rhs) {
        if (!rhs.hasOwnProperty(key)) {
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
