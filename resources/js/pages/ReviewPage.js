import React, {Component, Fragment} from 'react';
import Loading from '../components/loadingDiv';
import Error from '../components/wentWrong';
import {Button, Modal, Form} from 'react-bootstrap';
import SideBar from '../components/SideBar';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import cogoToast from 'cogo-toast';

class ReviewPage extends Component {
	constructor(){
		super()
		this.state = {
			Data : [],
			isLoading : true,
			isError : false,
			deleteID : '',
			addNewModal : false,
			title:'',
            desc:'',
            photo:'',
            submitBtnText : 'Submit',
		}
	}
	componentDidMount(){
		Axios.get('http://127.0.0.1:8000/ReviewList')
		.then(response=>{
			this.setState({Data : response.data});
		})
		.catch(error=>{
			
		})
	}
	modalOpen=()=>{
		this.setState({addNewModal: true});
	}
	modalClose=()=>{
		this.setState({addNewModal: false});
	}
	titleOnChange=(e)=>{
		this.setState({title: e.target.value});

	}
	desOnChange=(e)=>{
		this.setState({desc: e.target.value});
	}
	fileOnChange=(e)=>{
		this.setState({photo: e.target.files[0]});
	}
	addFormSubmit=(e)=>{
		e.preventDefault();
		let title = this.state.title;
		let desc = this.state.desc;
		let photo = this.state.photo;
		if(title=='')
		{
			cogoToast.warn('Review title field is required!');
		}
		else if(desc=='')
		{
			cogoToast.warn('Review description field is required!');
		}
		else if(photo=='')
		{
			cogoToast.warn('Review photo field is required!');
		}
		else{
			this.setState({submitBtnText:'Submitting...'});
			let url = "/AddReview";
			let myFormData = new FormData();
			myFormData.append('title', title);
			myFormData.append('desc', desc);
			myFormData.append('photo', photo);
			let config = {
           		 headers:{ 'content-type':'multipart/form-data'}
       		 	}
			Axios.post(url,myFormData,config)
			.then(response=>{
				if(response.status==200)
				{
					this.setState({submitBtnText:'Submitted'});
					if(response.data==1)
					{
						setTimeout(()=>{
							this.setState({submitBtnText:'Submit'});
							this.setState({title:''});
							this.setState({desc:''});
							this.setState({photo:''});
							this.modalClose();
							this.componentDidMount();
							cogoToast.success('Data has been added');

						},1000);

					}
				}
			})
			.catch(error=>{
				this.setState({submitBtnText:'Error'});
				alert(error);
			})
		}
	}


	onClick=()=>{
		if(this.state.deleteID===''){
			cogoToast.warn('Please select any row!');
		}else{
			if(confirm('Do you want to delete this data?')){
			Axios.post('http://127.0.0.1:8000/ReviewDelete', {id: this.state.deleteID})
			.then(response=>{
					cogoToast.success('Data has been deleted');
					this.componentDidMount();
					this.setState({deleteID:''})
			})
			.catch(error=>{
				cogoToast.error('Something went wrong!');
			})
	}
	}

	}
	imgCellFormat=(cell, rowIndex)=>{
		return <img className="table-cell-img" src={cell}/>
	}
    render() {
    	
		const allData = this.state.Data;

		const columns = [
		 {dataField: 'id', text: 'ID'},
         {dataField: 'client_title', text: 'Client Name'},
         {dataField: 'client_description', text: 'Description'},
		];
		const selectRow = {
		  mode: 'radio',
		  onSelect:(row, isSelect, rowIndex)=>{ 
		  	this.setState({deleteID : row['id']})
		  }
		  
		};

        return (
            <Fragment>
                <SideBar title="Client Review">
                	<Button onClick={this.modalOpen} variant="success" className="btn-sm">Add New</Button>
                	<Button onClick={this.onClick} variant="danger" className="btn-sm m-2">Delete</Button>
                	<BootstrapTable 
                		keyField='id' 
                		data={ allData } 
                		columns={ columns } 
                		pagination={ paginationFactory() } 
                		selectRow={ selectRow }

                	/>
                </SideBar>
                 <Modal show={this.state.addNewModal} onHide={this.addNewModal}>
                        <Modal.Header closeButton onClick={this.modalClose} title="Close">
                            <h6>Add New Review</h6>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.addFormSubmit}>
                                <Form.Group >
                                    <Form.Label>Review Title</Form.Label>
                                    <Form.Control onChange={this.titleOnChange} type="text" placeholder="Review" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Review Description</Form.Label>
                                    <Form.Control onChange={this.desOnChange} type="text" placeholder="Review Description" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Client Photo</Form.Label>
                                    <Form.Control onChange={this.fileOnChange} type="file"/>
                                </Form.Group>
                                <Button variant="info" type="submit">
                                    {this.state.submitBtnText}
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.modalClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
            </Fragment>
        );
     }
    
}

export default ReviewPage;
