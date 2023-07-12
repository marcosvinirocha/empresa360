<template>
    <div>
        <div class="card mb-4">
            <div class="card-header">Contratos</div>
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <label class="form-label">ID Contrato:</label>
                        <input type="text" class="form-control" v-model="formPesquisa.id_like">
                    </div>
                    <div class="col-6">
                        <label class="form-label">Data início:</label>
                        <div class="input-group">
                            <input type="date" class="form-control" v-model="formPesquisa.data_inicio_gte">
                            <input type="date" class="form-control" v-model="formPesquisa.data_inicio_lte">
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-primary" @click="pesquisar">Pesquisar</button>
            </div>
        </div>

        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">LEAD</th>
                    <th scope="col">SERVICO</th>
                    <th scope="col">DATA INÍCIO</th>
                    <th scope="col">DATA FIM</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="d in dados" :key="d.id">
                    <td>{{ d.id }}</td>
                    <td>{{ d.lead.nome }}</td>
                    <td>{{ d.servico.servico }}</td>
                    <td>{{ d.data_inicio }}</td>
                    <td>{{ d.data_fim }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import ApiMixin from '@/mixins/ApiMixin'

export default {
    name: 'Leads',
    mixins: [ApiMixin],
    data: () => ({
        parametrosDeRelacionamento: '_expand=lead&_expand=servico',
        formPesquisa: {
            id_like: '',
            data_inicio_gte: '',
            data_inicio_lte: ''
        }
    }),
    methods: {
        pesquisar() {
            const url = `http://localhost:3000/contratos?${this.parametrosDeRelacionamento}`
            this.getDadosApi(url, this.formPesquisa)
        }
    },
    created() {
        const url = `http://localhost:3000/contratos?${this.parametrosDeRelacionamento}`
        this.getDadosApi(url, this.$route.query)
    },
    beforeRouteUpdate(to, from, next) {
        const url = `http://localhost:3000/contratos?${this.parametrosDeRelacionamento}`
        this.getDadosApi(url, to.query)
        next()
    }
}
</script>