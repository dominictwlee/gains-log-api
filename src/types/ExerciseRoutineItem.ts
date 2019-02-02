export type Exercise = {
  name: string;
  reps: number;
  sets: number;
};

export type Movements = {
  hinge: Exercise;
  pull: Exercise;
  push: Exercise;
  squat: Exercise;
};

export type ExerciseRoutineItem = {
  userId: string;
  routineId: string;
  createdAt: number;
  exercises: Movements;
};
