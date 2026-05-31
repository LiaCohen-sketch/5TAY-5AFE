from flask import Flask, render_template, url_for, request, jsonify #שרת, HTML, אפשרות העלאה

from flask import request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/history')
def URLcheck():
    return render_template('history.html')

@app.route('/api/learnMore')
def URLlearnMore():
    return render_template('learnMore.html')


if __name__ == '__main__':
    app.run(debug=True)