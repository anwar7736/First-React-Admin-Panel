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
import cogoToast from 'cogo-toast';

class CoursePage extends Component {
	constructor(){
		super()
		this.state = {
			Data : [],
			isLoading : true,
			isError : false,
			deleteID : '',
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

export default CoursePage;
