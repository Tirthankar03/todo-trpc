import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.string(),
  text: z.string(),
  completed: z.boolean()
});

export const CreateTodoSchema = TodoSchema.omit({ id: true, completed: true });
export const UpdateTodoSchema = TodoSchema.partial();
export const DeleteTodoSchema = TodoSchema.pick({ id: true });

export type Todo = z.infer<typeof TodoSchema>;
export type CreateTodoInput = z.infer<typeof CreateTodoSchema>;
export type UpdateTodoInput = z.infer<typeof UpdateTodoSchema>;
export type DeleteTodoInput = z.infer<typeof DeleteTodoSchema>;