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
import Axios from 'axios';
import cogoToast from 'cogo-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactHtmlParser from 'react-html-parser';

class CoursePage extends Component {
	constructor(){
		super()
		this.state = {
			Data : [],
			isLoading : true,
			isError : false,
			selectedID : '',
			addNewModal : false,
			short_title:'',
            short_des :'',
            small_img :'',
            long_title :'',
            long_des :'',
            total_lecture :'',
            total_student :'',
            skill_all :'',
            video_url  :'',
            courses_link  :'',
            headerTitle : '',
            submitBtnText : '',
            isDisabled : true,
            
		}
	}
	componentDidMount(){
		Axios.get('/CourseList')
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
            short_title : '',
            short_des : '',
            small_img : '',
            long_title : '',
            long_des : '',
            total_lecture : '',
            total_student : '',
            skill_all : '',
            video_url : '',
            courses_link : ''
        });
    }
	modalOpen=(action)=>{
        if(action==='Insert')
        {
            this.resetForm();
            this.setState({submitBtnText: 'Submit', headerTitle : 'Add New Course'});
        }
        else if(action==='Update')
        {
            Axios.get('/GetCourseById/'+this.state.selectedID)
            .then(response=>{
                if(response.status==200)
                {
                    this.setState({
                        short_title :  response.data[0]['short_title'],
                        short_des :  response.data[0]['short_des'],
                        small_img :  response.data[0]['small_img'],
                        long_title :  response.data[0]['long_title'],
                        long_des :  response.data[0]['long_des'],
                        total_lecture :  response.data[0]['total_lecture'],
                        total_student :  response.data[0]['total_student'],
                        skill_all :  response.data[0]['skill_all'],
                        video_url :  response.data[0]['video_url'],
                        courses_link :  response.data[0]['courses_link']
                    });
                }

                else
                {

                }
            })
            .catch(error=>{

            })
            this.setState({submitBtnText: 'Update', headerTitle : 'Edit Current Course'});
        }

		this.setState({addNewModal: true});
	}
	modalClose=()=>{
		this.setState({addNewModal: false});
	}
	onShortTitleChange=(event)=>{
            this.setState({short_title:event.target.value})
    }
    onShortDesChange=(event)=>
    {
        this.setState({short_des:event.target.value})
    }
    onLongTitleChange=()=>{
    	this.setState({long_title: event.target.value});
   }
    onLongDesChange=(event)=>
    {
    	this.setState({long_des: event.target.value});
    }
    onSkillAllChange=(content,delta,source,editor)=>
    {
    	let htmlContent= editor.getHTML();
    	this.setState({skill_all: htmlContent});
    }

    onCourseLinkChange=(event)=>{
        this.setState({courses_link:event.target.value})
    }
    onVideoURLChange=(event)=>{
        this.setState({video_url:event.target.value})
    }
    onPhotoOneChange=(event)=>{
        this.setState({small_img:event.target.files[0]})
    }
    SubmitForm=(event)=>{
        event.preventDefault();
        let action = this.state.submitBtnText;
        let CourseId = this.state.selectedID;
        let short_title=this.state.short_title;
        let short_des=this.state.short_des;
        let long_title=this.state.long_title;
        let long_des=this.state.long_des;
        let total_lecture=this.state.total_lecture;
        let total_student=this.state.total_student;
        let small_img=this.state.small_img;
        let skill_all=this.state.skill_all;
        let courses_link=this.state.courses_link;
        let video_url=this.state.video_url;

        if(action==='Submit')
        {
        if(short_title=='')
		{
			toast.error('Short title field is required!');
		}
		else if(short_des=='')
		{
			toast.error('Short description field is required!');
		}
		else if(long_title=='')
		{
			toast.error('Long title field is required!');
		}
		else if(long_des=='')
		{
			toast.error('Long description field is required!');
		}
		else if(small_img=='')
		{
			toast.error('Small image field is required!');
		}
		else if(skill_all=='')
		{
			toast.error('Skill all field is required!');
		}
		else if(video_url=='')
		{
			toast.error('Video URL field is required!');
		}
		else if(courses_link=='')
		{
			toast.error('Courses link field is required!');
		}
		else{
		this.setState({submitBtnText:'Submitting...'});
        let myFormData=new FormData();
        myFormData.append('short_title',short_title);
        myFormData.append('short_des',short_des);
        myFormData.append('long_title',long_title);
        myFormData.append('long_des',long_des);
        myFormData.append('total_lecture',total_lecture);
        myFormData.append('total_student',total_student);
        myFormData.append('small_img',small_img);
        myFormData.append('skill_all',skill_all);
        myFormData.append('courses_link',courses_link);
        myFormData.append('video_url',video_url);

        let url="/AddCourse";
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
                            toast.success('Data has been added', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: 0,
                        });
							this.componentDidMount();
						},1000);

					}
                    else{
                         toast.warn('Data has not been added', {
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
				 toast.error('Something went wrong!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: 0,
                        });
			})
    }
        }
        else if(action==='Update')
        {
        if(short_title=='')
		{
			toast.error('Short title field is required!');
		}
		else if(short_des=='')
		{
			toast.error('Short description field is required!');
		}
		else if(long_title=='')
		{
			toast.error('Long title field is required!');
		}
		else if(long_des=='')
		{
			toast.error('Long description field is required!');
		}
		else if(skill_all=='')
		{
			toast.error('Skill all field is required!');
		}
		else if(video_url=='')
		{
			toast.error('Video URL field is required!');
		}
		else if(courses_link=='')
		{
			toast.error('Courses link field is required!');
		}
		else{
		this.setState({submitBtnText:'Updating...'});
        let myFormData=new FormData();
        myFormData.append('id',CourseId);
        myFormData.append('short_title',short_title);
        myFormData.append('short_des',short_des);
        myFormData.append('long_title',long_title);
        myFormData.append('long_des',long_des);
        myFormData.append('total_lecture',total_lecture);
        myFormData.append('total_student',total_student);
        myFormData.append('small_img',small_img);
        myFormData.append('skill_all',skill_all);
        myFormData.append('courses_link',courses_link);
        myFormData.append('video_url',video_url);

        let url="/api/onEditCourse";
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
                            toast.success('Data has been updated', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: 0,
                        });
							this.componentDidMount();
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
				 toast.error('Something went wrong!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: 0,
                        });
			})
    }
        }
    }
	onClick=()=>{
		if(this.state.selectedID!==null){
			if(confirm('Do you want to delete this data?')){
			Axios.post('/CourseDelete', {id: this.state.selectedID})
			.then(response=>{
                    if(response.status==200 & response.data==1)
                    {
                        toast.success('Delete has been deleted', {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: 0,
                    });
                        this.componentDidMount();
                        this.setState({selectedID:''})
                    }
                    else{
                        toast.error('Delete Failed', {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: 0,
                    });
                    }
                    
            })
            .catch(error=>{
                        toast.error('Something went wrong!', {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: 0,
                    });
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
                    <SideBar title="Courses">   
                        <Container>
                            <Loading/>
                        </Container>
                    </SideBar>
                )
        }
        else if(this.state.isError==true && this.state.isLoading==false)
        {
              return (
                    <SideBar title="Courses">   
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
        {dataField: 'small_img', text: 'Image',formatter:this.imgCellFormat},
        {dataField: 'short_title', text: 'Title'},
        {dataField: 'short_des', text: 'Description'},
        {dataField: 'total_lecture', text: 'Lecture'},
        {dataField: 'total_student', text: 'Student'},
		];
		const selectRow = {
		  mode: 'radio',
		  onSelect:(row, isSelect, rowIndex)=>{ 
		  	this.setState({selectedID : row['id'], isDisabled: false})
		  }
		  
		};

        return (
            <Fragment>
                <SideBar title="Courses">
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
                <Modal scrollable={true} show={this.state.addNewModal} onHide={this.state.addNewModal}>
                        <Modal.Header closeButton onClick={this.modalClose}>
                            <h5>{this.state.headerTitle}</h5>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.SubmitForm}>
                                <Form.Group >
                                    <Form.Label>Short Title</Form.Label>
                                    <Form.Control value={this.state.short_title} onChange={this.onShortTitleChange} type="text" placeholder="Short Title" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control  value={this.state.short_des} onChange={this.onShortDesChange} type="text" placeholder="Short Description" />
                                </Form.Group>

                                <Form.Group className="mb-5" >
                                    <Form.Label>Long Title</Form.Label>
                                    <Form.Control value={this.state.long_title} onChange={this.onLongTitleChange} type="text"  placeholder="Long Title" />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Long Description</Form.Label>
                                    <Form.Control value={this.state.long_des} onChange={this.onLongDesChange} type="text" placeholder="Long Description" />
                                </Form.Group> 
                                
                                <Form.Group >
                                    <Form.Label>Total Lecture</Form.Label>
                                    <Form.Control value={this.state.total_lecture} onChange={(e)=>{this.setState({total_lecture: e.target.value})}} type="text" placeholder="Long Description" />
                                </Form.Group> 
                                
                                <Form.Group >
                                    <Form.Label>Total Student</Form.Label>
                                    <Form.Control value={this.state.total_student} onChange={(e)=>{this.setState({total_student: e.target.value})}} type="text" placeholder="Long Description" />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Small Image</Form.Label>
                                    <Form.Control onChange={this.onPhotoOneChange} type="file" />
                                    <img className="mt-3" src={this.state.small_img} width="100" height="100"/>
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Skill All</Form.Label>
                                    <ReactQuill  value={this.state.skill_all} onChange={this.onSkillAllChange} className="h-50" theme="snow" placeholder="Write Something..." />
                                </Form.Group> 
                                <Form.Group >
                                    <Form.Label>Video URL</Form.Label>
                                    <Form.Control value={this.state.video_url} onChange={this.onVideoURLChange} type="text"  placeholder="Video URL" />
                                </Form.Group> 
                                <Form.Group >
                                    <Form.Label>Course Link</Form.Label>
                                    <Form.Control value={this.state.courses_link} onChange={this.onCourseLinkChange} type="text"  placeholder="Course Link" />
                                </Form.Group>

                                <Button className="btn-block" variant="success mb-2" type="submit">
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

export default CoursePage;
