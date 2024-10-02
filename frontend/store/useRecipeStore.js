import axios from "axios";
import { create } from "zustand";

const useRecipeStore = create((set, get) => ({

    recipe:[],
    setRecipe:(recipe)=>set(recipe),
    isLoading:false,

    postRecipe: async (recipeData)=>{
        set({isLoading:true})
        try {
            const response = await axios.post("http://localhost:3000/api/recipe/post",recipeData);
         
            set({isLoading:false})
            console.log(response.data);

        } catch (error) {
            console.log(error);
            set({isLoading:false})
        }
    }

}));

export default useRecipeStore;