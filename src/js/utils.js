function removeFromArray(arr, obj) {
    var index = arr.indexOf(obj);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
