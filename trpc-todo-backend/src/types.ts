import { z } from 'zod';

// Define schemas
export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
});

export const CreateTodoSchema = z.object({
  title: z.string(),
});

export const UpdateTodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
});

export const DeleteTodoSchema = z.object({
  id: z.string(),
});

// Infer types
export type Todo = z.infer<typeof TodoSchema>;
export type CreateTodoInput = z.infer<typeof CreateTodoSchema>;
export type UpdateTodoInput = z.infer<typeof UpdateTodoSchema>;
export type DeleteTodoInput = z.infer<typeof DeleteTodoSchema>;
