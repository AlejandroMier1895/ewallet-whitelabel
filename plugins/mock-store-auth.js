export default function({ store }) {

    store.registerModule('auth', {
        namespaced: true,
        state: () => ({
            user: {},
            loggedIn: false
        }),
        mutations: {
            setUser(state, user) {
                state.user = user;
                state.loggedIn = !!user;
            },
            setLoggedIn(state, value) {
                state.loggedIn = value;
            }
        },
        actions: {
            setUser({ commit }, user) {
                commit('setUser', user);
            },
            setLoggedIn({ commit }, value) {
                commit('setLoggedIn', value);
            }
        }
    });
}