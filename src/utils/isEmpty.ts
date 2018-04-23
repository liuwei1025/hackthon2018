export default function isEmpty(obj:any) {
    if (!obj) {
        return !obj;
    }
    return obj instanceof Array
        ? !obj.length
        : !Object.keys(obj).length;
}