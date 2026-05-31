from flask import Flask, render_template, url_for, request, jsonify #שרת, HTML, אפשרות העלאה
import random
import os
import numpy as np
import requests
import time
from flask import request

@app.rote('/')
def index():
    return render_template('index.html')

@app.route('/api/history')
def URLcheck():
    return render_template('history.html')