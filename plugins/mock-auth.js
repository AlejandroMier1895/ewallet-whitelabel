export default function({ store }, inject) {
    if (process.env.NODE_ENV !== 'development') return;

    const mockAuth = {
        loggedIn: true,
        user: null,

        setUser(user) {
            this.user = user;
            this.loggedIn = !!user;

            if (store._modulesNamespaceMap['auth/']) {
                store.commit('auth/setUser', user);
                store.commit('auth/setLoggedIn', !!user);
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