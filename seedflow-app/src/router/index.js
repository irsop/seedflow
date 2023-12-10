import Vue from 'vue'
import VueRouter from 'vue-router'
import { mapActions } from 'vuex';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        meta: {
            access: 'public',
        },
        component: () => import('@/views/MainPage'),
    },
    {
        path: '/advice',
        meta: {
            access: 'public'
        },
        component: () => import('@/views/AdvicePage'),
    },
    {
        path: '/about',
        meta: {
            access: 'public'
        },
        component: () => import('@/views/AboutPage'),
    },
    {
        path: '/cart',
        meta: {
            access: 'customer_only'
        },
        component: () => import('@/views/CartPage'),
    },
    {
        path: '/admin',
        meta: {
            access: 'admin_only'
        },
        component: () => import('@/views/AdminView'),
    },
    {
        path: '/auth/logout',
        meta: {
            access: 'public'
        },
        component: {
            render(h) {
                return h('div');
            },
            methods: {
                ...mapActions(['unauth']),
            },
            created() {
                this.unauth();
                this.$router.push('/login');
            },
        },
    },
    {
        path: '/auth',
        meta: {
            access: 'guest_only'
        },
        component: () => import('@/views/AuthView'),
    },
    {
        path: '/login',
        meta: {
            access: 'guest_only'
        },
        component: () => import('@/views/LoginView'),
    },
    {
        path: '/register',
        meta: {
            access: 'guest_only'
        },
        component: () => import('@/views/RegisterView'),
    },
    {
        path: '/actions',
        meta: {
            access: 'public'
        },
        component: () => import('@/views/ActionsPage'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

const ACCESS_SCHEMA_REDIRECTS = {
    'admin': {
        'admin_only': false,
        'public': false,
        'guest_only': '/admin',
        'customer_only': '/login',
    },
    'customer': {
        'admin_only': '/login',
        'public': false,
        'guest_only': '/',
        'customer_only': false,
    },
    'guest': {
        'admin_only': '/',
        'public': false,
        'guest_only': false,
        'customer_only': '/login',
    },
};

const getAccess = () => {
    const token = JSON.parse(window.localStorage.getItem('application_seedflow'));
    if (!token?.auth) {
        return 'guest';
    }
    const role = token?.auth?.role;
    if (role) {
        return role;
    }
    return 'guest';
};

const checkAccess = (needAccess) => {
    const currentAccess = getAccess();
    return ACCESS_SCHEMA_REDIRECTS[currentAccess][needAccess];
};

router.beforeEach((to, from, next) => {
    const redirect = checkAccess(to.meta.access);
    if (redirect) {
        next(redirect);
    }
    next();
});

export default router
