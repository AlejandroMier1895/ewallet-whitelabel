export default function({ store }, inject) {

    const mockAuth = {
        loggedIn: true,
        user: null,

        setUser(user) {
            this.user = user;
            this.loggedIn = !!user;

            if (store._modulesNamespaceMap['auth/']) {
                store.commit('auth/setUser', user);
                store.commit('auth/setLoggedIn', !!user);
            } else {
                console.warn("El módulo 'auth' no está registrado aún.");
            }
        },
        logout() {
            this.user = null;
            this.loggedIn = false;
            if (store._modulesNamespaceMap['auth/']) {
                store.commit('auth/setUser', null);
                store.commit('auth/setLoggedIn', false);
            }
        }
    };

    inject('auth', mockAuth);
}