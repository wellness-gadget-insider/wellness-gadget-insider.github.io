import requests

# Generate your key at: https://www.indexnow.org/key-generator
INDEXNOW_KEY = "7abf5af94ecf4746b7feea1bfe205e5f"  # Replace with your actual key
KEY_LOCATION = f"https://wellness-gadget-insider.vercel.app/bing-site-auth.xml?key={INDEXNOW_KEY}"

urls = [
    "https://wellness-gadget-insider.vercel.app",
    "https://wellness-gadget-insider.vercel.app/blog",
    "https://wellness-gadget-insider.vercel.app/about",
    "https://wellness-gadget-insider.vercel.app/faq",
    "https://wellness-gadget-insider.vercel.app/blog/category/pain-management",
    "https://wellness-gadget-insider.vercel.app/blog/category/skincare-device",
    "https://wellness-gadget-insider.vercel.app/blog/category/stress-relief-methods",
    "https://wellness-gadget-insider.vercel.app/blog/category/home-medical-equipment",
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
    "https://wellness-gadget-insider.vercel.app/blog/best-electric-cellulite-massager",
    "https://wellness-gadget-insider.vercel.app/blog/best-deep-tissue-massager-for-pain-management",
    "https://wellness-gadget-insider.vercel.app/blog/best-white-noise-machine-for-stress",
    "https://wellness-gadget-insider.vercel.app/blog/best-radiofrequency-skin-tightening-device",
    "https://wellness-gadget-insider.vercel.app/blog/best-eye-massager",
    "https://wellness-gadget-insider.vercel.app/blog/best-body-fat-scale",
    "https://wellness-gadget-insider.vercel.app/blog/best-cold-therapy-machine",
    "https://wellness-gadget-insider.vercel.app/blog/best-robot-gloves",
    "https://wellness-gadget-insider.vercel.app/blog/best-tens-machine",
    "https://wellness-gadget-insider.vercel.app/blog/best-deep-cleansing-facial-device",
    "https://wellness-gadget-insider.vercel.app/blog/best-facial-steamer",
    "https://wellness-gadget-insider.vercel.app/blog/best-womens-facial-hair-removal-devices",
    "https://wellness-gadget-insider.vercel.app/blog/best-microdermabrasion-machine",
    "https://wellness-gadget-insider.vercel.app/blog/best-derma-pen"
]

payload = {
    "host": "wellness-gadget-insider.vercel.app",
    "key": INDEXNOW_KEY,
    "keyLocation": KEY_LOCATION,
    "urlList": urls
}

response = requests.post(
    "https://api.indexnow.org/indexnow",
    json=payload,
    headers={'Content-Type': 'application/json'}
)

print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")