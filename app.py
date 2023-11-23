import os
os.system('cls')
from flask import Flask, render_template, request, redirect
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    senha = request.form['senha']

    # Envie os dados de login para a sua API usando requests
    login_url = 'http://127.0.0.1:5000/users/login'  # Substitua pela URL correta da sua API
    response = requests.post(login_url, json={'Email': email, 'Senha': senha})

    if response.ok:
        # Redirecione para a página 'main.html' se o login for bem-sucedido
        return redirect('/main')
    else:
        return 'Login failed. Check your email and password.'

# Adicione uma rota para a página 'main.html'
@app.route('/main')
def main():
    return render_template('main.html')

if __name__ == '__main__':
    app.run(debug=True, port=8000)
