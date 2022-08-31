const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      styles: [],
    },

    actions: {
      signup: async (user) => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });
          const data = await resp.json();
          //setStore({ message: data.message })
          // don't forget to return something, that is how the async resolves
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      loadStyles: () => {
        fetch(
          "https://3001-karlymakowski-inkzone-abvl63tks0i.ws-eu63.gitpod.io/api/styles"
        )
          .then((response) => response.json())
          .then((data) => setStore({ styles: data }));
      },
    },
  };
};

export default getState;
