import mindspore as ms
from mindspore import nn
import mindspore.ops as ops
from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# --------------------
# Model architecture
# --------------------
class HydroponicModel(nn.Cell):
    def __init__(self):
        super().__init__()
        self.net = nn.SequentialCell(
            nn.Dense(6, 64),
            nn.ReLU(),
            nn.Dense(64, 32),
            nn.ReLU(),
            nn.Dense(32, 16),
            nn.ReLU(),
            nn.Dense(16, 1)
        )

    def construct(self, x):
        return self.net(x)
# --------------------
# Load model
# --------------------
model = HydroponicModel()

param_dict = ms.load_checkpoint("mindspore_hydroponic_model.ckpt")
ms.load_param_into_net(model, param_dict)

model.set_train(False)

sigmoid = ops.Sigmoid()

# --------------------
# Input schema
# --------------------
class SensorData(BaseModel):
    pH: float
    TDS: float
    water_level: float
    DHT_temp: float
    DHT_humidity: float
    water_temp: float

# --------------------
# Prediction endpoint
# --------------------
@app.post("/predict")
def predict(data: SensorData):

    features = np.array([[ 
        data.pH,
        data.TDS,
        data.water_level,
        data.DHT_temp,
        data.DHT_humidity,
        data.water_temp
    ]], dtype=np.float32)

    x = ms.Tensor(features)

    logits = model(x)
    prob = sigmoid(logits)

    prediction = int(prob.asnumpy()[0][0] > 0.5)

    return {
        "water_change_needed": prediction,
        "probability": float(prob.asnumpy()[0][0])
    }