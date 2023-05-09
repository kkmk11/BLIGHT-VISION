import React, { useState } from "react";
import logo from './leaf.png'
import healthy from './healthy.gif'
import axios from "axios";
import { Modal} from 'react-bootstrap';
import { auth } from "./Firebase";

const Home=({presentUser})=>{
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen=()=>{
    setShowModal(true);
  }

  const handleModalClose=()=>{
    setShowModal(false);
  }
  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post("http://localhost:8000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(res.data);
    } catch (error) {
      console.log(error);
    }
  };  
  console.log(result.class)
  return (
    <div>
       <header>
       <nav className="navbar navbar-expand-md navbar-dark bg-dark pt-3 pb-2 navbar-fixed-top">
        <div className="container">
          <div className="nav-item float-start">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
              <li><img src={logo} height={30} width={30} /></li>&nbsp;&nbsp;
                <li> <h5 className="text-light">Blight Vision</h5></li>
              </ul>
            </div>
          </div>
          <div className="nav-item float-end">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto px-3">
              <li><button className='btn btn-outline-warning' onClick={()=>{window.location.reload()}}>Refresh</button></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <li><button className='btn btn-outline-light' onClick={()=>auth.signOut()}>LogOut</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      </header>
      <div>
        <br/><br/><br/>
        <div className="container d-flex justify-content-center mt-80">
          <div className="row">
            <div className="col-md-12">
              <div className="file-drop-area">
                 <input type="file" className="file-input" onChange={fileSelectedHandler} />
              </div>
            </div>
          </div>
        </div>
        <div className="container d-flex justify-content-center" style={{marginTop:30}}>
          <div className="row">
            <div className="col-md-12">
              <button className="btn btn-dark justify-content-center" onClick={fileUploadHandler}>Upload</button>
            </div>
          </div>
        </div>
        <div className="container d-flex justify-content-center" style={{marginTop:30}}>
        {selectedFile && 
              <table>
                <tr>
                    <td>
                    <img src={URL.createObjectURL(selectedFile)} alt="selected" height={232} width={232} />
                    </td>
                    {result.class && (
                     <>
                    <td>
                      <tr>
                          <td> <b>PREDICTION :</b> </td>
                          <td> {result.class} </td>
                      </tr>
                      <tr>
                          <td> <b>ACCURACY :</b> </td>
                          <td> {(parseFloat(result.confidence) * 100).toFixed(2)}% </td>
                      </tr>
                      {
                            result.class=="Healthy" 
                            ?
                            <div className="justify-content-center" style={{textAlign: "center"}}>
                              <img  src={healthy} height={120} width={120} style={{marginTop:9}} />
                            </div>
                            : 
                            <>    
                      <tr className="justify-content-center" style={{textAlign: "center"}}>
                          <td colSpan={2}><button className="but2" onClick={handleModalOpen}>Precautions <br/> and <br/> Pesticides</button></td>
                          {
                            result.class=="Late Blight" 
                            ?
                            <Modal show={showModal} onHide={handleModalClose} style={{height:"550px"}}>
                                <Modal.Header className='bg-dark text-light'>
                                    <Modal.Title>
                                        <h4 style={{color:"palegreen"}}>{result.class}</h4>
                                    </Modal.Title>
                               <button className='btn btn-success float-end' onClick={handleModalClose}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                </svg></button>
                            </Modal.Header>
                            <Modal.Body>
                            <h4><u>Precautions to be taken are</u>  </h4>
                            <ul>
                
                                <li>
                                  <small><b>Plant resistant varieties :</b> Use potato varieties that are resistant to late blight. This can significantly reduce the risk of infection and can help minimize the need for chemical treatments.</small>
                                </li>
                                <li>
                                  <small><b>Monitor crops regularly :</b> Regularly inspect potato crops for signs of late blight, such as brown lesions on leaves or stems. Early detection can help prevent the spread of the disease.</small>
                                </li>
                                <li>
                                  <small><b>Practice good crop management :</b> Practice good crop management techniques, such as rotating potato crops, controlling weeds, and maintaining proper irrigation and drainage. These practices can help prevent the buildup of late blight spores in the soil.</small>
                                </li>
                                <li>
                                  <small><b>Use fungicides :</b> Apply fungicides to potato crops as a preventative measure, particularly during periods of high humidity and rainfall. Be sure to follow all safety instructions and use the correct dosage and application method.</small>
                                </li>
                                <li>
                                  <small><b>Harvest and store potatoes properly :</b> Properly harvest and store potatoes to prevent rot and decay, which can lead to the formation of harmful toxins. Store potatoes in a cool, dry place and inspect them regularly for signs of infection or spoilage.</small>
                                </li>
                              </ul>
                            <br/>
                            <h4><u>Pesticides to be used are</u>  </h4>
                              <ul>
                                <li>
                                  <small><b>Chlorothalonil :</b> Chlorothalonil is a broad-spectrum fungicide that can be used to control late blight in potato plants. This product works by preventing fungal spores from germinating and infecting the plant. Chlorothalonil is available under several brand names, including Bravo and Daconil.</small>
                                </li>
                                <li>
                                  <small><b>Mancozeb :</b> Mancozeb is another fungicide that can be used to control late blight in potato plants. This product works by preventing fungal growth and is available under several brand names, including Dithane and Manzate.</small>
                                </li>
                                <li>
                                  <small><b>Phosphorus fertilizers :</b> Phosphorus fertilizers can help to promote healthy root growth in potato plants, which can reduce the risk of late blight. Examples of phosphorus fertilizers include rock phosphate and triple superphosphate.</small>
                                </li>
                                <li>
                                  <small><b>Copper fungicides :</b> Copper fungicides can also be effective in controlling late blight in potato plants, particularly in organic farming systems. Examples of copper fungicides include copper sulfate, copper hydroxide, and copper oxychloride.</small>
                                </li>
                                <li>
                                  <small><b>Bacillus subtilis :</b> Bacillus subtilis is a beneficial bacteria that can be used to control late blight in potato plants. This product works by colonizing the plant roots and producing antibiotics that can help to prevent fungal growth.</small>
                                </li>
                              </ul>
                            </Modal.Body>
                          </Modal>
                        :
                        <Modal show={showModal} onHide={handleModalClose} style={{height:"550px"}}>
                        <Modal.Header className='bg-dark text-light'>
                            <Modal.Title>
                            <h4 style={{color:"palegreen"}}>{result.class}</h4>
                            </Modal.Title>
                            <button className='btn btn-success float-end' onClick={handleModalClose}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                              </svg></button>
                          </Modal.Header>
                          <Modal.Body>
                          <h4><u>Precautions to be taken are</u> </h4>
                          <ul>
                                <li>
                                  <small><b>Plant resistant varieties :</b> Use potato varieties that are resistant to early blight. This can significantly reduce the risk of infection and can help minimize the need for chemical treatments.</small>
                                </li>
                                <li>
                                  <small><b>Practice crop rotation :</b> Avoid planting potatoes in the same soil year after year. Rotate crops with non-solanaceous crops such as legumes, corn or cereals. This can help reduce the buildup of early blight spores in the soil.</small>
                                </li>
                                <li>
                                  <small><b>Control moisture :</b> Early blight thrives in wet conditions. Avoid overhead watering and irrigate at the base of the plant instead. Make sure to water the potato plants early in the day so the foliage can dry before nightfall.</small>
                                </li>
                                <li>
                                  <small><b>Use fungicides :</b> Apply fungicides to potato crops as a preventative measure, particularly during periods of high humidity and rainfall. Be sure to follow all safety instructions and use the correct dosage and application method.</small>
                                </li>
                                <li>
                                  <small><b>Remove infected foliage :</b> Early blight can spread rapidly, so it is important to remove infected foliage as soon as it is detected. Infected leaves should be removed and destroyed, either by burning or by disposing of them away from the field.</small>
                                </li>
                              </ul>
                            <br/>
                            <h4><u>Pesticides to be taken are</u> </h4>
                            <ul>
                                <li>
                                  <small><b>Copper fungicides :</b> Copper fungicides are commonly used to control early blight in potato plants. These products work by killing the fungus that causes the disease. Examples of copper fungicides include copper sulfate, copper hydroxide, and copper oxychloride.</small>
                                </li>
                                <li>
                                  <small><b>Chlorothalonil :</b> Chlorothalonil is a broad-spectrum fungicide that can be used to control early blight in potato plants. This product works by preventing fungal spores from germinating and infecting the plant. Chlorothalonil is available under several brand names, including Bravo and Daconil.</small>
                                </li>
                                <li>
                                  <small><b>Nitrogen fertilizers :</b> Nitrogen fertilizers can help to promote healthy foliage growth in potato plants, which can reduce the risk of early blight. However, it's important to use nitrogen fertilizers in moderation, as excessive nitrogen can make the plants more susceptible to disease.</small>
                                </li>
                                <li>
                                  <small><b>Mancozeb :</b>Mancozeb is another fungicide that can be used to control early blight in potato plants. This product works by preventing fungal growth and is available under several brand names, including Dithane and Manzate.</small>
                                </li>
                                <li>
                                  <small><b>Potassium fertilizers :</b> Potassium fertilizers can also be beneficial for potato plants, as they can help to strengthen the plant's resistance to disease. Examples of potassium fertilizers include potassium sulfate, potassium chloride, and potassium nitrate.</small>
                                </li>
                              </ul>
                          </Modal.Body>
                        </Modal>
                          }
                      </tr>
                    </>
                    }
                    </td>
                    </>
                    )}
                </tr>
              </table>
            }
        </div>
    </div>
      </div>
  );
}

export default Home