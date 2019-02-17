export interface IExercise {
  name: string;
  reps: number;
  sets: number;
}

export interface IMovements {
  hinge: IExercise;
  pull: IExercise;
  push: IExercise;
  squat: IExercise;
}

export interface IExerciseRoutineItem {
  userId: string;
  routineId: string;
  createdAt: number;
  exercises: IMovements;
}
