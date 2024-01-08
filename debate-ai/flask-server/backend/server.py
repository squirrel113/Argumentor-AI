from flask import request, Blueprint, Flask, jsonify
import evidence_scraper
import eyePositionAnalyzer
import glob
import time
import sys
from moviepy.editor import *
import os
from random import randint
from playsound import playsound
import detect_stutter
import logging

app = Flask(__name__)

# Configure the logging module
logging.basicConfig(level=logging.DEBUG)

# Register the "second" blueprint
@app.route("/members")
def membercount():
    members = {"Tim": "Member1", "Doe": "Member2", "John": "Member3"}
    logging.info(members)
    return "Members logged in the console. Check your server logs."

@app.route("/evifinder", methods=['GET', 'POST'])
def evifinder():
    if request.method == 'POST':
        try:
            query = request.get_json()
            logging.debug(f"Received JSON payload: {query}")
            url_list = evidence_scraper.search_google(query, num_results=2)
            response = evidence_scraper.web_qa(url_list, query)
            return jsonify(response)
        except Exception as e:
            logging.error(f"Error processing POST request: {e}")
            return jsonify({'error': 'Internal Server Error'}), 500
    elif request.method == 'GET':
        # Code for handling GET requests
        return jsonify({'error': 'Method Not Allowed'}), 405
    else:
        # Handle other methods if necessary
        return jsonify({'error': 'Method Not Allowed'}), 405

@app.route('/startVideoAnalysis', methods=['POST'])
def debate_video_analysis():
    try:
        query = request.get_json()
        time.sleep(2)
        latest_mp4_file = return_latest_mp4()
        logging.debug(f"Latest mp4 file: {latest_mp4_file}")
        os.rename(latest_mp4_file, latest_mp4_file.replace(' ', str(randint(700000, 9000000))))
        new_mp4 = return_latest_mp4()
        logging.debug(f"Renamed mp4 file: {new_mp4}")

        accuracy_ratio = eyePositionAnalyzer.analyzeEyePosition(new_mp4)
        ffmpeg_tools.ffmpeg_extract_audio(new_mp4, f"C:\\Users\\nikhi\\Downloads\\audio_from_video{str(randint(700000, 9000000))}.wav")
        p_sev, r_sev, o_sev, p_count, r_count = audio_analyzer(return_latest_wav())
        accuracy_ratio['stuttering_count'] = round(p_count+r_count)
        logging.debug(f"Video analysis results: {accuracy_ratio}")
        return jsonify([accuracy_ratio])
    except Exception as e:
        logging.error(f"Error processing video analysis: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

def audio_analyzer(audio):
    return detect_stutter.detect_stutter(audio)

def return_latest_wav():
    list_of_files = glob.glob(r'C:\Users\nikhi\Downloads\*.wav')
    latest_wav_file = max(list_of_files, key=os.path.getctime)
    return latest_wav_file

def return_latest_mp4():
    list_of_files = glob.glob(r'C:\Users\nikhi\Downloads\*.mp4')
    latest_mp4_file = max(list_of_files, key=os.path.getctime)
    return latest_mp4_file

if __name__ == "__main__":
    app.run(host='127.0.0.1', debug=True, port=3500)
