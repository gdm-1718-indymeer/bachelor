# libraries
import time
import datetime
import os
import RPi.GPIO as GPIO
import pyrebase
from pathlib import Path
from dotenv import load_dotenv
from google.cloud import texttospeech
import json
from collections import namedtuple


load_dotenv()
now = datetime.datetime.now()
medBoxId = os.getenv("MEDBOX_ID")
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="./YourServiceAccount.json"
client_tts = texttospeech.TextToSpeechClient()

print(" This started on " + time.strftime("%H:%M"))

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
uid = ''
#get user id
def where_json(file_name):
    return os.path.exists(file_name)

if where_json('data.json'):
    with open('data.json') as f:
        uid = json.load(f)

else:
        data = db.child('pillbox/' + os.getenv("MEDBOX_ID")).get()
        for id in data.each():
                with open('data.json', 'w') as f:
                        json.dump(id.key(), f)


# check if online 
pillRef = db.child('pillbox/' + medBoxId).child(uid)

pillbox = []
def handle_stream(message):
        global pillbox
        print(message)
        pillbox = db.child('pillbox/' + medBoxId).child(uid).get().val()


# Use BCM GPIO references
# Instead of physical pin numbers
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

#listen to switch
GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_UP)


# Define GPIO signals to use Pins 18,22,24,26 GPIO24,GPIO25,GPIO8,GPIO7
StepPins = [17,18,27,22]
# Set all pins as output
for pin in StepPins:
        print("Setup pins")
        GPIO.setup(pin,GPIO.OUT)
        GPIO.output(pin, False)
# Define some settings
WaitTime = 0.005

# Define simple sequence
StepCount1 = 4
Seq1 = []
Seq1 = [i for i in range(0, StepCount1)]
Seq1[0] = [1,0,0,0]
Seq1[1] = [0,1,0,0]
Seq1[2] = [0,0,1,0]
Seq1[3] = [0,0,0,1]
# Define advanced half-step sequence
StepCount2 = 8
Seq2 = []
Seq2 = [i for i in range(0, StepCount2)]
Seq2[0] = [1,0,0,0]
Seq2[1] = [1,1,0,0]
Seq2[2] = [0,1,0,0]
Seq2[3] = [0,1,1,0]
Seq2[4] = [0,0,1,0]
Seq2[5] = [0,0,1,1]
Seq2[6] = [0,0,0,1]
Seq2[7] = [1,0,0,1]
# Choose a sequence to use
Seq = Seq2
StepCount = StepCount2

def steps(nb):
        StepCounter = 0
        if nb<0: sign=-1
        else: sign=1
        nb=sign*nb*2 #times 2 because half-step
        print("nbsteps {} and sign {}".format(nb,sign))
        for i in range(nb):
                for pin in range(4):
                        xpin = StepPins[pin]
                        if Seq[StepCounter][pin]!=0:
                                GPIO.output(xpin, True)
                        else:
                                GPIO.output(xpin, False)
                StepCounter += sign
        # If we reach the end of the sequence
        # start again
                if (StepCounter==StepCount):
                        StepCounter = 0
                if (StepCounter<0):
                        StepCounter = StepCount-1
                # Wait before moving on
                time.sleep(WaitTime)

# Start main loop
nbStepsPerRev=-256
nbFullLoop=-2048

#full loop is 2048

def speech(message):
    
    # Instantiates a client
    client = texttospeech.TextToSpeechClient()

    # Set the text input to be synthesized
    synthesis_input = texttospeech.types.SynthesisInput(text=message)

    # Build the voice request, select the language code ("en-US") and the ssml
    # voice gender ("neutral")
    voice = texttospeech.types.VoiceSelectionParams(
        language_code="nl-BE", ssml_gender=texttospeech.enums.SsmlVoiceGender.FEMALE
    )

    # Select the type of audio file you want returned
    audio_config = texttospeech.types.AudioConfig(
        audio_encoding=texttospeech.enums.AudioEncoding.MP3
    )

    # Perform the text-to-speech request on the text input with the selected
    # voice parameters and audio file type
    response = client.synthesize_speech(
        input_=synthesis_input, voice=voice, audio_config=audio_config
    )

    # The response's audio_content is binary.
    with open("output.mp3", "wb") as out:
        # Write the response to the output file.
        out.write(response.audio_content)

    print('Audio content written to file "output.mp3"')

    file = "output.mp3"
    # apt install mpg123
    # Save the audio file to the dir
    os.system("mpg123 " + file)

# set to good position after device restart
filename = 'latestLogin.json'
curDay = datetime.datetime.today().weekday() 

with open(filename) as f:
        preDay = json.load(f)

global deltDay
deltDay = 0

if curDay >= preDay:
        deltDay = curDay - preDay
elif curDay < preDay:
        deltDay = (curDay + 7) - preDay

print(deltDay)
steps(deltDay  * nbStepsPerRev)        
print(deltDay * nbStepsPerRev)


if __name__ == '__main__' :
        try:
                pillRef.stream(handle_stream)

                #continous loop
                has_run = False
                has_taken = True
                                        
                have_filled = ''
                while True:
                        todayName = time.strftime("%A").lower()
                        with open(filename) as f:
                             preDay = json.load(f)
                 

                        if(len(pillbox)>0):
                                times = [pillbox['events'][todayName+"Time"]]
                                input_state = GPIO.input(23)
                                clock = time.strftime("%H:%M")
                                now = datetime.datetime.now().strftime('%H:%M %Z')
                                start_dt = datetime.datetime.strptime(pillbox['events'][todayName+"Time"], '%H:%M')
                                start_plus_20 = start_dt + datetime.timedelta(minutes = 20)
                       


                                if preDay != datetime.datetime.today().weekday() :
                                        curDay = datetime.datetime.today().weekday() 
                                        with open(filename, 'w') as f:
                                                json.dump(curDay, f)     
                            
                                if input_state == True:
                                        speech('er is geen glas gedetecteerd, gelieve een glas te plaatsen op de aangeduide plaats')
                                        time.sleep(10)
                                
                                if pillbox['fill'] == True:                                   
                                        if have_filled < datetime.datetime.today().strftime("%Y-%m-%d"): 
                                                remainingdays = 7 - (datetime.datetime.today().weekday() + 1)
                                                steps(nbStepsPerRev + (remainingdays * nbStepsPerRev))
                                                db.child('pillbox/' + medBoxId).child(uid).update({'fill': False})
                                                have_filled = datetime.datetime.today().strftime("%Y-%m-%d")
                                                time.sleep(2)

                                        else:
                                                steps(nbFullLoop)
                                                db.child('pillbox/' + medBoxId).child(uid).update({'fill': False}) 
                                                time.sleep(2)



                                if clock in times:
                                        if not has_run:
                                                os.system("mpg123 notification.mp3")
                                                print('its time')
                                                speech('Het is tijd om je medicatie: ' + pillbox['events'][todayName+"Name"] + 'in te nemen')
                                                steps(nbStepsPerRev)
                                                while has_taken: 
                                                        input_state = GPIO.input(23)

                                                        if input_state == True:
                                                                print('das genomen')
                                                                speech('Bekijkt aandachtig de link die jou verzonden is via mail of sms hoe je dit medicijn moet innemen.')
                                                                has_taken = False
                                                                db.child('event/' + uid).child(pillbox['events'][todayName+"Key"]).update({'isTaken': True})
                                                                has_run = True
                                                                #give user 7min time to take their meds= 420sec
                                                                #for demo purpose only 20 sec
                                                                time.sleep(20)
                                                        
                                                        # if 20 minutes passed go back to normal 
                                                        if now == start_plus_20.strftime('%H:%M %Z'):
                                                                has_run = True

                                                has_run = True

                                else:
                                        has_run = False

        except KeyboardInterrupt:
                GPIO.cleanup()