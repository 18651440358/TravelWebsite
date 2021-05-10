export function titleCase(str){
    return str.toLowerCase().replace(/\b([\w|‘]+)\b/g, function(word) {
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    });
}
