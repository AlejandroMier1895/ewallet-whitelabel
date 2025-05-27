export default function({ $auth, redirect, route }) {
    const user = $auth.user;

    if (!user) {
        if (route.path !== '/') {
            return redirect('/');
        }
        return;
    }

    if (!$auth.loggedIn) {
        return redirect('/');
    }
}