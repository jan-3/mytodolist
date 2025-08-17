
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    count: 0,
    taskList:[],
    error:null
  }),
  actions: {
    increment() {
      this.count++
    },
    async fetchTasks(){
      try {
        const res = await fetch('api/tasks')
        if(!res.ok){
          throw new Error('failed to fetch')
        }
        this.taskList = await res.json()
        console.log(this.taskList,'aa')
      } catch (error) {
        this.error = error.message
      }
    },
    async addTask(payload) {
      console.log(payload,'payload-post')
      try{
        const res = await fetch('api/tasks',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
      })

      if(!res.ok){
         throw new Error('failed to post')
      }else{
        const created = await res.json()
        this.taskList.push(created)
        this.fetchTasks()
      }
      } catch (err){
        this.error = err.message
      }
      
    },
    async editTask(payload){
       try{
        // 'api/tasks/'+ payload.id +'?finishAll'
        const res = await fetch(`api/tasks/${payload.id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
      })
      console.log(res, '@@res')
      if(!res.ok) throw new Error('failed to delete');
      this.taskList = this.taskList.filter(f=>f.id!=id)
      }catch(err){
        this.error = err.message
      }
    },
    async deleteTask(id){
      try {
        const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('Failed to delete task');

      const data = await res.json();
      console.log(data.message); // "Task deleted successfully"

        // Remove task from state
        this.taskList = this.taskList.filter(task => task.id !== id);
      } catch (err) {
        this.error = err.message;
      }
    },

  },
    persist: true,
})
