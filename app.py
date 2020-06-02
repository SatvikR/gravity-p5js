from flask import Flask, render_template, url_for, redirect

app = Flask(__name__)

@app.route('/')
def home():
    return redirect(url_for('snake'))

@app.route('/tic')
def tic():
    return render_template('tic.html')

@app.route('/snake')
def snake():
    return render_template('snake.html')

@app.route('/grav')
def grav():
    return render_template('grav.html')
if __name__ == '__main__':
    app.run()