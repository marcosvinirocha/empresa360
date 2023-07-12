<template>
    <div>
        <h5>Compondente Indicadores</h5>
        <p>Poderíamos recuperar os indicadores do serviço id {{id}}</p>
    </div>
</template>

<script>
export default {
    name: 'Indicadores',
    props: ['id'],
    created() {
        //console.log('Indicadores - parâmetro va props', this.id)
    }    
}
</script>