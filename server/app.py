from flask import Flask, render_template
import requests
import json 

app = Flask(__name__)
@app.route('/')
def index():
    
    return render_template('index.html')
if __name__ == '__main__':
    app.run(debug=True, port=80, host='192.168.1.213')