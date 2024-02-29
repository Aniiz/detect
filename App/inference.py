from flask import Flask, request,render_template, jsonify
from flask_cors import CORS
import base64
import os
from ultralytics import YOLO
import cv2
import numpy as np

app = Flask(__name__ , static_folder='../web', template_folder='../web')
CORS(app)

def loadmodel():
    model = YOLO('App/best.pt')
    return model

modelo  = loadmodel()

@app.route("/", methods=["GET"])
def index():
    return render_template('index.html')

@app.route("/detImg", methods=["POST"])
def inference():

    imgs = request.get_json()['image']
    imagembyte = (base64.b64decode(imgs)) 
    
    with open(os.path.join('App/imgs', 'ferida.jpg'), 'wb') as f:
        f.write(imagembyte)
    
    results = modelo(r'App/imgs/ferida.jpg') 
    
    xyxy = results[0].boxes.xyxy.cpu().numpy() # Extrai os valores da box
    conf = results[0].boxes.conf.cpu().numpy() # Extrai os valores da confiança

    img = cv2.imread(r'App/imgs/ferida.jpg') #Lê a imagem
    h, w, _ = img.shape
    margem = 20

    nova_img = np.zeros((h + 2*margem, w + 2*margem, 3), dtype=np.uint8)
    nova_img[margem:h+margem, margem:w+margem, :] = img
    
    for i, item in enumerate(xyxy):
        x1, y1, x2, y2 = item.astype(int)
        nova_img = cv2.rectangle(nova_img, (x1+margem, y1+margem), (x2+margem, y2+margem), (255,255,255), 2) # Desenha retangulo
        text = f"{conf[i]:.3f}"
        cv2.putText(nova_img, text, (x1+margem+2, y1+margem-5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255,255,255), 2) # Escreve a confiança

    cv2.imwrite(os.path.join('App/imgs', 'ferida_com_quadrado.jpg'), nova_img) #Salva a imagem da predição

    with open('App/imgs/ferida_com_quadrado.jpg', 'rb') as f:
        img_bytes = f.read()
        imgPred = base64.b64encode(img_bytes).decode('utf-8')

    re = len(results[0]) # Extração dos resultados

    if re > 0:
        return jsonify({"resp": True, "imgPred": imgPred, 'Qtd': re})
    if re == 0:
            return jsonify({"resp": False, "imgPred": imgPred})
