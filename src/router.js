import Vue from 'vue'
import Router from 'vue-router'
import Produtos from './components/Produto/Produtos'
import Clientes from './components/Cliente/Clientes'
import Pedidos from './components/Pedido/Pedidos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      nome: 'Produtos',
      component: Produtos
    },
    {
      path: '/produtos',
      nome: 'Produtos',
      component: Produtos
    },
    {
      path: '/clientes',
      nome: 'Clientes',
      component: Clientes
    },
    {
      path: '/pedidos',
      nome: 'Pedidos',
      component: Pedidos
    }
  ]
})
