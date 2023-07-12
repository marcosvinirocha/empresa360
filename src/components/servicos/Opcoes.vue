<template>
    <div>
        <h5>Compondente Opções</h5>
        <p>Poderíamos recuperar as opções do serviço id {{ id }}</p>
    </div>
</template>

<script>
export default {
    name: "Opcoes",
    props: ["id"],
    created() {
        //console.log('Parâmetro via props', this.id)
    },
    beforeUpdate() {
        console.log("Atualizado");
    },
};
</script>
