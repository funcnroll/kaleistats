export function copyFormattedStringArrayToClipboard(arr: string[]): void {
  const string = arr.toString().split(",").join("\n");

  navigator.clipboard.writeText(string);
}
