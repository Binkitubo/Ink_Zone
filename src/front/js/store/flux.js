const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      styles: [],
      prices: [],
    },

    actions: {

      signup: async (username, email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password
          }),
        };

        try {
          const resp = await fetch("https://ink-zone.herokuapp.com/api/signup", opts)
            const data = await resp.json();
            console.log("this came from the backend", data);
            const response = await data.created;
            if(response) {
              sessionStorage.setItem("created", data.created);
              setStore({message: data.msg}); 
            }
            else {
              setStore({message: data.msg})
            }
          }
          catch(error) {
            console.error("There has been an error during sign up!", error);
          }
        },

      syncTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
        console.log("Application just loaded, synching the session storage token");
        if (token && token != "" && token != undefined) setStore({ token: token });
      },

      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password
          }),
        };

        try {
          const resp = await fetch("https://ink-zone.herokuapp.com/api/token", opts)
          if (resp.status !== 200){
            alert("Email or password not correct!");
            return false;
          } 

          const data = await resp.json();
          console.log("this came from the backend", data);
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token});
          return true;
        }
        catch(error){
          console.error("There has been an error login in!", error)
        }
      },

      getMesssage: () => {
        const store = getStore();
        const opts = {
          headers: {
            Authorization: "Bearer " + store.token
          }
        }
        fetch("https://ink-zone.herokuapp.com/api/private", opts)
        .then(resp => resp.json())
        .then(data => setStore({ message: data.msg }))
        .catch(error => console.log("Error loading message from backend", error));
      },

      logout: () => {
        sessionStorage.removeItem("token");
        console.log("Login out");
        setStore({ token: null });
      },

      loadStyles: () => {
        fetch("https://ink-zone.herokuapp.com/api/styles/")
          .then((response) => response.json())
          .then((data) => setStore({ styles: data }));
      },

      loadPrices: () => {
        fetch("https://ink-zone.herokuapp.com/api/prices/")
          .then((response) => response.json())
          .then((data) => setStore({ prices: data }));
      },
    },
  };
};

export default getState;
