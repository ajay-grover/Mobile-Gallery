import React from 'react';
import{
  getfromstorage
} from './storage';

export default class Cart extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    state={
        cart:[],
        sum:0
      }
      componentDidMount()
      {
        const obj=getfromstorage('account');
          fetch('http://localhost:9000/mobile/getcart?email='+obj.email).then(res=>res.json())
          .then(json=>{
              console.log(json);
            this.setState({
              cart:json
            });
            
          });
      }
      delete=(event)=>{
          const index=event.target.parentNode.parentNode.getAttribute('i');
          console.log(index);
          const{
              cart
          }=this.state;
          const obj=getfromstorage('account');
        fetch('http://localhost:9000/mobile/cart/delete?mobilename='+cart[index].mobilename+'&email='+obj.email).then(res=>res.json())
        .then(json=>{
           if(json.success)
           {
            fetch('http://localhost:9000/mobile/getcart?email='+obj.email).then(res=>res.json())
            .then(json=>{
                console.log(json);
              this.setState({
                cart:json
              });
              
            });
           }
          
        });
      }
      add=(event)=>{
        const{
            cart
        }=this.state;
            const index=event.target.parentNode.parentNode.getAttribute('i');
            console.log(index);
            const obj=getfromstorage('account');
            fetch('http://localhost:9000/mobile/cart/add?mobilename='+cart[index].mobilename+'&quantity='+cart[index].quantity+'&email='+obj.email).then(res=>res.json())
            .then(json=>{
                if(json.success)
                {
                 fetch('http://localhost:9000/mobile/getcart?email='+obj.email).then(res=>res.json())
                 .then(json=>{
                     console.log(json);
                   this.setState({
                     cart:json
                   });
                   
                 });
                }
            });
      }
      sub=(event)=>{
        const{
            cart
        }=this.state;
            const index=event.target.parentNode.parentNode.getAttribute('i');
            console.log(index);
            const obj=getfromstorage('account');
            fetch('http://localhost:9000/mobile/cart/sub?mobilename='+cart[index].mobilename+'&quantity='+cart[index].quantity+'&email='+obj.email).then(res=>res.json())
            .then(json=>{
                if(json.success)
                {
                 fetch('http://localhost:9000/mobile/getcart?email='+obj.email).then(res=>res.json())
                 .then(json=>{
                     console.log(json);
                   this.setState({
                     cart:json
                   });
                   
                 });
                }
            });
      }
    render()
    {
        var{
            cart,
            sum
        }=this.state;
        return(
            <div className="container">
               <h2> Cart</h2><br />
               {
                  
          cart.map((cart, index)=>
          {
            const img="http://localhost:9000/"+cart.mobileimage;
           
            return <div  key={index} i={index} style={{border:'2px solid #e0e0d1',borderRadius:'25px',marginTop:'25px'}}>
        <div style={{width:'60px',float:'left',marginLeft:'40px' }}>
              <img src={img} style={{maxWidth:'100%',maxHeight:'100%',display:'block'}}/>
              </div>
              <div style={{float:'left',marginLeft:'150px',marginTop:'10px',width:'100px'}}>
              {cart.mobilename} 
              </div>
            <div style={{float:'left',marginLeft:'150px',marginTop:'10px',width:'100px'}}>
                {cart.quantity}{" "}
                <button className="btn btn-dark" onClick={this.add}>+</button>{" "}
                <button  className="btn btn-dark" onClick={this.sub}>-</button>
                </div>
           <div style={{marginLeft:'150px',marginTop:'10px',float:'left',width:'70px'}}>
                Rs.{cart.mobileprice*cart.quantity}
               </div>
               <div style={{float:'left',marginLeft:'150px',marginTop:'10px'}}>
               <button className="btn btn-dark" onClick={this.delete}>Delete</button>
               </div>
               <br /><br /><br />
            
            </div>

          })
          
        }
        {
            cart.map((cart,index)=>{
                sum=sum+cart.mobileprice*cart.quantity
            })
        }
        <div style={{marginLeft:'750px'}}>
            Cart Total: Rs.{sum}
            </div>
                </div>
        )
    }
}