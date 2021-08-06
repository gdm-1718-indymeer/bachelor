from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
import base64
import six
import uuid
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

dotenv_path = Path('./.env')

load_dotenv(dotenv_path=dotenv_path)

os.environ['AWS_DEFAULT_REGION'] = 'eu-west-2'

app = Flask(__name__)
CORS(app)

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
        #fh = open(file_name, 'wb')
        #fh.write(file.getbuffer())
        # f.save(secure_filename(file_name))
        # f = str(file_name)

    # prettier-ignore
    s3 = boto3.client('s3',
                      aws_access_key_id=os.getenv('AWS_ACCESS_ID'),
                      aws_secret_access_key=os.getenv('AWS_SECRET_KEY'))

    bucket = 'bachelorpill'
    photo = file
    s3.upload_fileobj(
        file,
        bucket,
        file_name,
    )
    #s3.upload_file(photo, bucket, photo)

    client = boto3.client('rekognition',
                          aws_access_key_id=os.getenv('AWS_ACCESS_ID'),
                          aws_secret_access_key=os.getenv('AWS_SECRET_KEY'))
    response = client.detect_text(
        Image={'S3Object': {'Bucket': 'bachelorpill', 'Name': file_name}})

    textDetections = response['TextDetections']
    text2 = ""
    for text in textDetections:
        if text['DetectedText'] not in text2:
            text2 = text2 + text['DetectedText']
    text2 = ''.join(text2.split())

    # Getting color
    requested_colour = color(file)
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
    img = cv2.imread(photo)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.Canny(np.asarray(gray), 50, 250)

    contours, hierarchy = cv2.findContours(
        gray, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    avgArray = []
    for cnt in contours:
        approx = cv2.approxPolyDP(cnt, 0.01 * cv2.arcLength(cnt, True), True)
        avgArray.append(len(approx))

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

    data = {"uploadName": photo, "text": text2,
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
