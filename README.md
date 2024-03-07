# Manage Whistle at <a href="https://managewhistle.com" target="_blank">managewhistle.com</a>
## How to set up the backend (windows commmands)
1. Open a terminal to do this steps: `cd` into the `/backend` folder and there create a python virtual environment with: `py -m venv env`
2. now activate the venv you just created using: `.\env\Scripts\activate`
3. now install all the necessary dependencies running: `pip install -r requirements.txt`
4. you can verify if they have been installed successfuly on your venv running: `pip freeze` and it should display the list with the same dependencies shown in requirements.txt
5. create a **superuser** with which you'll be able to login to <a href="http://127.0.0.1:8000" target="_blank">127.0.0.1:8000/admin</a> with the command: `py manage.py createsuperuser`, you'll have to create a **username**, hit enter, you can skip email for the user by pressing enter, type an easy password like 1234 since you don't need security to work on localhost and confirm it, when you type the password it won't show as you type so just hit enter.
6. now you can run de local server with: `py manage.py runserver`

## How to set up the Next js frontend
1. On another terminal without closing the backend terminal, `cd` into the nextjs-frontend folder
2. you should be using a new `node` version like `20.10.0` and then run: `npm install` to install the necessary dependencies
3. now you can run the local server with: `npm run dev`
