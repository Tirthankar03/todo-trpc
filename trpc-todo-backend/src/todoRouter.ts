import { publicProcedure, router } from './trpc';
import { 
  TodoSchema, 
  CreateTodoSchema, 
  UpdateTodoSchema, 
  DeleteTodoSchema,
  Todo
} from '../../shared/types';

let todos: Todo[] = [];

export const todoRouter = router({
  getAllTodos: publicProcedure.query(() => todos),
  
  addTodo: publicProcedure
    .input(CreateTodoSchema)
    .mutation(({ input }) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: input.text,
        completed: false,
      };
      todos.push(newTodo);
      return newTodo;
    }),
  
  updateTodo: publicProcedure
    .input(UpdateTodoSchema)
    .mutation(({ input }) => {
      const index = todos.findIndex((todo) => todo.id === input.id);
      if (index !== -1) {
        todos[index] = { ...todos[index], ...input };
        return todos[index];
      }
      throw new Error('Todo not found');
    }),
  
  deleteTodo: publicProcedure
    .input(DeleteTodoSchema)
    .mutation(({ input }) => {
      const index = todos.findIndex((todo) => todo.id === input.id);
      if (index !== -1) {
        const deletedTodo = todos[index];
        todos.splice(index, 1);
        return deletedTodo;
      }
      throw new Error('Todo not found');
    }),
});