export function* Range(stop: number, start: number = 0, step: number = 1) {
  while (start < stop) {
    yield start;
    start += step;
  }
}
