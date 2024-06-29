import React,{useState} from "react" ;
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from "axios" ;
function App() {
  const [feature1, setFeature1] = useState(0);
  const [prediction,setPrediction]= useState(null);
  const [error, setError] = useState(null);
  console.log(setFeature1);
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    console.log(transcript) ;
    if (!browserSupportsSpeechRecognition) {
        return null
    }
const handleSubmit = async (e)=>{
  e.preventDefault() ;
  const payload = {
    feature1: feature1
};
console.log("Sending payload:", payload);
  
try {
  const response = await axios.post("enter-server", payload);
  setPrediction(response.data.prediction);
  setError(null);
} catch (error) {
  console.error("There was an error making the request:", error);
  setError(error.response ? error.response.data : "Request failed");
}
 
};
  return (
  <>
  <div>
  <h1>Personalized Mental Health Support</h1>
  <form onSubmit={handleSubmit}>
  <label>

  <input 
  type = "text"
  onChange = {(e)=> setFeature1(e.target.value)}/>
 
  </label>
  
  
  <br/>
  <button  type="submit">Predict</button>
  <button onClick={startListening}>Start Listening</button>
                        <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
  </form>
  {prediction != null && <div> Prediction : {prediction}</div>}
  </div>
  </>
  );
}

export default App;
