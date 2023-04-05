import traceback
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import sys
import os
import pickle
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler


app = Flask(__name__)
CORS(app)
curr_loc = os.path.dirname(os.path.realpath(__file__))

# [Feed	% Silica Feed	Starch Flow	Amina Flow	Ore Pulp Flow	
# Ore Pulp pH	Ore Pulp Density	Flotation Column 01 Air Flow	
# Flotation Column 04 Air Flow	Flotation Column 07 Air Flow	
# Flotation Column 01 Level	Flotation Column 04 Level	Flotation Column 07 Level]
model = pickle.load(open(str(curr_loc)+'/ada_reg_dt.pkl', 'rb'))
# model = pickle.load(open(str(curr_loc)+'/xgb_model2.pkl', 'rb'))
print("Model has been loaded")
mean = [5.62985398e+01, 1.46503424e+01, 2.86883036e+03, 4.88327562e+02,
       3.97575789e+02, 9.76740871e+00, 1.68053750e+00, 2.80116134e+02,
       2.99446276e+02, 2.90716033e+02, 5.20145594e+02, 4.20045191e+02,
       4.20808275e+02]
std = [5.16152689e+00, 6.81258540e+00, 1.21530353e+03, 9.12160806e+01,
       9.70341252e+00, 3.87167435e-01, 6.91261666e-02, 2.96383309e+01,
       2.57494666e+00, 2.87026140e+01, 1.31105957e+02, 9.16969550e+01,
       8.48699047e+01]
var = [2.66413598e+01, 4.64113199e+01, 1.47696266e+06, 8.32037336e+03,
       9.41562146e+01, 1.49898623e-01, 4.77842690e-03, 8.78430659e+02,
       6.63035031e+00, 8.23840050e+02, 1.71887721e+04, 8.40833156e+03,
       7.20290072e+03]
n_samples_seen=589025

@app.route("/")
def index():
    return "<h1> Iron Ore Quality Predictor </h1>"

@app.route("/predict", methods=["POST"])
def predict():
    if(model):
        try:
            reqData = request.json
            df = pd.DataFrame([reqData])
            df = np.array(df.astype("float64"))
            scaler = StandardScaler()
            scaler.mean_ = mean
            scaler.scale_ = std
            scaler.var_ = var
            scaler.n_samples_seen_=n_samples_seen
            inp = scaler.transform(df)
            prediction = model.predict(inp)

            return jsonify({"predicted" : list(prediction)})
        except:
            return jsonify({"error" : traceback.format_exc()})
    else:
        print("Model error")

if __name__ == "__main__":
    app.run(debug=True)