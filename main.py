#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# author: Madhav 

from flask import Flask, request, jsonify
from flask_cors import CORS
from waitress import serve
import json


# Flask app
app = Flask(__name__)
CORS(app)


# get updates about followers and unfollowers
def get_output(current: list) -> str:
    # read previous
    try:
        with open('previous.json', 'r') as file:
            previous = json.load(file)
    except Exception as e:
        print("** Error reading previous.json")
        print("**", str(e))
        previous = []

    unfollowers = [ye for ye in previous if ye not in current]
    new_followers = [ye for ye in current if ye not in previous]

    # prepare the output
    output = f"# Total Followers: {len(current)}\n"
    if unfollowers:
        # output += "-----------------------------------\n"
        output += f"\n# {len(unfollowers)} unfollowers\n\n"
        for i in unfollowers:
            output += f"* https://twitter.com/{i}\n"
    if new_followers:
        # output += "-----------------------------------\n"
        output += f"\n# {len(new_followers)} new followers\n\n"
        # output += "------------------\n"
        for i in new_followers:
            output += f"* https://twitter.com/{i}\n"
    if not (unfollowers or new_followers):
        # output += "-----------------------------------"
        output += "\nNobody unfollowed.\n"

    # save previous
    try:
        previous = current
        with open('previous.json', 'w') as file:
            json.dump(previous, file)
    except Exception as e:
        print("**** Error saving previous.json")
        print("****", str(e))
            
    return output

# index
@app.route('/', methods=['GET', 'POST', 'HEAD'])
def index():
    if request.method == "HEAD":
        print("HEAD request")
        return "online"
    
    if request.method == "GET":
        print("* online")
        return "online"
    
    elif request.method == "POST":
        print("# POST REQUEST RECEIVED")
        data = request.get_json()
        followers = data['followers']
        
        try:
            output = get_output(current=followers)
            return jsonify({'output': output}), 200
        except Exception as e:
            print(str(e))
            return str(e)


# start server
if __name__ == '__main__':
    print("[server going online]")
    serve(
        app=app, 
        host="0.0.0.0", 
        port=1234
    )
