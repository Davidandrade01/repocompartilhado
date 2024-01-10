import { ENV } from "@/utils";
import { authFetch } from "@/utils/authFetch";


export class cartClass{
     add(gameId){

        const cartArr= this.getCart()
       
       const data={
        id:gameId,
        qty:1
       }

       const itemIndex=cartArr.findIndex((item)=>item.id===gameId)

       if(itemIndex<0){
        cartArr.push(data)
       }
        else{
            const product=cartArr[itemIndex]
            product.qty++
            //console.log(product.qty)
        }
        
        
      localStorage.setItem(ENV.CART,JSON.stringify(cartArr))
        
        


        
    }

    getCart(){
        const response=localStorage.getItem(ENV.CART)

        if(!response){
            return []
        }
        else{
            return JSON.parse(response)
        }
        
    }

    totalcart() {
     const response= this.getCart()
        let count=0
     response.forEach((item)=>{
        
        count+=item.qty
     })
        return count
    }

   updateCart(gameId,qty){
    const response= this.getCart()
    const itemIndex=response.findIndex((item)=>item.id===gameId)
    response[itemIndex].qty=qty
    localStorage.setItem( ENV.CART, JSON.stringify(response))
   }

   delItem(gameId){
    const response= this.getCart()
    const filtered=response.filter((item)=>item.id !== gameId)
    
    localStorage.setItem(ENV.CART,JSON.stringify(filtered))

    }

    deleteAll(){
        localStorage.removeItem(ENV.CART)

    }

    async paymentCart(token, products, idUser, address) {
        try {
          const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAYMENT_ORDER}`;
          const params = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              products,
              idUser,
              addressShipping: address,
            }),
          };
    
          const response = await authFetch(url, params);
    
          return response;
        } catch (error) {
          throw error;
        }
      }
}