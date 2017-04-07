export function NumberWrapperParseInt(text: any, radix: number) {
  if (radix == 10) {
    if (/^(\-|\+)?[0-9]+$/.test(text)) {
      return parseInt(text, radix);
    }
    return 0;
  } else if (radix == 16) {
    if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
      return parseInt(text, radix);
    }
    return 0;
  } else {
    var result = parseInt(text, radix);
    if (!isNaN(result)) {
      return result;
    }
    return 0;
  }
}
