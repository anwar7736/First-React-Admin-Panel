import React, {Component, Fragment} from 'react';
import SideBar from '../components/SideBar';
import {Card, Col, Container, Row} from "react-bootstrap";
import Axios from "axios";
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";

class HomePage extends Component {
	constructor() {
        super();
        this.state={
            dataList:[],
            isLoading:true,
            isError:false,
        }
    }
     componentDidMount() {


        Axios.get('/CountSummary').then((response)=>{
            if(response.status==200){
                this.setState({dataList:response.data,isLoading:false,isError:false})
            }
            else{
                this.setState({isLoading:false,isError:true})
            }
        }).catch((error)=>{
            this.setState({isLoading:false,isError:true})
        })
    }
    render() {
    	const data = this.state.dataList;
        return (
            <Fragment>
            	<SideBar title="Home">
                		 <Container fluid={true}>
                            <Row>
                                <Col className="p-2" md={3} log={3} sm={6}>
                                    <Card className="card bg-success">
                                        <Card.Body>
                                            <h5 className="title-text">{data['contact']}</h5>
                                            <h5 className="des-text text-dark">Contact Request</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" md={3} log={3} sm={6}>
                                    <Card className="card bg-info">
                                        <Card.Body>
                                            <h5 className="title-text text-white">{data['course']}</h5>
                                            <h5 className="des-text text-white">Total Courses</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" md={3} log={3} sm={6}>
                                    <Card className="card bg-secondary">
                                        <Card.Body>
                                            <h5 className="title-text text-success">{data['project']}</h5>
                                            <h5 className="des-text text-success">Total Projects</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" md={3} log={3} sm={6}>
                                    <Card className="card bg-warning">
                                        <Card.Body>
                                            <h5 className="title-text text-info">{data['review']}</h5>
                                            <h5 className="des-text text-info">Total Review</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" md={3} log={3} sm={6}>
                                    <Card className="card bg-dark">
                                        <Card.Body>
                                            <h5 className="title-text text-danger">{data['service']}</h5>
                                            <h5 className="des-text text-danger">Total Services</h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>

                </SideBar>
            </Fragment>
        );
    }
}

export default HomePage;
