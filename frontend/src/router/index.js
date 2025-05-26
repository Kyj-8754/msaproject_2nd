import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue';
import About from '@/pages/About.vue';
import TodoList from '@/pages/TodoList.vue';
import AddTodo from '@/pages/AddTodo.vue';
import EditTodo from '@/pages/EditTodo.vue';
import NotFound from '@/pages/NotFound.vue';
import Member_LoginForm from '@/pages/member/loginForm.vue';
import Member_RegistForm from '@/pages/member/registForm.vue';
import Member_DetailView from '@/pages/member/detailView.vue';
import Member_UpdateForm from '@/pages/member/updateForm.vue';
import Member_List from '@/pages/member/list.vue';
import Board_DetailView from '@/pages/board/detailView.vue';
import Board_List from '@/pages/board/list.vue';
import Board_RegistForm from '@/pages/board/registForm.vue';
import Board_UpdateForm from '@/pages/board/updateForm.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/about', component: About },
        { path: '/todos', component: TodoList },
        { path: '/todos/add', component: AddTodo },
        { path: '/todos/edit/:id', component: EditTodo },
        { path: '/member/loginForm', component: Member_LoginForm },
        { path: '/member/registForm', component: Member_RegistForm },
        { path: '/member/detailView', component: Member_DetailView },
        { path: '/member/updateForm', component: Member_UpdateForm },
        { path: '/member/list', component: Member_List },
        { path: '/board/detailView', component: Board_DetailView },
        { path: '/board/list', component: Board_List },
        { path: '/board/registForm', component: Board_RegistForm },
        { path: '/board/updateForm', component: Board_UpdateForm },
        { path: '/:paths(.*)*', component: NotFound },
    ]
})

export default router;