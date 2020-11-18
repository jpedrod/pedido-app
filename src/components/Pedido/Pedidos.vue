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
            <input type="date" placeholder="Data" v-model="data" required />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="lname">Descricao</label>
          </div>
          <div class="col-75">
            <textarea type="text" placeholder="Descrição" v-model="descricao" />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="lname">Produtos</label>
          </div>
          <div class="col-75">
            <li v-for="(produto, index) in produtos" :key="index">
              <input :id="produto.slug" :value="produto" name="produto" type="checkbox" v-model="produtosMarcados" />
              <label :for="produto.slug"><span></span></label>
            </li>
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
        <th>Tipo</th>
        <th>Nome</th>
        <th>CPF</th>
        <th>Telefone</th>
        <th>Email</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="pessoas.length">
        <tr v-for="(pessoa, index) in pessoas" :key="index">
          <td> {{ pessoa.tipo }}</td>
          <td> {{ pessoa.id }}</td>
          <td> {{ pessoa.nome + " " + pessoa.sobrenome }}</td>
          <td> {{ pessoa.cpf_cnpj }}</td>
          <td> {{ pessoa.telefone }}</td>
          <td> {{ pessoa.email }}</td>
          <td>
            <Button v-if="editando == false" @click="montaDados(pessoa)">Editar</Button>
            <Button @click="remover(pessoa)">Remover</Button>
          </td>
        </tr>
      </tbody>
      <tfoot v-else>
        <tr>
          <td colspan="7" style="text-align: center">
            <h5>Nenhum cliente localizado</h5>
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
      data: '',
      descricao: '',
      tipo: '',
      nome: '',
      sobrenome: '',
      razao_social: '',
      cpf_cnpj: '',
      telefone: '',
      email: '',
      editando: false
    }
  },
  created () {
    this.$http.get('https://pedido3.herokuapp.com/pessoa/lista').then((res) => {
      this.pessoas = res.data.data
    })
  },
  props: {},
  methods: {
    adicionar () {
      const _pessoa = {
        pessoa: {
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

      this.$http.post('https://pedido3.herokuapp.com/pessoa', _pessoa)
      this.cancelar()
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
    montaDados (pessoa) {
      this.id = pessoa.id
      this.nome = pessoa.nome
      this.telefone = pessoa.telefone
      this.email = pessoa.email
      this.pessoa_fisica = pessoa.pessoa_fisica
      this.sobrenome = pessoa.sobrenome
      this.cpf_cnpj = pessoa.cpf_cnpj
      this.editando = true

      const indice = this.pessoas.indexOf(pessoa)
      this.pessoas.splice(indice, 1)
    },
    remover (pessoa) {
      this.$http
        .delete(`https://pedido3.herokuapp.com/pessoa/${pessoa.id}`)
        .then((res) => {
          this.pessoas = res.data.data
        })
    },
    cancelar () {
      this.$http
        .get('https://pedido3.herokuapp.com/pessoa/lista')
        .then((res) => {
          this.pessoas = res.data.data

          this.id = 0
          this.nome = ''
          this.telefone = ''
          this.email = ''
          this.pessoa_fisica = true
          this.sobrenome = ''
          this.cpf_cnpj = ''
          this.editando = false
        })
    }
  }
}
</script>

<style>
</style>
