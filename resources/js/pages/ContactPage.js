import React, {Component, Fragment} from 'react';
import {Button} from 'react-bootstrap';
import SideBar from '../components/SideBar';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import swal from 'sweetalert';
import Axios from 'axios';


class ContactPage extends Component {
	constructor(){
		super()
		this.state = {
			contactData : [],
		}
	}
	componentDidMount(){
		Axios.get('http://127.0.0.1:8000/ContactList')
		.then(response=>{
			this.setState({contactData : response.data});
		})
		.catch(error=>{

		})
	}
	onClick=()=>{
		swal({
			  title: "Are you sure?",
			  text: "Do you want to remove this message!",
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
.then((willDelete) => {
  if (willDelete) {
    swal("Message has been deleted", {
      icon: "success",
    });
  }
});
	}
    render() {
		const allData = this.state.contactData;

		const columns = [{
		  dataField: 'id',
		  text: 'ID',
		  sort:true
		},  
		{
		  dataField: 'name',
		  text: 'Sender Name',
		  sort:true
		}, 
		{
		  dataField: 'email',
		  text: 'Sender Email Address'
		},
		{
		  dataField: 'message',
		  text: 'Message From Sender'
		}];
		const selectRow = {
		  mode: 'radio',
		  clickToSelect: false,
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

export default ContactPage;
