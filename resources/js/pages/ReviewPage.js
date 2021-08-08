import React, {Component, Fragment} from 'react';
import Loading from '../components/loadingDiv';
import Error from '../components/wentWrong';
import {Button, Modal, Form, Container} from 'react-bootstrap';
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
            selectedID : '',
			addNewModal : false,
			title:'',
            desc:'',
            photo:'',
			headerTitle : '',
            submitBtnText : '',
			isDisabled : true,
		}
	}
	componentDidMount(){
		Axios.get('/ReviewList')
		.then(response=>{
           if(response.status==200){
                 this.setState({Data : response.data, isLoading:false});
            }
            else{
                this.setState({isLoading:false,isError:true})
            }
        })
        .catch(error=>{
            this.setState({isLoading:false, isError:true});
        })
	}
	resetForm=()=>{
        this.setState({
            title : '',
			desc : '',
			photo : ''
		});
    }
	modalOpen=(action)=>{ 
		if(action==='Insert')
		{
			this.resetForm();
			this.setState({submitBtnText: 'Submit', headerTitle : 'Add New Client Review'});
		}

		else if(action==='Update'){
		Axios.get('/GetReviewById/'+this.state.selectedID)
		.then(response=>{
			if(response.status==200)
			{
				this.setState({
					title : response.data[0]['client_title'],
					desc : response.data[0]['client_description'],
					photo : response.data[0]['client_img'],
				});
			}

			else
			{

			}
		})
		.catch(error=>{

		})

		this.setState({submitBtnText: 'Update', headerTitle : 'Edit Client Review'}); 

		}

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
	SubmitForm=(e)=>{
		e.preventDefault();
		let action = this.state.submitBtnText;
		let ReviewId = this.state.selectedID;
		let title = this.state.title;
		let desc = this.state.desc;
		let photo = this.state.photo;
		if(action==='Submit')
		{
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
				Axios.post(url,myFormData)
				.then(response=>{
					if(response.status==200)
					{
						this.setState({submitBtnText:'Submitted'});
						if(response.data==1)
						{
							setTimeout(()=>{
								this.setState({submitBtnText:'Submit'});
								this.resetForm();
								this.modalClose();
								this.componentDidMount();
								cogoToast.success('Data has been added');

							},1000);

						} 
						else if(response.data!=1 && response.data!=0){
							toast.warn(response.data, {
							position: "top-right",
							autoClose: 3000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: false,
							draggable: true,
							progress: 0,
						});
					}

						
					}
				})
				.catch(error=>{
					this.setState({submitBtnText:'Error'});
					cogoToast.error('Something went wrong!');
				})
			}
			}

		else if(action==='Update')
		{
			if(title=='')
			{
				cogoToast.warn('Review title field is required!');
			}
			else if(desc=='')
			{
				cogoToast.warn('Review description field is required!');
			}
			else{
				this.setState({submitBtnText:'Updating...'});
				let url = "/api/onEditReview";
				let myFormData = new FormData();
				myFormData.append('id', ReviewId);
				myFormData.append('client_title', title);
				myFormData.append('client_description', desc);
				myFormData.append('client_img', photo);
				Axios.post(url,myFormData)
				.then(response=>{
					if(response.status==200)
					{
						this.setState({submitBtnText:'Updated'});
						if(response.data==1)
						{
							setTimeout(()=>{
								this.setState({submitBtnText:'Update'});
								this.resetForm();
								this.modalClose();
								this.componentDidMount();
								cogoToast.success('Data has been updated');
	
							},1000);
	
						} 
						else if(response.data==0)
						{
								setTimeout(()=>{
								this.setState({submitBtnText:'Update'});
								cogoToast.info('Data is nothing to updated');
		
							},1000);

						}
						else if(response.data!=1 && response.data!=0){
							this.setState({submitBtnText:'Update'});
							toast.warn(response.data, {
							   position: "top-right",
							   autoClose: 3000,
							   hideProgressBar: false,
							   closeOnClick: true,
							   pauseOnHover: false,
							   draggable: true,
							   progress: 0,
						   });
					   }
	
						
					}
				})
				.catch(error=>{
					this.setState({submitBtnText:'Error'});
					cogoToast.error('Something went wrong!');
				})
			}

		}

		
	}

	onClick=()=>{
		if(this.state.selectedID!==null){
			if(confirm('Do you want to delete this data?')){
			Axios.post('/ReviewDelete', {id: this.state.selectedID})
			.then(response=>{
					cogoToast.success('Data has been deleted');
					this.componentDidMount();
					this.setState({selectedID:''})
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
    	if(this.state.isLoading==true && this.state.isError==false)
        {
            return (
                    <SideBar title="Client Review">   
                        <Container>
                            <Loading/>
                        </Container>
                    </SideBar>
                )
        }
        else if(this.state.isError==true && this.state.isLoading==false)
        {
              return (
                    <SideBar title="Client Review">   
                        <Container>
                            <Error/>
                        </Container>
                    </SideBar>
                )
        }
        else{
		const allData = this.state.Data;

		const columns = [
		 {dataField: 'id', text: 'ID'},
         {dataField: 'client_title', text: 'Client Name'},
         {dataField: 'client_description', text: 'Description'},
		];
		const selectRow = {
		  mode: 'radio',
		  onSelect:(row, isSelect, rowIndex)=>{ 
		  	this.setState({selectedID : row['id'], isDisabled : false});
		  }
		  
		};

        return (
            <Fragment>
                <SideBar title="Client Review">
					<Button onClick={this.modalOpen.bind(this, 'Insert')} variant="success" className="btn-sm mr-2">Add</Button>
                	<Button onClick={this.modalOpen.bind(this, 'Update')} variant="info" className="btn-sm ml-2" disabled={this.state.isDisabled}>Edit</Button>
                	<Button onClick={this.onClick} variant="danger" className="btn-sm ml-2" disabled={this.state.isDisabled}>Delete</Button><br/><br/>
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
                            <h6>{this.state.headerTitle}</h6>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.SubmitForm}>
                                <Form.Group >
                                    <Form.Label>Review Title</Form.Label>
                                    <Form.Control value={this.state.title} onChange={this.titleOnChange} type="text" placeholder="Review" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Review Description</Form.Label>
                                    <Form.Control value={this.state.desc} onChange={this.desOnChange} type="text" placeholder="Review Description" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Client Photo</Form.Label>
                                    <Form.Control onChange={this.fileOnChange} type="file"/>
									<img className="mt-3" src={this.state.photo} width="100" height="100"/>
                                </Form.Group>
                                <Button className="btn-block" variant="success" type="submit">
                                    {this.state.submitBtnText}
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" size="sm" onClick={this.modalClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
            </Fragment>
        );
    	}
     }
    
}

export default ReviewPage;
