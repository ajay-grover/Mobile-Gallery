import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input,Badge } from 'reactstrap';

export default class Addproductpage extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    state={
        mobilename:'',
        mobilespecs:'',
        mobileprice:0,
        mobileimage:'',
        uploadstatus:false,
        uploadmsg:'',
        url:''
    }
    namechange=(event)=>
    {
        const mn=event.target.value;
        this.setState({
            mobilename:mn
        });
    }
    specschange=(event)=>
    {
        const sc=event.target.value;
        this.setState({
            mobilespecs:sc
        });
    }
    pricechange=(event)=>
    {
        const pc=event.target.value;
        this.setState({
                mobileprice:pc
        });
    }
    filechange=(event)=>
    {
        console.log(event.target.files[0]);
        this.setState({
            mobileimage:event.target.files[0],
            url: URL.createObjectURL(event.target.files[0])
        });
        
    }
    submitdata=()=>
    {
        const{
            mobilename,
            mobilespecs,
            mobileprice,
            mobileimage,
        }=this.state;
        const formData = new FormData();
        formData.append("mobilename", mobilename);
        formData.append("mobilespecs", mobilespecs);
        formData.append("mobileprice", mobileprice);
        formData.append("mobileimage", mobileimage);
        fetch('http://localhost:9000/mobile/upload', {
            method: 'POST',
            body:formData
          }).then(res=>res.json())
          .then(j=>{
            if(j.success){
                alert("Mobile Phone uploaded");
              console.log(j); 
              this.setState({
                uploadstatus:j.success,
                uploadmsg:j.message
                
              });
            }
            else
            {
                alert(j.message);
            }
    });
}
    render()
    {
        const {
            mobilename,
            mobilespecs,
            mobileprice,
            url
        }=this.state;
        return(
            <div style={{backgroundImage: 'linear-gradient(to right, rgba(39,50,94,100), rgba(39,50,94,100))'}}>
            <div class="container" style={{backgroundColor:'white',width:'50%',borderRadius:'100px'}}>
                <center>
               <h2> <Badge color="dark">Upload Mobile Phone</Badge></h2><br />
                  
                    <label>Mobile Phone Name:</label><br />
                    <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>==></InputGroupText>
        </InputGroupAddon>
                    <Input type="text" value={mobilename} onChange={this.namechange} /><br /><br />
                    </InputGroup>
                    <label>Specifications:</label><br />
                    <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Specs:</InputGroupText>
        </InputGroupAddon>
        <textarea  value={mobilespecs} onChange={this.specschange} style={{width:"85%"}} /><br /><br />
                    </InputGroup>
                   
                    <label>Price:</label><br />
                    <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Rs.</InputGroupText>
        </InputGroupAddon>
        <Input type="number" value={mobileprice} onChange={this.pricechange} /><br /><br />
                    </InputGroup>
                   
                    <label>Mobile Phone Image:</label><br />
               
       
        <Input type="file" onChange={this.filechange} multiple="multiple" />
                   
                   
                    <div>
                        <img style={{width:'300px' ,height:'240px',}} src={url} />
                        </div><br /><br />
                    <button onClick={this.submitdata} className="btn btn-dark">Submit</button>
                    </center>
                </div>
                </div>
        );
    }
  
}