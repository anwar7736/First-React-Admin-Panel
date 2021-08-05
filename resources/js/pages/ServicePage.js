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

class ServicePage extends Component {
	constructor(){
		super()
		this.state = {
			Data : [],
			isLoading : true,
			isError : false,
			deleteID : '',
			addNewModal : false,
			name:'',
            desc:'',
            photo:'',
            submitBtnText : 'Submit',
		}
	}
	componentDidMount(){
		Axios.get('/ServiceList')
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
	modalOpen=()=>{
		this.setState({addNewModal: true});
	}
	modalClose=()=>{
		this.setState({addNewModal: false});
	}
	titleOnChange=(e)=>{
		this.setState({name: e.target.value});

	}
	desOnChange=(e)=>{
		this.setState({desc: e.target.value});
	}
	fileOnChange=(e)=>{
		this.setState({photo: e.target.files[0]});
	}
	addFormSubmit=(e)=>{
		e.preventDefault();
		let name = this.state.name;
		let desc = this.state.desc;
		let photo = this.state.photo;
		if(name=='')
		{
			cogoToast.warn('Service name field is required!');
		}
		else if(desc=='')
		{
			cogoToast.warn('Service description field is required!');
		}
		else if(photo=='')
		{
			cogoToast.warn('Service photo field is required!');
		}
		else{
			this.setState({submitBtnText:'Submitting...'});
			let url = '/AddService';
			let myFormData = new FormData();
			myFormData.append('name', name);
			myFormData.append('desc', desc);
			myFormData.append('photo', photo);
			let config={
            headers:{'Content-Type':'multipart/form-data'}
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
							this.setState({name:''});
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
			Axios.post('/ServiceDelete', {id: this.state.deleteID})
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
    	if(this.state.isLoading==true && this.state.isError==false)
        {
            return (
                    <SideBar title="Services">   
                        <Container>
                            <Loading/>
                        </Container>
                    </SideBar>
                )
        }
        else if(this.state.isError==true && this.state.isLoading==false)
        {
              return (
                    <SideBar title="Services">   
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
         {dataField: 'service_logo', text: 'Image',formatter:this.imgCellFormat},
         {dataField: 'service_name', text: 'Service Name'},
         {dataField: 'service_description', text: 'Service Description'}
		];
		const selectRow = {
		  mode: 'radio',
		  onSelect:(row, isSelect, rowIndex)=>{ 
		  	this.setState({deleteID : row['id']})
		  }
		  
		};

        return (
            <Fragment>
                <SideBar title="Services">
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
                <Modal show={this.state.addNewModal} onHide={this.modalClose}>
                        <Modal.Header closeButton>
                            <h6>Add New Service</h6>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.addFormSubmit}>
                                <Form.Group >
                                    <Form.Label>Service Name</Form.Label>
                                    <Form.Control onChange={this.titleOnChange} type="text" placeholder="Service Name" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Service Description</Form.Label>
                                    <Form.Control onChange={this.desOnChange} type="text" placeholder="Service Description" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Service Image</Form.Label>
                                    <Form.Control onChange={this.fileOnChange} type="file" placeholder="Service Image" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
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

export default ServicePage;
