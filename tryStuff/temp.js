function expandedForm(num) {
    return num.toString().split('').reverse().map((x, i) => x * 10**i).reverse().join(' + ')
}

console.log(expandedForm((12)))