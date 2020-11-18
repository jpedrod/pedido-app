<template>
  <div>
    <titulo texto="Todos os Clientes" />
    <h3 class="lblForm">Dados do Cliente</h3>
    <div class="container">
      <div class="form">
        <div class="row">
          <div class="col-25">
            <label for="fname">Nome</label>
          </div>
          <div class="col-75">
            <input type="text" placeholder="Nome" v-model="nome" required />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="lname">Sobrenome</label>
          </div>
          <div class="col-75">
            <input type="text" placeholder="Sobrenome" v-model="sobrenome" required />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="subject">CPF</label>
          </div>
          <div class="col-75">
            <input type="text" placeholder="CPF" v-model="cpf_cnpj" />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="subject">Email</label>
          </div>
          <div class="col-75">
            <input type="text" placeholder="Email" v-model="email" />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="subject">Telefone</label>
          </div>
          <div class="col-75">
            <input type="text" placeholder="Telefone" v-model="telefone" />
          </div>
        </div>
        <br>
        <div class="row">
          <button class="btnForm" v-if="editando == false" @click="adicionar()">Adicionar</button>
          <button class="btnForm" v-if="editando" @click="atualizar()">Gravar</button>
          <button class="btnForm" v-if="editando" @click="cancelar()">Cancelar</button>
        </div>
      </div>
    </div>

    <br>

    <div style="overflow-x:auto;">
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
          <td class="colPequeno">{{ pessoa.id }}</td>
          <td class="colPequeno">{{ pessoa.tipo }}</td>
          <td class="colPequeno">{{ pessoa.nome + " " + pessoa.sobrenome }}</td>
          <td class="colPequeno">{{ pessoa.cpf_cnpj }}</td>
          <td class="colPequeno">{{ pessoa.telefone }}</td>
          <td class="colPequeno">{{ pessoa.email }}</td>
          <td class="colPequeno">
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
      pessoas: [],
      id: 0,
      pessoa_fisica: false,
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
      this.$http.get('https://pedido3.herokuapp.com/pessoa/lista').then((res) => {
        this.pessoas = res.data.data
      })
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
