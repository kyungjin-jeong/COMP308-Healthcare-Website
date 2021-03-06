import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function ViewTreatment(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/findTreatment";

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </Spinner> }

      <h2 style={{textAlign: "center"}}>Treatments</h2>
      <Table striped bordered hover style= {{marginTop: 20, width: 1200, marginLeft: 150}}>
            <thead>
              <tr>
                <th>Symptom</th>
                <th>What you might have</th>
                <th>Possible Treatments</th>
              </tr>
            </thead>
            
            <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
            <td>{item.symptom}</td>
            <td>{item.possibleList}</td>
            <td>{item.possibleTreatment}</td>
              </tr>
        ))}
              </tbody>
            </Table>
    </div>
  );
}

export default withRouter(ViewTreatment);