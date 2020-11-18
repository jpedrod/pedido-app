<template>
  <div>
    <titulo texto="Todos os Produtos" />
    <h3 class="lblForm">Dados do Produto</h3>
    <div class="container">
      <div class="form">
        <div class="row">
          <div class="col-25">
            <label for="fname">Produto</label>
          </div>
          <div class="col-75">
            <input type="text" placeholder="Produto" v-model="nome" required />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="lname">descricao</label>
          </div>
          <div class="col-75">
            <textarea type="text" placeholder="Descrição" v-model="descricao" />
            </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="fname">Valor</label>
          </div>
          <div class="col-75">
          <input type="number" placeholder="Valor" v-model="valor" required />
          </div>
        </div>
        <br>
        <div class="row">
          <button v-if="editando == false" class="" @click="adicionar()">Adicionar</button>
          <button v-if="editando" class="" @click="atualizar()">Gravar</button>
          <button v-if="editando" class="" @click="cancelar()">Cancelar</button>
        </div>
      </div>
    </div>

    <br>
    <div style="overflow-x:auto;">
      <table>
        <thead>
          <th>Cód.</th>
          <th>Produto</th>
          <th>Descricao</th>
          <th>Valor</th>
          <th>Opções</th>
        </thead>
        <tbody v-if="produtos.length">
          <tr v-for="(produto, index) in produtos" :key="index">
            <td class="colPequeno">{{ produto.id }}</td>
            <td class="colPequeno">{{ produto.nome }}</td>
            <td class="colPequeno">{{ produto.descricao }}</td>
            <td class="colPequeno">{{ produto.valor }}</td>
            <td class="colPequeno">
              <Button v-if="editando == false" @click="montaDados(produto)">Editar</Button>
              <Button @click="remover(produto)">Remover</Button>
            </td>
          </tr>
        </tbody>
        <tfoot v-else>
          <tr>
            <td colspan="5" style="text-align: center">
              <h5>Nenhum Produto localizado</h5>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
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
      titulo: 'Produtos',
      produtos: [],
      nome: '',
      descricao: '',
      valor: '',
      editando: false
    }
  },
  created () {
    this.$http
      .get('https://pedido3.herokuapp.com/produto/lista')
      .then((res) => {
        this.produtos = res.data.data
      })
  },
  props: {},
  methods: {
    adicionar () {
      const _produto = {
        id: 0,
        nome: this.nome,
        descricao: this.descricao,
        valor: Number(this.valor)
      }

      this.$http
        .post('https://pedido3.herokuapp.com/produto', _produto)
        .then((res) => {
          this.id = 0
          this.nome = ''
          this.descricao = ''
          this.valor = ''
          this.produtos = res.data.data
        })
    },
    atualizar () {
      const _produto = {
        id: this.id,
        nome: this.nome,
        descricao: this.descricao,
        valor: Number(this.valor)
      }

      this.$http.put('https://pedido3.herokuapp.com/produto', _produto)
        .then((res) => {
          this.produtos = res.data.data
        })
      this.cancelar()
    },
    montaDados (produto) {
      this.id = produto.id
      this.nome = produto.nome
      this.descricao = produto.descricao
      this.valor = produto.valor
      this.editando = true

      const indice = this.produtos.indexOf(produto)
      this.produtos.splice(indice, 1)
    },
    remover (produto) {
      this.$http
        .delete(`https://pedido3.herokuapp.com/produto/${produto.id}`)
        .then((res) => {
          this.produtos = res.data.data
        })
    },
    cancelar () {
      this.$http
        .get('https://pedido3.herokuapp.com/produto/lista')
        .then((res) => {
          this.produtos = res.data.data

          this.id = 0
          this.nome = ''
          this.descricao = ''
          this.valor = ''
          this.editando = false
        })
    }
  }
}
</script>

<style>
</style>
