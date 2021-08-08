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
            selectedID : '',
			addNewModal : false,
			projectName:'',
            projectDes:'',
            projectFeatures:'',
            projectLink:'',
            photoOne:'',
            photoTwo:'',            
            headerTitle : '',
            submitBtnText : '',
            isDisabled : true,
		}
	}
	componentDidMount(){
		Axios.get('/ProjectList')
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
            projectName : '',
            projectDes : '',
            projectFeatures : '',
            projectLink : '',
            long_des : '',
            photoOne : '',
            photoTwo : '',
        });
    }


    modalOpen=(action)=>{
        if(action==='Insert')
        {
            this.resetForm();
            this.setState({submitBtnText: 'Submit', headerTitle : 'Add New Project'});
        }

        else if(action==='Update')
        {
            Axios.get('/GetProjectById/'+this.state.selectedID)
            .then(response=>{
                if(response.status==200)
                {
                    this.setState({
                        projectName : response.data[0]['project_name'],
                        projectDes : response.data[0]['short_description'],
                        projectFeatures : response.data[0]['project_features'],
                        projectLink : response.data[0]['live_preview'],
                        long_des : response.data[0]['img_one'],
                        photoOne : response.data[0]['img_two']
                    });
                }

                else
                {

                }
            })
            .catch(error=>{

            })

            this.setState({submitBtnText: 'Update', headerTitle : 'Edit Current Project'}); 
	}
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
    SubmitForm=(event)=>{
        event.preventDefault();
        let action = this.state.submitBtnText;
        let ProjectId = this.state.selectedID;
        let projectName=this.state.projectName;
        let projectDes=this.state.projectDes;
        let projectFeatures=this.state.projectFeatures;
        let projectLink=this.state.projectLink;
        let photoOne=this.state.photoOne;
        let photoTwo=this.state.photoTwo;

        if(action==='Submit')
        {
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
    { if(projectName=='')
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

    else{
    this.setState({submitBtnText:'Updating...'});
    let myFormData=new FormData();
    myFormData.append('id',ProjectId);
    myFormData.append('project_name',projectName);
    myFormData.append('short_description',projectDes);
    myFormData.append('project_features',projectFeatures);
    myFormData.append('live_preview',projectLink);
    myFormData.append('img_one',photoOne);
    myFormData.append('img_two',photoTwo);

    let url="/api/onEditProject";
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
			Axios.post('/ProjectDelete', {id: this.state.selectedID})
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
	cellFormatter=(cell, rowIndex)=>{
		return ReactHtmlParser(cell);
	}
    render() {
    	if(this.state.isLoading==true && this.state.isError==false)
        {
            return (
                    <SideBar title="Projects">   
                        <Container>
                            <Loading/>
                        </Container>
                    </SideBar>
                )
        }
        else if(this.state.isError==true && this.state.isLoading==false)
        {
              return (
                    <SideBar title="Projects">   
                        <Container>
                            <Error/>
                        </Container>
                    </SideBar>
                )
        }
        else{
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
		  	this.setState({selectedID : row['id'], isDisabled: false})
		  }
		  
		};

        return (
            <Fragment>
                <SideBar title="Projects">
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
                <Modal scrollable={true} show={this.state.addNewModal} onHide={this.addNewModal}>
                        <Modal.Header>
                            <h6>{this.state.headerTitle}</h6>
                            <a style={{textDecoration:'none', cursor:'pointer'}} title="Close" className="btn-lg" onClick={this.modalClose}>&times;</a>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.SubmitForm}>
                                <Form.Group >
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control value={this.state.projectName} onChange={this.onNameChange} type="text" placeholder="Project Name" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control  value={this.state.projectDes} onChange={this.onDesChange} type="text" placeholder="Short Description" />
                                </Form.Group>

                                <Form.Group className="mb-5" >
                                    <Form.Label>Project Features</Form.Label>
                                    <ReactQuill  value={this.state.projectFeatures} onChange={this.onFeaturesChange} className="h-50" theme="snow" />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Live Preview Link</Form.Label>
                                    <Form.Control value={this.state.live_preview} onChange={this.onLinkChange} type="text" placeholder="Live Preview Link" />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Project Card Image</Form.Label>
                                    <Form.Control onChange={this.onPhotoOneChange} type="file" />
                                    <img className="mt-3" src={this.state.img_one} width="100" height="100"/>
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Project Details Image</Form.Label>
                                    <Form.Control onChange={this.onPhotoTwoChange} type="file"  />
                                    <img className="mt-3" src={this.state.img_two} width="100" height="100"/>
                                </Form.Group>

                                <Button className="btn-block" variant="info" type="submit">
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

export default ProjectPage;
