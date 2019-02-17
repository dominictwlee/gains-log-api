export default function jsonSafeParse(text: string, reviver?: () => void) {
  let error: SyntaxError | null;
  let jsonObj: string;

  try {
    jsonObj = JSON.parse(text, reviver);
  } catch (e) {
    error = e;
  }

  return [error, jsonObj];
}
