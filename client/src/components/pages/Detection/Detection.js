import React /*{useEffect}*/ from 'react'; 
import './Detection.css';
import {Container, Row, Col} from "react-bootstrap";
//import Posts from "./Posts/Posts";
import Form from "./Form/Form"
import { createPost, getPostsStatus } from '../../../states/PostsSlice';
//import {useDispatch} from "react-redux";
//import {getPosts} from "../../../actions/posts";


const Detection = () => { 
  /*const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch]);*/

  return(
      <>
        <Container fluid className='canvas'>
          <Row>

            <Col>
              <h1>Guidelines for detection</h1>
              <div className='board'>
                <p>
                  If you are researchers working on this topic, you could directly go to the 
                  contact page. There you could find the form by which you can 
                </p>
              </div>
            </Col>

            <Col className="form">
              <Form className="formCard" />
            </Col>

          </Row>
          <Row>
              <Col className="notice-board">
                
              </Col>
            </Row>
        </Container>
        
        
            
              
                
            
          
          
            
          
    
        
        
        
        
      </>
    )
};

export default Detection;