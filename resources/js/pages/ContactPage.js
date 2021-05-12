import React, {Component, Fragment} from 'react';
import Loading from '../components/loadingDiv';
import Error from '../components/wentWrong';
import {Button} from 'react-bootstrap';
import SideBar from '../components/SideBar';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';


class ContactPage extends Component {
	constructor(){
		super()
		this.state = {
			contactData : [],
			isLoading : true,
			isError : false,
			deleteID : '',
		}
	}
	componentDidMount(){
		Axios.get('http://127.0.0.1:8000/ContactList')
		.then(response=>{
			this.setState({isLoading:false, isError:false, contactData : response.data});
		})
		.catch(error=>{
			this.setState({isLoading:false, isError:true});
		})
	}
	onClick=()=>{
		if(this.state.deleteID===''){
			swal({
			  title: "Please select any row",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
		}else{
		swal({
		  title: "Are you sure?",
		  text: "Do you want to delete this message?",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
			Axios.post('http://127.0.0.1:8000/ContactDelete', {id: this.state.deleteID})
			.then(response=>{
					this.componentDidMount();
					this.setState({deleteID:''})
			})
			.catch(error=>{
				
			})
		  if (willDelete) {
		    swal("Poof! Your imaginary file has been deleted!", {
		      icon: "success",
		    });
		  } 
		});

}

	}
    render() {
    	if(this.state.isLoading==true && this.state.isError==false)
    	{
    		return <Loading/>
    	}
    	else if(this.state.isError==true && this.state.isLoading==false)
    	{
    		return <Error/>
    	}
    	else{
		const allData = this.state.contactData;

		const columns = [
		{dataField: 'id',text: 'ID',sort:true},  
		{dataField: 'name',text: 'Sender Name',sort:true}, 
		{dataField: 'email',text: 'Sender Email Address'},
		{dataField: 'message',text: 'Message From Sender'}
		];
		const selectRow = {
		  mode: 'radio',
		  onSelect:(row, isSelect, rowIndex)=>{ 
		  	this.setState({deleteID : row['id']})
		  }
		  
		};

        return (
            <Fragment>
                <SideBar title="Contact">
                	<Button onClick={this.onClick} variant="danger" className="btn-sm mb-2">Delete</Button>
                	<BootstrapTable 
                		keyField='id' 
                		data={ allData } 
                		columns={ columns } 
                		pagination={ paginationFactory() } 
                		selectRow={ selectRow }

                	/>
                </SideBar>
            </Fragment>
        );
     }
    }
}

export default ContactPage;
