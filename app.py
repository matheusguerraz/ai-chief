from flask import Flask, request, jsonify, render_template
import openai
import html
import os

openai.api_key = os.environ.get('API_KEY')

app = Flask(__name__)

contexto = "Você é um chef de cozinha que passará receitas incríveis a partir dos ingredientes que o usuário tiver. Para isso, você passará o modo de preparo detalhadamente."

@app.route('/recipe', methods=['POST'])
def obter_receita():
    data = request.get_json()
    ingredients = data['ingredients']
    pergunta = "Me passe uma receita utilizando apenas os ingredientes " + ingredients + "?"
    resposta = obter_resposta(pergunta)  # Passando a pergunta como argumento
    return jsonify({'recipe': resposta})


def obter_resposta(pergunta):
    resposta = openai.Completion.create(
        engine='text-davinci-003',
        prompt=contexto + '\nQ: ' + pergunta + '\nA:',
        temperature=0.7,
        max_tokens=500,
        n=1,
        stop=None,
    )
    resposta_formatada = html.escape(resposta.choices[0].text.strip()).replace('\n', '<br>')
    return resposta_formatada

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
