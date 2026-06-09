import json
from google.oauth2 import service_account
from googleapiclient.discovery import build
import time

# Load credentials
SERVICE_ACCOUNT_FILE = 'credentials.json'
SCOPES = ['https://www.googleapis.com/auth/indexing']
credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
indexing_api = build('indexing', 'v3', credentials=credentials)

# Only NEW URLs (remove the 8 already submitted)
urls = [
    "https://wellness-gadget-insider.vercel.app/blog/best-leg-compression-massager-for-home",
    "https://wellness-gadget-insider.vercel.app/blog/best-red-light-therapy-facial-massager-skincare-device",
    "https://wellness-gadget-insider.vercel.app/blog/best-sleep-aid-device-for-stress",
    "https://wellness-gadget-insider.vercel.app/blog/best-device-for-back-pain-management",
    "https://wellness-gadget-insider.vercel.app/blog/best-home-acupressure-foot-massager",
    "https://wellness-gadget-insider.vercel.app/blog/best-sciatica-pain-relief-device",
    "https://wellness-gadget-insider.vercel.app/blog/why-medicube-booster-pro-skincare-device",
    "https://wellness-gadget-insider.vercel.app/blog/best-vagus-nerve-stimulator-for-stress",
    "https://wellness-gadget-insider.vercel.app/blog/best-home-electronic-breathing-device",
    "https://wellness-gadget-insider.vercel.app/blog/best-home-cervical-neck-traction-device",
    "https://wellness-gadget-insider.vercel.app/blog/best-neck-pain-relief-device",
    "https://wellness-gadget-insider.vercel.app/blog/best-skincare-microcurrent-Nuface-facial-device",
    "https://wellness-gadget-insider.vercel.app/blog/best-full-body-massage-mat-for-stress",
    "https://wellness-gadget-insider.vercel.app/blog/best-electric-home-cupping-kit",
    "https://wellness-gadget-insider.vercel.app/blog/best-electric-cellulite-massager"
]

for url in urls:
    try:
        response = indexing_api.urlNotifications().publish(
            body={"url": url, "type": "URL_UPDATED"}
        ).execute()
        print(f"✅ Submitted: {url} | Response: {response}")
        time.sleep(15)  # Safer delay
    except Exception as e:
        print(f"❌ Failed {url}: {str(e)}")
        with open("error_log.txt", "a") as f:
            f.write(f"Failed {url}: {str(e)}\n")