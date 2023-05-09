from fastapi import FastAPI,File,UploadFile
import tensorflow as tf
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware
 
app=FastAPI()

origins=[
    "http://localhost",
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL=tf.keras.models.load_model("../saved_models/2") 
CLASS_NAMES=["Early Blight","Late Blight","Healthy"]

@app.post("/ping")
async def ping():
    return "Hello! Server is alive"

def read_file_as_image(data) -> np.ndarray:
    image=np.array(Image.open(BytesIO(data)))
    return image
    
@app.post("/predict")
async def predict(file : UploadFile=File(...)):
    image= read_file_as_image(await file.read()) 
    img_batch=np.expand_dims(image,0)
    predictions=MODEL.predict(img_batch)
    index=np.argmax(predictions[0])
    predicted_class=CLASS_NAMES[index]
    confidence=np.max(predictions[0])
    return {
        'class':predicted_class,
        'confidence':float(confidence)
    }


if __name__=="__main__":
    uvicorn.run(app,host='localhost',port=8000)