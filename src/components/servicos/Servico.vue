<template>
    <div class="card">
        <div class="card-header bg-primary text-white">{{ dados.servico }}</div>
        <div class="card-body">
            <p class="card-text">{{ dados.descricao }}</p>
        </div>
    </div>
</template>

<script>
import ApiMixin from '@/mixins/ApiMixin'

export default {
    name: 'Servico',
    mixins: [ApiMixin],
    props: ['id'],
    created() {
        //console.log('Servico', this.$route.params.id)
        //console.log('Via props', this.$props)
        //console.log('Componente servico foi criado')
        this.getDadosApi(`http://localhost:3000/servicos/${this.id}`)
    },
    beforeRouteUpdate(to, from, next) {
        //to = $route para onde estamos indo
        //from = $route de onde estamos vindo
        //next = faz com que o fluxo de navegação siga em frente

        if(to.params.id != undefined) this.getDadosApi(`http://localhost:3000/servicos/${to.params.id}`)
        //console.log(from.params.id)
        next()
    }
    /*,
    watch: {
        $route(to) { // convenção: to = novo valor, from = valor antigo
            if(to.params.id != undefined) this.getDadosApi(`http://localhost:3000/servicos/${to.params.id}`)
        }
    }*/
}
</script>