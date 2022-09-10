export default async function ({ app, redirect, store }) {
  let authenticated = false;
  console.log("We konwer ehre");
  // First we will from the state if the user is authenticated
  // console.log(store.state.authenticated);
  let checkLoginFromStore = store.state.authentication.isLogin;

  //If yes, then let the user proceed without any further checks.
  if (!checkLoginFromStore) {
    if (app.$cookies.get("isLogin") && !!app.$cookies.get("access_token")) {
      const auth = await store.dispatch(
        "authentication/updateLoginAndTokenFromLocalStorage"
      );
      authenticated = true;
    }
    if (!authenticated) {
      return redirect("/login");
    }
  }
}
