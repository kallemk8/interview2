import React, {Component} from 'react';

import axios from 'axios';

import DataTable from 'datatables.net'
import $ from 'jquery';
import _ from 'lodash'
$.DataTable = DataTable
class App extends Component {
  state = {
    products:[],
    seletedproducts:[],
    pages:0,
    page :[],
    currentpage:0
  }
  
  componentDidMount(){
      axios.get('http://ec2-52-66-204-184.ap-south-1.compute.amazonaws.com:8080/v1.0/admin/catalog/products').then(response => {
          if(response.data){
              //console.log(response.data.data);
              this.setState({products:response.data.data});
              this.setState({seletedproducts:response.data.data.slice(0,10)});

              var convertpages = response.data.data.length / 10;
              var convertpagesd = Math.round(convertpages);
              this.setState({pages:convertpagesd});
              //console.log(this.state);
              var newarray = [];
              for (let i=0; i<convertpagesd; i++){
                newarray.push(i); 
              }
              this.setState({page:newarray});
              $("#id").DataTable();
          }
      }).catch(error => {
         console.log(error)
      });
      
  }
  pagesloadingmatch(data){
    var pagein = data.currentpage+1;
    console.log(pagein);
    this.setState({currentpage:pagein});
    
    var current = pagein*10;
    var totalval = current+10;
    this.setState({seletedproducts:this.state.products.slice(0,totalval)});
    console.log(this.state);
  }
  pagesloadingmatch2(data, p){
    var current = p*10;
    var totalval = current+10;
    this.setState({currentpage:p});
    this.setState({seletedproducts:this.state.products.slice(0,totalval)});
  }
  pricerangefilter(value){
    var sdf = parseInt(value);
    console.log(sdf);
    var array = [];
    this.state.products.map((pro,i)=>{
      if(pro.price<sdf){
        array.push(pro);
        console.log("99");
      }
      if(pro.price<sdf && pro.price>99){
        array.push(pro);
        console.log("199");
      }
      if(pro.price<sdf  && pro.price>199){ 
        array.push(pro);
        console.log("399");
      }
      if(pro.price<sdf  && pro.price>399){
        array.push(pro);
        console.log("nter");
      }
    });
    console.log(array);
    this.setState({seletedproducts:array});
  }
  render() {
  return (
    <div className="container">
      <div className="row">

        <div className="col-md-12">
          <div className="advancesearch">
            Advance Search
          </div>
          <select className="from-control" onChange={(e)=>this.pricerangefilter(e.target.value)}>
            <option value="99">1 - 99</option>
            <option value="199">100 - 199</option>
            <option value="399">200 - 399</option>
            <option value="399">400 - Above</option>
          </select>
        </div>
        <div className="col-md-12">
          <table className="table" id="id">
          <thead>
          <tr>
              <td>Name</td>
              <td>description</td>
              <td>product_code</td>
              <td>quantity</td>
              <td>price</td>
              <td>chef_price</td>
            </tr>
          </thead>
          <tbody>
          {this.state.seletedproducts.map((product, i)=>{
            return (
              
              <tr key={i}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.product_code}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.chef_price}</td>
              </tr>
            )
          })

          }
          
          </tbody>            
          </table>
          <div className="">
          <h2>Load with pagination </h2>
          <ul class="pagination">
          {this.state.page.map((p, i)=>{
            return (
            <li class="page-item"><button class="page-link" onClick={(e)=>this.pagesloadingmatch2(this.state, p)}>{p}</button></li>
          )
          })
          }
          </ul>
          </div>
          <div className="">
          <h2>Click event with Load Data</h2>
          <button className="btn btn-primary btn-block" onClick={(e)=>this.pagesloadingmatch(this.state)}>Load More</button>
          </div>
         
          
        </div>
      </div>
    </div>
  );
}
}

export default App;
