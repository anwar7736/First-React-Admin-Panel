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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactHtmlParser from 'react-html-parser';

class ProjectPage extends Component {
	constructor(){
		super()
		this.state = {
			Data : [],
			isLoading : true,
			isError : false,
			deleteID : '',
			addNewModal : false,
			projectName:'',
            projectDes:'',
            projectFeatures:'',
            projectLink:'',
            photoOne:'',
            photoTwo:'',
            submitBtnText : 'Submit',
		}
	}
	componentDidMount(){
		Axios.get('http://127.0.0.1:8000/ProjectList')
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
	onNameChange=(event)=>{
            this.setState({projectName:event.target.value})
    }
    onDesChange=(event)=>{
        this.setState({projectDes:event.target.value})
    }
    onFeaturesChange=(content,delta,source,editor)=>
    {
    	let htmlContent = editor.getHTML();
    	this.setState({projectFeatures: htmlContent});
    }

    onLinkChange=(event)=>{
        this.setState({projectLink:event.target.value})
    }
    onPhotoOneChange=(event)=>{
        this.setState({photoOne:event.target.files[0]})
    }
    onPhotoTwoChange=(event)=>{
        this.setState({photoTwo:event.target.files[0]})
    }
     addFormSubmit=(event)=>{

        event.preventDefault();

        let projectName=this.state.projectName;
        let projectDes=this.state.projectDes;
        let projectFeatures=this.state.projectFeatures;
        let projectLink=this.state.projectLink;
        let photoOne=this.state.photoOne;
        let photoTwo=this.state.photoTwo;
        if(projectName=='')
		{
			cogoToast.warn('Project name field is required!');
		}
		else if(projectDes=='')
		{
			cogoToast.warn('Project description field is required!');
		}
		else if(projectFeatures=='')
		{
			cogoToast.warn('Project features field is required!');
		}
		else if(projectLink=='')
		{
			cogoToast.warn('Project link field is required!');
		}
		else if(photoOne=='')
		{
			cogoToast.warn('Project first photo field is required!');
		}
		else if(photoTwo=='')
		{
			cogoToast.warn('Project second photo field is required!');
		}
		else{
		this.setState({submitBtnText:'Submitting...'});
        let myFormData=new FormData();
        myFormData.append('projectName',projectName);
        myFormData.append('projectDes',projectDes);
        myFormData.append('projectFeatures',projectFeatures);
        myFormData.append('projectLink',projectLink);
        myFormData.append('photoOne',photoOne);
        myFormData.append('photoTwo',photoTwo);

        let url="/AddProject";
        let config={
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
                            this.setState({projectName:''})
                            this.setState({projectDes:''})
                            this.setState({projectFeatures:''});
                            this.setState({projectLink:''})
                            this.setState({photoOne:''})
                            this.setState({photoTwo:''})
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
		}
		else{
			if(confirm('Do you want to delete this data?')){
			Axios.post('http://127.0.0.1:8000/ProjectDelete', {id: this.state.deleteID})
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
	cellFormatter=(cell, rowIndex)=>{
		return ReactHtmlParser(cell);
	}
    render() {
    	
		const allData = this.state.Data;

		const columns = [
		 {dataField: 'img_one', text: 'Image',formatter:this.imgCellFormat},
         {dataField: 'id', text: 'ID'},
         {dataField: 'project_name', text: 'Project Name '},
         {dataField: 'short_description', text: 'Description', formatter:this.cellFormatter},
		];
		const selectRow = {
		  mode: 'radio',
		  onSelect:(row, isSelect, rowIndex)=>{ 
		  	this.setState({deleteID : row['id']})
		  }
		  
		};

        return (
            <Fragment>
                <SideBar title="Projects">
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
                <Modal  scrollable={true} size="lg" show={this.state.addNewModal} onHide={this.addNewModal}>
                        <Modal.Header closeButton onClick={this.modalClose}>
                            <h6>Add New Project</h6>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.addFormSubmit}>
                                <Form.Group >
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control onChange={this.onNameChange} type="text" placeholder="Project Name" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control  onChange={this.onDesChange} type="text" placeholder="Short Description" />
                                </Form.Group>

                                <Form.Group className="mb-5" >
                                    <Form.Label>Project Features</Form.Label>
                                    <ReactQuill  onChange={this.onFeaturesChange} className="h-50" theme="snow" />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Live Preview Link</Form.Label>
                                    <Form.Control onChange={this.onLinkChange} type="text" placeholder="Live Preview Link" />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Project Card Image</Form.Label>
                                    <Form.Control onChange={this.onPhotoOneChange} type="file" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Project Details Image</Form.Label>
                                    <Form.Control onChange={this.onPhotoTwoChange} type="file"  />
                                </Form.Group>

                                <Button variant="primary" type="submit">
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

export default ProjectPage;
