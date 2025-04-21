import { Server } from 'miragejs';
import { Task } from "./types/task";

const tasks:Task[] = [
  {
    id: 1,
    title: 'Задача 1',
    description: 'Описание задачи 1',
    completed: false,
    createdAt: new Date()
  },
  {
    id: 2,
    title: 'Задача 2',
    description: 'Описание задачи 2',
    completed: true,
    createdAt: new Date()
  },
  {
    id: 3,
    title: 'Задача 3',
    description: 'Описание задачи 3',
    completed: false,
    createdAt: new Date()
  }
]

export default () => {
  new Server({
    seeds(server) {
      server.db.loadData({
        tasks
      })
    },

    routes() {
      this.namespace = '/api';

      this.get('/tasks', (schema) => schema.db.tasks)

      this.get('/tasks/:id', (schema, request) => {
        const id = request.params.id;
        const task = schema.db.tasks.findBy({ id: Number(id) });

        return task
      })

      this.post('/tasks', (schema, request) => {
        const task = JSON.parse(request.requestBody)
        const completed = false
        const createdAt = new Date()
        return schema.db.tasks.insert({ ...task, completed, createdAt })
      })

      this.put('/tasks/:id', (schema, request) => {
        const updatedTask = JSON.parse(request.requestBody)
        return schema.db.tasks.update(request.params.id, updatedTask);
      })

      this.delete('/tasks/:id', (schema, request) => {
        const id = request.params.id;

        const task = schema.db.tasks.findBy({ id: Number(id) });

        schema.db.tasks.remove(id)

        return task
      })
    }
  })
}