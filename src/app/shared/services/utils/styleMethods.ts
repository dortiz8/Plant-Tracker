

export class StyleMethods {
  static applyBackgroundColor(stateNumber: number): object {
    switch (stateNumber) {
      case 1:
        return { 'background-color': '' };
      case 2:
        return { 'background-color': 'yellow' };
      case 3:
        return { 'background-color': 'red' };
      default:
        return {};
    }
  }
}
