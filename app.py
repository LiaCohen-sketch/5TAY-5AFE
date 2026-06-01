from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)
ROOT = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/history')
def URLhisrtory():
    return render_template('history.html')

@app.route('/api/learnMore')
def URLlearnMore():
    return render_template('learnMore.html')

@app.route('/api/CheckURL')
def URLCheckURL():
    return render_template('CheckURL.html')

@app.route('/model.onnx')
def model_onnx():
    return send_from_directory(ROOT, 'model.onnx')


if __name__ == '__main__':
    app.run(debug=True)