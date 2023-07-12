import { createRouter, createWebHistory } from 'vue-router'
//createWebHashHistory
//import Contratos from '@/components/vendas/Contratos.vue'
//import Dashboard from '@/components/dashboard/Dashboard.vue'
//import DashboardRodape from '@/components/dashboard/DashboardRodape.vue'
// import Home from '@/views/Home.vue'
// import Indicadores from '@/components/servicos/Indicadores.vue'
// import Lead from '@/components/vendas/Lead.vue'
// import Leads from '@/components/vendas/Leads.vue'
// import Login from '@/views/Login.vue'
// import Opcoes from '@/components/servicos/Opcoes.vue'
// import PaginaNaoEncontrada from '@/views/PaginaNaoEncontrada.vue'
// import Servico from '@/components/servicos/Servico.vue'
// import Servicos from '@/components/servicos/Servicos.vue'
// import Site from '@/views/Site.vue'
// import Vendas from '@/components/vendas/Vendas.vue'
// import VendasPadrao from '@/components/vendas/VendasPadrao.vue'

// Lazy loading
const Contratos = () => import(/* webpackChunkName: "vendas"*/ '@/components/vendas/Contratos.vue')
const Dashboard = () => import('@/components/dashboard/Dashboard.vue')
const DashboardRodape = () => import('@/components/dashboard/DashboardRodape.vue')
const Home = () => import('@/views/Home.vue')
const Indicadores = () => import('@/components/servicos/Indicadores.vue')
const Lead = () => import(/* webpackChunkName: "vendas"*/ '@/components/vendas/Lead.vue')
const Leads = () => import(/* webpackChunkName: "vendas"*/ '@/components/vendas/Leads.vue')
const Login = () => import('@/views/Login.vue')
const Opcoes = () => import('@/components/servicos/Opcoes.vue')
const PaginaNaoEncontrada = () => import('@/views/PaginaNaoEncontrada.vue')
const Servico = () => import('@/components/servicos/Servico.vue')
const Servicos = () => import('@/components/servicos/Servicos.vue')
const Site = () => import('@/views/Site.vue')
const Vendas = () => import(/* webpackChunkName: "vendas"*/ '@/components/vendas/Vendas.vue')
const VendasPadrao = () => import('@/components/vendas/VendasPadrao.vue')

const routes = [
    {
        path: '/', //localhost:8080/
        component: Site,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/home', //localhost:8080/home
        alias: '/app',
        component: Home,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'vendas', component: Vendas, children:
                    [
                        {
                            path: 'leads',
                            component: Leads,
                            beforeEnter: () => {
                                // verificar se o ususario tem permissoes para acessar a rota
                                console.log('guarda rota beforeEnter')
                            },
                            name: 'leads'
                        }, //localhost:8080/home/vendas/leads
                        {
                            path: 'leads/:id/:outroParametro',
                            props: true,
                            /*
                            props: {
                                id: 4,
                                outroParametro: 'pt-br'
                            },
                            */
                            /*
                            props: route => {
    
                                console.log('Rota ativa: ', route)
    
                                let teste = route.query.idioma ? route.query.idioma : route.params.outroParametro
    
                                //implementando uma lógica para definir as props que serão submetidas para o componente roteado
                                return { 
                                    id: parseInt(route.params.id) + 1,
                                    outroParametro: teste 
                                }
                            },
                            */
                            component: Lead,
                            name: 'lead',
                            alias: [
                                '/l/:id/:outroParametro',
                                '/pessoa/:id/:outroParametro',
                                '/:id/:outroParametro'
                            ]
                        }, //localhost:8080/5
                        { path: 'contratos', component: Contratos, name: 'contratos' }, //localhost:8080/home/vendas/contratos
                        { path: '', component: VendasPadrao, name: 'vendas' } //localhost:8080/home/vendas/

                    ]
            }, //localhost:8080/home/vendas
            {
                path: 'servicos', component: Servicos, name: 'servicos', children:
                    [
                        {
                            path: ':id',
                            props: {
                                default: true,
                                indicadores: true,
                                opcoes: true
                            },
                            alias: '/s/:id',
                            name: 'servico',
                            components:
                            {
                                default: Servico,
                                indicadores: Indicadores,
                                opcoes: Opcoes
                            }
                        } //localhost:8080/home/servicos/5
                    ]
            }, //localhost:8080/home/servicos
            {
                path: 'dashboard', components:
                {
                    default: Dashboard,
                    rodape: DashboardRodape
                }
            }//localhost:8080/home/dashboard
        ]
    },
    {
        path: '/login', //localhost:8080/login
        component: Login
    },
    { path: '/redirecionamento-1', redirect: '/home/servicos' },
    { path: '/redirecionamento-2', redirect: { name: 'leads' } },
    { path: '/redirecionamento-3', redirect: '/home/vendas' },
    { path: '/redirecionamento-4', redirect: { name: 'vendas' } },
    {
        path: '/redirecionamento-5', redirect: to => {
            //podemos programar algo antes do redirecionamento ser efetivado
            console.log(to)

            //return '/home/vendas'
            return { name: 'vendas' }
        }
    },
    //{ path: '/:catchAll(.*)*', redirect: '/' } //Vue2 = *
    { path: '/:catchAll(.*)*', component: PaginaNaoEncontrada } //Vue2 = *
]

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: (to, from, savedPosition) => {
        // 
        console.log(savedPosition);

        if (savedPosition) {
            return savedPosition
        }

        if (to.hash) {
            return { el: to.hash }
        }
        return { left: 0, top: 0 }
    },
    routes //routes: routes
})

router.beforeEach((to) => {
    console.log('Rota atual', to)
    //verificar se o usuário está autorizado a acessar a rota
})

router.afterEach(() => {
    console.log('Rota finalizada')
})

router.beforeResolve(() => {
    console.log('Rota ativa')
})

export default router