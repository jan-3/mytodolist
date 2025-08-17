<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import { Head } from '@inertiajs/vue3'
import { useTaskStore } from '../stores/task'
import {ref,reactive, onMounted} from 'vue';
import PlaceholderPattern from '../components/PlaceholderPattern.vue'

// no type annotations, just plain JS
const breadcrumbs = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
]
const task_store = useTaskStore()
let show = ref(false)
let status = ref(null)
let form = reactive({status:'',category:'',priority_level:''})
const selected = ref('')
const options = reactive({
  priority:['Low', 'Medium','High'],
  category:['Bug', 'Development', 'Modification'],
  status:['Finished','On-going','Pending','Cancelled']
})


function close(){
    show.value=false
}
function openDialog(action,obj){
    show.value = true
    status.value = action
    if(obj){
      form = obj
    }else{
      form = {status:'',category:'',priority_level:''}
    }
}
function submitForm(status){
  if(status=='Add'){
    task_store.addTask(form)
  }else{
    console.log('editin', form)
    task_store.editTask(form,false)
  }
    show.value = false
}
function deleteTask(task){
  console.log(task.id, 'deleteig')
  task_store.deleteTask(task.id)
}
function finishAll(){
  // task_store.finishAll()
   task_store.editTask({id:0},true)
}
onMounted(()=>{
  task_store.fetchTasks()
})
</script>

<template>
  <Head title="Dashboard" />

  <AppLayout :breadcrumbs="breadcrumbs">
    <div class="flex justify-between items-center mx-3">
      <span class="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Task List
      </span>
      <button @click="openDialog('Add')"  class="m-3 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none transition">Add Task</button>
    </div>
      <table class="min-w-full bg-white border border-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <!-- <th class="py-1 text-center font-medium text-gray-600 border-b"> </th> -->
          <th class="py-1 text-center font-medium text-gray-600 border-b">Task details</th>
          <th class="py-1 text-center font-medium text-gray-600 border-b">Priority Level</th>
          <th class="py-1 text-center font-medium text-gray-600 border-b">Category</th>
          <th class="py-1 text-center font-medium text-gray-600 border-b">Due Date</th>
          <th class="py-1 text-center font-medium text-gray-600 border-b">Status</th>
          <th class="py-1 text-center font-medium text-gray-600 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-gray-50" v-for="(task,i) in task_store.taskList" :key="i">
          <!-- <td class="py-2 text-center align-middle">x</td> -->
          <td class="py-2 text-center align-middle">{{task.description}}</td>
          <td class="py-2 text-center align-middle">{{task.priority_level}}</td>
          <td class="py-2 text-center align-middle">{{task.category}}</td>
          <td class="py-2 text-center align-middle">{{task.due_date}}</td>
          <td class="py-2 text-center align-middle">{{task.status}}</td>
          <td class="py-2 text-center align-middle">
            <button @click="openDialog('Edit',task)" class="text-blue-500 hover:underline">Edit</button>
            <button @click="deleteTask(task)" class="text-red-500 hover:underline ml-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50"
    @click.self="close()"
  >
    <div class="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative">
    <h2 class="text-2xl font-semibold mb-4"> {{status}} Task</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
        <div>
            <label for="description" class="block text-sm font-medium text-gray-700">
            Description
            </label>
            <input
            type="text"
            id="description"
            v-model="form.description"
            placeholder="Enter task description"
            class="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
        </div>
        <div>
            <label for="priority_level" class="block text-sm font-medium text-gray-700">
            Priority Level
            </label>
            <select
              v-model="form.priority_level"
              class="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value="" disabled>Select one</option>
              <option v-for="option in options.priority" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
        </div>
        <div>
            <label for="category" class="block text-sm font-medium text-gray-700">
            Category
            </label>
             <select
              v-model="form.category"
              class="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value="" disabled>Select one</option>
              <option v-for="option in options.category" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
        </div>
        <div>
            <label for="due_date" class="block text-sm font-medium text-gray-700">
            Due Date
            </label>
            <input
            type="date"
            id="due_date"
            v-model="form.due_date"
            placeholder="Enter task duedate"
            class="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
        </div>
        <div>
            <label for="status" class="block text-sm font-medium text-gray-700">
           Status
            </label>
            <select
              v-model="form.status"
              class="mt-1 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            >
              <option value="" disabled>Select one</option>
              <option v-for="option in options.status" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
        </div>
    </form>
    <button @click="submitForm(status)"  class="mt-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none transition">Save</button>
    <button @click="close()" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"> ✕ </button>
    <slot />
    </div>
  </div>
  </AppLayout>
</template>
