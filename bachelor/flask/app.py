from datetime import date, datetime, timedelta
import json
from re import T
from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
import base64
import requests
import six
import uuid
import threading
import time
import pyrebase
import imghdr
import io
import boto3
import os
import colorgram
import webcolors
import numpy as np
import cv2
import statistics
import pandas as pd
from pathlib import Path

from json2table import convert
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

dotenv_path = Path('./../.env')
is_running=True
load_dotenv(dotenv_path=dotenv_path)
app = Flask(__name__)
CORS(app)
def noquote(s):
    return s
pyrebase.pyrebase.quote = noquote

config = {
        "apiKey": os.getenv("REACT_APP_API_KEY"),
        "authDomain": os.getenv("REACT_APP_AUTH_DOMAIN"),
        "databaseURL": os.getenv("REACT_APP_DATABASE_URL"),
        "projectId": os.getenv("REACT_APP_PROJECT_ID"),
        "storageBucket": os.getenv("REACT_APP_STORAGE_BUCKET"),
        "messagingSenderId": os.getenv("REACT_APP_MESSAGING_SENDER_ID"),
        "appId": os.getenv("REACT_APP_APP_ID")
    }
firebase = pyrebase.initialize_app(config)
db = firebase.database()
def is_too_late(event,isAdmin =False):
    current_date = datetime.now().timestamp()
    firstOffset = timedelta(minutes=10)
    first_email_date = (datetime.fromtimestamp(event['timeStamp'])+firstOffset).timestamp()
    if "isTaken" in event.keys():
        if  not event['isTaken'] and first_email_date < current_date:
            offset = timedelta(minutes=20)
            email_date = (datetime.fromtimestamp(event['timeStamp'])+offset).timestamp()
            if isAdmin and email_date < current_date and not event['sendAdminReminder']:
                return True
            if(not event['sendFirstReminder'] or (not event['sendAdminReminder'] and not isAdmin)):
                return True
    return False
events=[]
def handle_stream(message):
    global events
    events = db.child("event").get().val()

def background_timer_checker():
    mail_url= os.getenv("REACT_APP_EMAIL_URL")
    mail_service_id= os.getenv("REACT_APP_EMAIL_SERVICE_ID")
    mail_userId= os.getenv("REACT_APP_EMAIL_USER_ID")
    mail_admin_templateId= os.getenv("REACT_APP_EMAIL_ADMIN_TEMPLATE_ID")
    mail_client_templateId = os.getenv("REACT_APP_EMAIL_CLIENT_TEMPLATE_ID")
    mail_access_token = os.getenv("REACT_APP_EMAIL_ACCESS_TOKEN")
    global events
    db.child('event').stream(handle_stream)
    #get all events
    events = db.child("event").get().val()
    while is_running:
        eventlist = []
        for userid in events:
            for eventid in events[userid]:
                if(is_too_late(events[userid][eventid])):
                    eventlist.append({userid:{eventid: events[userid][eventid]}})
        for event in eventlist:
            for userid in event:
                for eventid in event[userid]:
                    client = db.child('user').order_by_key().equal_to(userid).limit_to_first(1).get().val()[userid]
                    if not event[userid][eventid]['sendFirstReminder']:
                        #send email to normal client
                        if "displayName" in client:
                            clientName= client['displayName']
                        else:
                            clientName = client['firstname']+" "+client['lastname']
                        email =  client['email']
                        data = {
                                "service_id":mail_service_id,
                                "template_id":mail_client_templateId,
                                "user_id":mail_userId,
                                "accessToken": mail_access_token,
                                "template_params":{
                                        "to": email,
                                        "name": clientName,
                                }
                            }
                        headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
                        result = requests.post(mail_url,json= data, headers=headers)
                        time.sleep(1)
                        if(result.status_code != 200):
                            print(result.text)
                        else:
                            event[userid][eventid]['sendFirstReminder'] = True
                            db.child('event').child(userid).child(eventid).update(event[userid][eventid])

                    elif is_too_late(event[userid][eventid],True):
                        response = db.child('access').order_by_child("clientId").equal_to(userid).limit_to_first(1).get()
                        if len(response.each()) > 0:
                            adminId = response.val()[1]['adminId']
                            adminResponse = db.child('user').order_by_key().equal_to(adminId).limit_to_first(1).get()
                            adminUser=adminResponse.val()[adminId]
                            email = adminUser['email']
                            if "displayName" in client:
                                clientName= client['displayName']
                            else:
                                clientName = client['firstname']+" "+client['lastname']
                            if "displayName" in adminUser:
                                adminName= adminUser['displayName']
                            else:
                                adminName = adminUser['firstname']+" "+adminUser['lastname']
                            data = {
                                "service_id":mail_service_id,
                                "template_id":mail_admin_templateId,
                                "user_id":mail_userId,
                                "accessToken": mail_access_token,
                                "template_params":{
                                        "to": email,
                                        "name": adminName,
                                        "client_name": clientName
                                }
                            }
                            headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
                            result = requests.post(mail_url,json= data, headers=headers)
                            if(result.status_code != 200):
                                print(result.text)   
                            else:
                                event[userid][eventid]['sendAdminReminder'] = True
                                db.child('event').child(userid).child(eventid).update(event[userid][eventid])                                 
                            time.sleep(1)
                        else:
                            event[userid][eventid]['sendAdminReminder'] = True
                            db.child('event').child(userid).child(eventid).update(event[userid][eventid])
        time.sleep(15)

thread = threading.Thread(target=background_timer_checker, daemon=True)
thread.start()
# function to get latest iteration in loop


def is_nan(x):
    return (x is np.nan or x != x)


def get_file_extension(file_name, decoded_file):
    extension = imghdr.what(file_name, decoded_file)
    extension = "jpg" if extension == "jpeg" else extension
    return extension


def decode_base64_file(data):
    """
    Fuction to convert base 64 to readable IO bytes and auto-generate file name with extension
    :param data: base64 file input
    :return: tuple containing IO bytes file and filename
    """
    # Check if this is a base64 string
    if isinstance(data, six.string_types):
        # Check if the base64 string is in the "data:" format
        if 'data:' in data and ';base64,' in data:
            # Break out the header from the base64 content
            header, data = data.split(';base64,')

        # Try to decode the file. Return validation error if it fails.
        try:
            decoded_file = base64.b64decode(data)
        except TypeError:
            TypeError('invalid_image')

        # Generate file name:
        # 12 characters are more than enough.
        file_name = str(uuid.uuid4())[:12]
        # Get the file name extension:
        file_extension = get_file_extension(file_name, decoded_file)

        complete_file_name = "%s.%s" % (file_name, file_extension,)

        return io.BytesIO(decoded_file), complete_file_name


@app.route('/')
@cross_origin()
def index():
    return render_template('template.html')


def color(file):
    colors = colorgram.extract(file, 2)
    first_color = colors[1]
    rgb = first_color.rgb
    return rgb


def closest_colour(requested_colour):
    min_colours = {}
    for key, name in webcolors.CSS3_HEX_TO_NAMES.items():
        r_c, g_c, b_c = webcolors.hex_to_rgb(key)
        rd = (r_c - requested_colour[0]) ** 2
        gd = (g_c - requested_colour[1]) ** 2
        bd = (b_c - requested_colour[2]) ** 2
        min_colours[(rd + gd + bd)] = name
    return min_colours[min(min_colours.keys())]


def get_colour_name(requested_colour):
    try:
        closest_name = actual_name = webcolors.rgb_to_name(requested_colour)
    except ValueError:
        closest_name = closest_colour(requested_colour)
        actual_name = None
    return actual_name, closest_name


@app.route('/recognise/', methods=['GET', 'POST'])
@cross_origin()
def main():
    if request.method == 'POST':
        f = request.json['data']
        file, file_name = decode_base64_file(f)

    #get files before aws closes the file

    requested_colour = color(file)
    img = cv2.imdecode(np.array(file.getbuffer()),cv2.IMREAD_COLOR)
    file.seek(0)

    # prettier-ignore
    s3 = boto3.client('s3',region_name=os.getenv('FLASK_AWS_ZONE'), aws_access_key_id=os.getenv('FLASK_AWS_ACCESS_ID'),aws_secret_access_key=os.getenv('FLASK_AWS_SECRET_KEY'))

    bucket = 'bachelorpill'
    s3.upload_fileobj(
        file,
        bucket,
        file_name,
    )
    #s3.upload_file(photo, bucket, photo)

    client = boto3.client('rekognition',region_name=os.getenv('FLASK_AWS_ZONE'), aws_access_key_id=os.getenv('FLASK_AWS_ACCESS_ID'),aws_secret_access_key=os.getenv('FLASK_AWS_SECRET_KEY'))
    response = client.detect_text(Image={'S3Object': {'Bucket': 'bachelorpill', 'Name': file_name}})

    textDetections = response['TextDetections']
    text2 = ""
    for text in textDetections:
        if text['DetectedText'] not in text2:
            text2 = text2 + text['DetectedText']
    text2 = ''.join(text2.split())

    # Getting color
    actual_name, closest_name = get_colour_name(requested_colour)
    print(actual_name)
    if "gray" in closest_name:
        closest_name = "WHITE"
    if "rose" in closest_name:
        closest_name = "PINK"
    if "red" in closest_name:
        closest_name = "RED"
    if "yellow" in closest_name:
        closest_name = "YELLOW"
    if "blue" in closest_name:
        closest_name = "BLUE"

    # Getting shape with opencv
    shape = ""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.Canny(np.asarray(gray), 50, 250)

    contours, hierarchy = cv2.findContours(
        gray, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    avgArray = []
    for cnt in contours:
        approx = cv2.approxPolyDP(cnt, 0.01 * cv2.arcLength(cnt, True), True)
        avgArray.append(len(approx))
    print(avgArray)
    edges = 0
    if(len(avgArray) > 0):
        edges = statistics.median(avgArray)

    if edges == 3:
        shape = "triangle"
    elif edges == 4:
        shape = "square"
    elif edges == 8 or edges == 8.0:
        shape = "circle"
    elif edges == 9:
        shape = "half-circle"
    elif edges < 15:
        shape = "OVAL"
    elif edges > 15:
        shape = "CIRCLE"

    data = {"uploadName": file_name, "text": text2,
            "color": closest_name, "shape": shape}

    dataframe = pd.read_csv("out.csv")

    for idx, row in dataframe.iterrows():
        name = str(row["Imprint"]).replace(";", "")
        if not is_nan(row["Name"]):
            if name == text2 and row["Color"] == color and row["Shape"] == shape:
                return '''<style>
                table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 5px;
                    text-align: left;
                }
                b{
                    margin-left: 43%;
                    font-size: 20px;
                }
                </style><b>Pill Details</b><br><table style="width:100%; height: 80%; padding: 1px; margin: 1px"><br />
                  <tr><th>Author</th><td>'''+str(row["Author"])+'''</td></tr>
                    <tr><th>Name</th><td>'''+str(row["Name"])+'''</td></tr>
                    <tr><th>Color</th><td>'''+str(closest_name)+'''</td></tr>
                    <tr><th>Imprint</th><td>'''+str(row["Imprint"])+'''</td>
                    <tr><th>Size</th><td>'''+str(row["Size"])+'''</td></tr>
                    <tr><th>Shape</th><td>'''+str(row["Shape"])+'''</td></tr>
                    <tr><th>Ingredients</th><td>'''+str(row["Ingredients"])+'''</td></tr>
                </table>'''

            elif name == text2 and row["Color"] == color:
                return '''<style>
                table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 5px;
                    text-align: left;
                }
                b{
                    margin-left: 43%;
                    font-size: 20px;
                }
                </style><b>Pill Details</b><br><table style="width:100%; height: 80%; padding: 1px; margin: 1px"><br />
                  <tr><th>Author</th><td>'''+str(row["Author"])+'''</td></tr>
                    <tr><th>Name</th><td>'''+str(row["Name"])+'''</td></tr>
                    <tr><th>Color</th><td>'''+str(closest_name)+'''</td></tr>
                    <tr><th>Imprint</th><td>'''+str(row["Imprint"])+'''</td>
                    <tr><th>Size</th><td>'''+str(row["Size"])+'''</td></tr>
                    <tr><th>Shape</th><td>'''+str(row["Shape"])+'''</td></tr>
                    <tr><th>Ingredients</th><td>'''+str(row["Ingredients"])+'''</td></tr>
                </table>'''

            elif name == text2:
                return '''<style>
                table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 5px;
                    text-align: left;
                }
                b{
                    margin-left: 43%;
                    font-size: 20px;
                }
                </style><b>Pill Details</b><br><table style="width:100%; height: 80%; padding: 1px; margin: 1px"><br />
                  <tr><th>Author</th><td>'''+str(row["Author"])+'''</td></tr>
                    <tr><th>Name</th><td>'''+str(row["Name"])+'''</td></tr>
                    <tr><th>Color</th><td>'''+str(closest_name)+'''</td></tr>
                    <tr><th>Imprint</th><td>'''+str(row["Imprint"])+'''</td>
                    <tr><th>Size</th><td>'''+str(row["Size"])+'''</td></tr>
                    <tr><th>Shape</th><td>'''+str(row["Shape"])+'''</td></tr>
                    <tr><th>Ingredients</th><td>'''+str(row["Ingredients"])+'''</td></tr>
                </table>'''

            elif idx == dataframe.index[-1]:
                return '''<style>
                table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 5px;
                    text-align: left;
                }
                b{
                    margin-left: 43%;
                    font-size: 20px;
                }
                </style><b>Pill Details</b><br><table style="width:100%; height: 80%; padding: 1px; margin: 1px"><br />
                    <p> Could not recognise the picture correct</p>
                    <p> The data I saw was: </p>
                    <tr><th>Name</th><td>''' + str(text2)+'''</td></tr>
                    <tr><th>Color</th><td>''' + str(closest_name)+'''</td></tr>
                    <tr><th>Shape</th><td>''' + str(shape) + '''</td></tr>
                </table>'''


if __name__ == "__main__":
    app.run(debug=True)
