import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,Row,Col,InputGroup,Input
} from 'reactstrap';

export default class Home extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    state={
      mobile:[],
      search:''
    }
    componentDidMount()
    {
        fetch('http://localhost:9000/mobile/getall').then(res=>res.json())
        .then(json=>{
            console.log(json);
          this.setState({
            mobile:json
          });
          
        });
    }
    addtocart=(event)=>
    {
      const{
        mobile
      }=this.state;
        const index=event.target.parentNode.parentNode.parentNode.parentNode.getAttribute('i');
        console.log(mobile[index]);
        const m=mobile[index];
        fetch('http://localhost:9000/mobile/addtocart', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({mobilename:m.mobilename,mobilespecs:m.mobilespecs,mobileprice:m.mobileprice,mobileimage:m.mobileimage,quantity:1})
        }).then(res=>res.json())
        .then(j=>{
          if(j.success){
            console.log(j); 
            alert(j.message);
          }
          else{
              alert(j.message);
          }
          });
         
      }

      search=(event)=>{
        console.log(event.target.value);
          this.setState({search:event.target.value});
      }
    
    render()
    {
      
      const{
        mobile,
        search
      }=this.state;

      let filter=mobile.filter((ff)=>{
          return ff.mobilename.toLowerCase().indexOf(search.toLowerCase())!=-1;
      });
      console.log(filter);
        return(
            <div>
                <h2>HOME</h2>
                <div>
                  <InputGroup>
                  <Input type="text" onChange={this.search} placeholder="search..." width="50%"/>
                  </InputGroup>
                </div>
                <div>
                {
          filter.map((mobile, index)=>
          {
            const img="http://localhost:9000/"+mobile.mobileimage;
            var present='';
            if(mobile.ispresent)
            {
              present='✓';
            }
            return <div   key={index} i={index}>
              <Col>
              <Card sm='6' style={{width:'300px',height:'380px',float:'left',marginLeft:'70px',marginTop:'30px'}}>
                <CardImg top width="50%" src={img} style={{height: 'auto',maxHeight: '250px',width: 'auto',maxWidth: '250px'}}/>
                <CardBody>
                <CardTitle>{mobile.mobilename}</CardTitle>
          <CardSubtitle>Rs.{mobile.mobileprice}</CardSubtitle>
          <CardText>{present}</CardText>
        
                <Button onClick={this.addtocart}>Add To Cart</Button>
                </CardBody>
                </Card>
                </Col>
            </div>
            
          })
        }
       </div>
        </div>
        )
      }
    }