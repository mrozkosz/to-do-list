import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Todolist from '../pages/ToDoList';

export default [{
    path: '/',
    component: Home,
    name: 'home'
},
{
    path: '/login',
    component: Login,
    name: 'login'
},
{
    path: '/register',
    component: Register,
    name: 'register'
},
{
    path: '/todolist',
    component: Todolist,
    name: 'todolist',
    meta: { requiresAuth: true }
}
]