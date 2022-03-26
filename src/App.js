import './App.css';
import TodoList from './components/Todo/TodoList';
import Day from './components/DateTime/Day';
import Time from './components/DateTime/Time';
import Weather from './components/Weather/Weather';
import Timer from './components/Timer/Timer';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {


  return (
    <div className="App">

      <Container>

        <Row>
          <Col sm={8}>
            <Row style={{ display:"flex", flexDirection:"row"}}>

              <div id="time">
                <Day  />
                <Time />
              </div>
              
              <div id="weather">
                <Weather />
              </div>

            </Row>

            <Row>
              <Col sm={7} id="weather">
                <Weather />
              </Col>

              <Col id="timer">
                <Timer />
              </Col>

            </Row>
          </Col>

          <Col id="todo">
            <TodoList />
          </Col>
        </Row>



      </Container>

    </div>
  );
}

export default App;
