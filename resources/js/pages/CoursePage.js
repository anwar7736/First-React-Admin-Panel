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

class CoursePage extends Component {
	constructor(){
		super()
		this.state = {
			Data : [],
			isLoading : true,
			isError : false,
			deleteID : '',
			addNewModal : false,
			short_title:'',
            short_des :'',
            small_img :'',
            long_title :'',
            long_des :'',
            skill_all :'',
            video_url  :'',
            courses_link  :'',
            submitBtnText : 'Submit',
		}
	}
	componentDidMount(){
		Axios.get('http://127.0.0.1:8000/CourseList')
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
     addFormSubmit=(event)=>{

        event.preventDefault();

        let short_title=this.state.short_title;
        let short_des=this.state.short_des;
        let long_title=this.state.long_title;
        let long_des=this.state.long_des;
        let small_img=this.state.small_img;
        let skill_all=this.state.skill_all;
        let courses_link=this.state.courses_link;
        let video_url=this.state.video_url;
        if(short_title=='')
		{
			cogoToast.warn('Short title field is required!');
		}
		else if(short_des=='')
		{
			cogoToast.warn('Short description field is required!');
		}
		else if(long_title=='')
		{
			cogoToast.warn('Long title field is required!');
		}
		else if(long_des=='')
		{
			cogoToast.warn('Long description field is required!');
		}
		else if(small_img=='')
		{
			cogoToast.warn('Small image field is required!');
		}
		else if(skill_all=='')
		{
			cogoToast.warn('Skill all field is required!');
		}
		else if(video_url=='')
		{
			cogoToast.warn('Video URL field is required!');
		}
		else if(courses_link=='')
		{
			cogoToast.warn('Courses link field is required!');
		}
		else{
		this.setState({submitBtnText:'Submitting...'});
        let myFormData=new FormData();
        myFormData.append('short_title',short_title);
        myFormData.append('short_des',short_des);
        myFormData.append('long_title',long_title);
        myFormData.append('long_des',long_des);
        myFormData.append('small_img',small_img);
        myFormData.append('skill_all',skill_all);
        myFormData.append('courses_link',courses_link);
        myFormData.append('video_url',video_url);

        let url="/AddCourse";
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
							this.setState({short_title:''})
							this.setState({short_des:''})
							this.setState({long_title:''});
							this.setState({long_des:''});
							this.setState({skill_all:''});
							this.setState({courses_link:''})
							this.setState({video_url:''})
							this.setState({small_img:''})
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
			Axios.post('http://127.0.0.1:8000/CourseDelete', {id: this.state.deleteID})
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
        {dataField: 'small_img', text: 'Image',formatter:this.imgCellFormat},
        {dataField: 'short_title', text: 'Title'},
        {dataField: 'short_des', text: 'Description'},
        {dataField: 'total_lecture', text: 'Lecture'},
        {dataField: 'total_student', text: 'Student'},
		];
		const selectRow = {
		  mode: 'radio',
		  onSelect:(row, isSelect, rowIndex)=>{ 
		  	this.setState({deleteID : row['id']})
		  }
		  
		};

        return (
            <Fragment>
                <SideBar title="Courses">
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
                                    <Form.Label>Short Title</Form.Label>
                                    <Form.Control onChange={this.onShortTitleChange} type="text" placeholder="Short Title" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control  onChange={this.onShortDesChange} type="text" placeholder="Short Description" />
                                </Form.Group>

                                <Form.Group className="mb-5" >
                                    <Form.Label>Long Title</Form.Label>
                                    <Form.Control onChange={this.onLongTitleChange} type="text"  placeholder="Long Title" />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Long Description</Form.Label>
                                    <Form.Control onChange={this.onLongDesChange} type="text" placeholder="Long Description" />
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Small Image</Form.Label>
                                    <Form.Control onChange={this.onPhotoOneChange} type="file" />
                                </Form.Group>
                                <Form.Group >
                                    <Form.Label>Skill All</Form.Label>
                                    <ReactQuill  onChange={this.onSkillAllChange} className="h-50" theme="snow" placeholder="Write Something..." />
                                </Form.Group> 
                                <Form.Group >
                                    <Form.Label>Video URL</Form.Label>
                                    <Form.Control onChange={this.onVideoURLChange} type="text"  placeholder="Video URL" />
                                </Form.Group> 
                                <Form.Group >
                                    <Form.Label>Course Link</Form.Label>
                                    <Form.Control onChange={this.onCourseLinkChange} type="text"  placeholder="Course Link" />
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

export default CoursePage;
