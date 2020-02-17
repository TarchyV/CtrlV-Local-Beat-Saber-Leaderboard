import subprocess
import os
import webbrowser
import time
try:
    path = os.getcwd() + "\\XAMPP\\apache_start.bat"
    url = 'localhost'
    chrome_path = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe %s'
    webbrowser.get(chrome_path).open(url)
    subprocess.call(path)
except:
    print('File not found')

