<template>
  <div>
    <titulo texto="Todos os Pedidos" />
    <h3 class="lblForm">Dados do Pedido</h3>
    <div class="container">
      <form>
        <div class="row">
          <div class="col-25">
            <label>Data do pedido</label>
          </div>
          <div class="col-75">
            <input type="date" placeholder="Data" v-model="data_registro" required />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="lname">Obeservações</label>
          </div>
          <div class="col-75">
            <textarea type="text" placeholder="Descrição" v-model="observacao" />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label>Clientes</label>
          </div>
          <div class="col-75">
            <select id="v-for-clientes" v-model="cliente_id" >
                <option v-for="(cliente, index) in clientes" :key="index"  v-bind:value="cliente.id"> {{cliente.nome}} </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="lname">Produtos</label>
          </div>
          <div class="col-75">
            <div id="example-3">
              <div v-for="(produto, index) in produtos" :key="index">
                <input type="checkbox" v-bind:value="produto.id" v-model="produtosMarcados">
                <label v-bind:for=produto.id> {{produto.nome}} </label>
              </div>
            </div>
          </div>
        </div>
        <br>
        <div class="row">
          <button class="btnForm" v-if="editando == false" @click="adicionar()">Adicionar</button>
          <button class="btnForm" v-if="editando" @click="atualizar()">Gravar</button>
          <button class="btnForm" v-if="editando" @click="cancelar()">Cancelar</button>          
        </div>
      </form>
    </div>

    <br>

    <table>
      <thead>
        <th>Cód.</th>
        <th>Data</th>
        <th>nome_cliente</th>
        <th>Obeservações</th>
        <th>Valor</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="pedidos.length">
        <tr v-for="(pedido, index) in pedidos" :key="index">
          <td> {{ pedido.id }}</td>
          <td> {{ pedido.data_registro }}</td>
          <td> {{ pedido.nome_cliente }}</td>
          <td> {{ pedido.observacao }}</td>
          <td> {{ pedido.valor_total }}</td>
          <td>
            <Button v-if="editando == false" @click="montaDados(pedido)">Editar</Button>
            <Button @click="remover(pedido)">Remover</Button>
          </td>
        </tr>
      </tbody>
      <tfoot v-else>
        <tr>
          <td colspan="7" style="text-align: center">
            <h5>Nenhum pedido Localizado</h5>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import Titulo from '../_share/Titulo'

export default {
  components: {
    Titulo
  },
  data () {
    return {
      titulo: 'Clientes',
      produtosMarcados: [],
      produtos: [],
      pedidos: [],
      clientes: [],
      cliente_id: '',
      data_registro: '',
      observacao: '',
      editando: false
    }
  },
  created () {
    this.$http.get('https://pedido3.herokuapp.com/pedido/lista').then((res) => {
      this.pedidos = res.data.data
    })
    this.$http.get('https://pedido3.herokuapp.com/produto/lista').then((res) => {
      this.produtos = res.data.data
    })
    this.$http.get('https://pedido3.herokuapp.com/pessoa/lista').then((res) => {
      this.clientes = res.data.data
    })
  },
  props: {},
  methods: {
    adicionar () {
      const _pedido = {
        pedido:
        {
          cliente_id: this.cliente_id,
          data_registro: '01/02/2020',
          observacao: this.observacao
        },
        produtos: this.produtosMarcados
      }
      this.$http.post('https://pedido3.herokuapp.com/pedido', _pedido).then((res) => {
        this.id = 0
        this.cliente_id = 0
        this.observacao = ''
        this.editando = false
        this.produtosMarcados = []
      })
      this.$http.get('https://pedido3.herokuapp.com/pedido/lista').then((res) => {
        this.pedidos = res.data.data
      })
    },
    atualizar () {
      const _pessoa = {
        pessoa: {
          id: this.id,
          nome: this.nome,
          telefone: this.telefone,
          email: this.email,
          pessoa_fisica: true
        },
        pessoaFisica: {
          sobrenome: this.sobrenome,
          cpf: this.cpf_cnpj
        }
      }

      this.$http.put('https://pedido3.herokuapp.com/pessoa', _pessoa)
      this.cancelar()
    },
    montaDados (pedido) {
      this.data_registro = pedido.data_registro
      this.observacao = pedido.observacao
      this.cliente_id = pedido.cliente_id
      this.editando = true

      const indice = this.pedidos.indexOf(pedido)
      this.pedidos.splice(indice, 1)

      this.listaProdutosPedido(pedido)
    },
    remover (pedido) {
      this.$http
        .delete(`https://pedido3.herokuapp.com/pedido/${pedido.id}`)
      this.$http.get('https://pedido3.herokuapp.com/pedido/lista').then((res) => {
        this.pedidos = res.data.data
      })
    },
    cancelar () {
      this.$http
        .get('https://pedido3.herokuapp.com/pedido/lista')
        .then((res) => {
          this.pedidos = res.data.data

          this.id = 0
          this.cliente_id = 0
          this.observacao = ''
          this.editando = false
          this.produtosMarcados = []
        })
    },
    listaProdutos () {
      this.$http.get('https://pedido3.herokuapp.com/pedido/lista').then((res) => {
        this.pedidos = res.data.data
      })
    },
    listaProdutosPedido (pedido) {
      this.$http.get(`https://pedido3.herokuapp.com/pedido/${pedido.id}`).then((res) => {
        this.produtosMarcados = []
        console.log(res.data.data)
        res.data.data.forEach(element => {
          this.produtosMarcados.push(element.id)
        })
      })
    }
  }
}
</script>

<style>
</style>
