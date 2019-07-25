export interface IBoard {
  snake: Map<string, number>;
  head: [number, number];
  moveSnake: (hasSnack: boolean) => boolean;
}

export interface IBoardState {
  isWin: boolean;
  isLoss: boolean;
  snackLocation: [number, number] | null;
}