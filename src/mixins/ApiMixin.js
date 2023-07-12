export default {
    data: () => ({
        dados: {}
    }),
    methods: {
        getDadosApi(url, queryParams = {}) {

            Object.keys(queryParams).forEach(chave => {
                if(queryParams[chave] == '') delete queryParams[chave]
            })

            const urlQueryParams = new URLSearchParams(queryParams).toString()
            
            const urlCompleta = urlQueryParams ? `${url}&${urlQueryParams}` : url

            fetch(urlCompleta)
                .then(response => response.json())
                .then(response => {
                    this.dados = response
                })
        }
    },
}