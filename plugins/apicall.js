export default async({ app }, inject) => {
    inject('apicall', {
        name: 'Apicall',
        async fetchGET(url) {
            let subaccount = {}
            if (app.$auth.$storage.getUniversal("subaccount"))
                subaccount = { 'SUBACCOUNT': app.$auth.$storage.getUniversal("subaccount") };

            const response = await app.$axios.get(url, { headers: subaccount })
                .then(function(res) {
                    if (res)
                        return res
                }).catch(function(error) {
                    return error.response
                })
            return response
        },
        async fetchPOST(url, data) {
            let subaccount = {}
            if (app.$auth.$storage.getUniversal("subaccount"))
                subaccount = { 'SUBACCOUNT': app.$auth.$storage.getUniversal("subaccount") };

            let axiosConfig = {
                headers: subaccount
            };
            const responseData = await app.$axios.post(url, data, axiosConfig).then(
                function(response) {
                    if (response)
                        return response
                }
            ).catch(function(error) {
                return error.response
            })
            return responseData
        },
        async fetchPATCH(url, data) {
            const responseData = await app.$axios.patch(url, data).then(
                function(response) {
                    if (response)
                        return response
                }
            ).catch(function(error) {
                return error.response
            })
            return responseData
        },
        async fetchFormPATCH(url, data) {
            const responseData = await app.$axios.patch(url, data, { headers: { "Content-Type": "multipart/form-data", }, }).then(
                function(response) {
                    if (response)
                        return response
                }
            ).catch(function(error) {
                return error.response
            })
            return responseData
        },
        async fetchFormPOST(url, data) {
            const responseData = await app.$axios.post(url, data).then(
                function(response) {
                    if (response)
                        return response
                }
            ).catch(function(error) {
                return error.response
            })
            return responseData
        },
    })

}