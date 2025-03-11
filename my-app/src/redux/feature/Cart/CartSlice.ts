import { createSlice } from "@reduxjs/toolkit";
import { store } from "../../store";
import { ICartItem } from "../../../page/Stores/Cart/Cart";
// interface CartItem {
//   id: string;         // Assuming item ID is a string
//   quantity: number;   // The quantity of the item in the cart
//   name?: string;      // Example of optional property
//   price?: number;     // Example of optional property
  
// }
interface CartState {
  items: ICartItem[];
  storeId: string | null;
}

const initialState:CartState={
    items:[],
    storeId:null

}
export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{

        addItemToCart:(state,action)=>{
            const {item,storeId} = action.payload;

        
            
            if (state.storeId && state.storeId !== storeId) {
                state.items = [];
                state.storeId = storeId;
                
              }
            console.log(state.items)
              const existingItem = state.items.find((cartItem) => cartItem.id === item.id);

              if (existingItem) {
                // Increment the quantity of the existing item
                existingItem.quantity += item.quantity;
              } else {
           console.log("else")
                state.items.push(item);
              }
        
        
        
        },
        removeItemFromCart:(state,action)=>{
            const {_id}= action.payload;
            // state.items= state.items.filter((item) => item.id !== itemId);
        }

    }
})

export const {addItemToCart} = cartSlice.actions
export default cartSlice.reducer